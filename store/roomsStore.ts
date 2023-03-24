import { defineStore } from 'pinia';
import axios from 'axios';
import { RoomItem } from "~/types/RoomItem";
import { MessageItem } from "~/types/MessageItem";
export const useRoomsStore = defineStore('rooms', {
    state: () => ({
        allRoomsItems: [],
        roomsItems: [],
        activeRoom: 0,
        activeRoomName: '',
        newMsgText: "",
        searchText: "",
        addFormHeight: 0,
        outputMsgDate: "",
        addingUsername: "",
        editTrigger: false,
        fullwidthChat: false,
        addRoomTrigger: false,
        editMessageId: 0,
        messages: [
            {
                room_id: 1,
                content: [
                    {msgId: 1, time: '16:45', msgText: 'Hello, World', date: '21.01.2023', dateTrigger: false, modalTrigger: false},
                    {msgId: 2, time: '16:48', msgText: 'Hello, World', date: '21.01.2023', dateTrigger: false, modalTrigger: false},
                    {msgId: 3, time: '18:21', msgText: 'Hello, World', date: '22.01.2023', dateTrigger: false, modalTrigger: false},
                    {msgId: 4, time: '22:48', msgText: 'Hello, World', date: '23.01.2023', dateTrigger: false, modalTrigger: false},
                ]
            },
            {
                room_id: 2,
                content: [
                    {msgId: 1, time: '16:45', msgText: 'Hello, World', date: '21.01.2023', dateTrigger: false, modalTrigger: false},
                    {msgId: 2, time: '18:21', msgText: 'Hello, World', date: '22.01.2023', dateTrigger: false, modalTrigger: false},
                    {msgId: 3, time: '22:48', msgText: 'Hello, World', date: '23.01.2023', dateTrigger: false, modalTrigger: false},
                ]
            },
            {
                room_id: 3,
                content: [
                    {msgId: 1, time: '16:45', msgText: 'Hello, World', date: '21.01.2023', dateTrigger: false, modalTrigger: false},
                    {msgId: 2, time: '16:48', msgText: 'Hello, World', date: '21.01.2023', dateTrigger: false, modalTrigger: false},
                    {msgId: 3, time: '22:48', msgText: 'Hello, World', date: '23.01.2023', dateTrigger: false, modalTrigger: false},
                    {msgId: 4, time: '22:48', msgText: 'Hello, World 24', date: '23.01.2023', dateTrigger: false, modalTrigger: false},
                ]
            },
            {
                room_id: 4,
                content: [
                    {msgId: 1, time: '16:45', msgText: 'Hello, World', date: '21.01.2023', dateTrigger: false, modalTrigger: false},
                    {msgId: 2, time: '16:48', msgText: 'Hello, World', date: '21.01.2023', dateTrigger: false, modalTrigger: false},
                    {msgId: 3, time: '22:48', msgText: 'Hello, World', date: '23.01.2023', dateTrigger: false, modalTrigger: false},
                    {msgId: 4, time: '22:48', msgText: 'H321', date: '23.01.2023', dateTrigger: false, modalTrigger: false},
                ]
            },
        ]
    }),

    getters: {
        searchRooms(state){
            let newRooms = state.allRoomsItems.filter((e: RoomItem) => e.username.toLowerCase().includes(state.searchText.toLowerCase()))
            return state.searchText != "" ? newRooms : state.allRoomsItems
        },

        selectRoom(state){
            let defaultDate;
            let selectedRoom;
            state.messages.map((value, key) => {
                if(value.room_id === state.activeRoom){
                    defaultDate = value.content[0].date;
                    for (let i = 1; i < (value.content).length; i++){
                        if(value.content[i].date === value.content[i - 1].date){
                            value.content[i].dateTrigger = true;
                        }
                    }
                    selectedRoom = value.content;
                }
            })
            return selectedRoom
        },

        getLastMessage(state){
            return (roomId: string | number): string | undefined => {
                let lastMessage: string | undefined = undefined;

                state.messages.map((value, key) => {
                    if(Number(value.room_id) === Number(roomId)){
                        lastMessage = value.content[value.content.length - 1].msgText;
                    }
                })

                return lastMessage;
            }
        },

        getDateOfFirstMessage(state){
            return (roomId: string | number): string | undefined => {
                let firstMessageDate: string | undefined = undefined;

                state.messages.map((value, key) => {
                    if(Number(value.room_id) === Number(roomId)){
                        firstMessageDate = value.content[0].date;
                    }
                })

                return firstMessageDate;
            }
        }
    },

    actions: {
        async GET_ROOMS() {
            try {
                await axios.get('https://jsonplaceholder.typicode.com/users')
                    .then(response => {
                        this.allRoomsItems = response.data;
                    })
            }
            catch (e) {
                alert(e)
            }
        },

        checkMsgDate(){
            this.messages.map((value, key) => {
                if(value.room_id === this.activeRoom){
                    for (let i = 1; i < (value.content).length; i++){
                        if(value.content[i].date === value.content[i - 1].date){
                            value.content[i].dateTrigger = true;
                        }
                    }
                }
            })
        },

        ShowAddForm(e:any){
            this.addRoomTrigger = true;
        },

        HideAddForm(e:any){
            this.addRoomTrigger = false;
        },

        SwitchModal(msgId: string | number){
            this.messages.map((value, key) => {
                if(value.room_id === this.activeRoom){
                    for (let i = 0; i < (value.content).length; i++){
                        if(Number(msgId) === Number(value.content[i].msgId)){
                            // switch (value.content[i].modalTrigger) {
                            //     case true:
                            //         value.content[i].modalTrigger = false;
                            //         break;
                            //     default:
                            //         value.content[i].modalTrigger = true;
                            // }
                            value.content[i].modalTrigger = !value.content[i].modalTrigger
                        }
                    }
                }
            })
        },

        HideOptionsModal(){
            this.messages.map((value, key) => {
                for (let i = 0; i < (value.content).length; i++){
                    value.content[i].modalTrigger = false
                }
            })
        },

        DeleteMessage(messageId: string | number){
            this.messages.map((value, key) => {
                if(value.room_id === this.activeRoom){
                    for (let i = 0; i < (value.content).length; i++){
                        Number(value.content[i].msgId) ===  messageId ? value.content.splice(i, 1) : false;
                    }
                }
            })
        },

        EditMessage(messageId: string | number){
            this.editTrigger = true;
            this.editMessageId = Number(messageId),
                this.messages.map((value, key) => {
                    if(value.room_id === this.activeRoom){
                        for (let i = 0; i < (value.content).length; i++){
                            Number(value.content[i].msgId) ===  this.editMessageId ? this.newMsgText =  value.content[i].msgText : false;
                        }
                    }
                })
        },

        SendMessage(msgRoomdId: number | string, msgId: string | number, msgText: string, e: any){
            if(msgText != ""){
                if(!this.editTrigger){
                    let count = 0;
                    let newMsg;
                    let date = new Date();
                    let hours = String(date.getHours());
                    let minutes = String(date.getMinutes());
                    let day = String(date.getDate())
                    let month = String(date.getMonth() + 1)

                    if(minutes.length < 2){
                        minutes = '0' + minutes
                    }

                    if(day.length < 2){
                        day = '0' + day
                    }

                    if(month.length < 2){
                        month = '0' + month
                    }

                    for (let i = 0; i < this.messages.length; i++){
                        Number(msgRoomdId) === this.messages[i].room_id ? count += 1 : count;
                    }

                    if(count < 1){
                        newMsg = {
                            room_id: Number(msgRoomdId),
                            content: [
                                {msgId: 1, time: hours + ':' + minutes, msgText: msgText, date: day + '.' + month + '.' + String(date.getFullYear()), dateTrigger: false, modalTrigger: false},
                            ]
                        }

                        this.messages.push(newMsg)
                    }

                    else{
                        for (let i = 0; i < this.messages.length; i++){
                            if(Number(msgRoomdId) === this.messages[i].room_id){
                                let prevMsg = this.messages[i].content[this.messages[i].content.length - 1];
                                newMsg = {msgId: Number(prevMsg.msgId + 1), time: hours + ':' + minutes, msgText: msgText, date: day + '.' + month + '.' + String(date.getFullYear()), dateTrigger: false, modalTrigger: false}
                                this.messages[i].content.push(newMsg);
                            }
                        }
                    }

                    this.newMsgText = "";
                    this.checkMsgDate();
                    nextTick(() => {
                        e.closest('.chat__right-column').querySelector('.chat-list').scrollTop = e.closest('.chat__right-column').querySelector('.chat-list').scrollHeight
                    })
                }

                else{
                    this.messages.map((value, key) => {
                        if(value.room_id === this.activeRoom){
                            for (let i = 0; i < (value.content).length; i++){
                                if(Number(value.content[i].msgId) === Number(msgId)){
                                    value.content[i].msgText = msgText;
                                    this.newMsgText = "";
                                }
                            }
                        }
                    })

                    this.editMessageId = 0;
                    this.editTrigger = false;
                }
            }
        },

        ChangeRoom(roomId:number, roomName:string){
            this.activeRoom = roomId;
            this.activeRoomName = roomName
        },

        BackIconClick(){
            let screenWidth = window.innerWidth;

            if(screenWidth < 768){
                this.activeRoom = 0;
            }

            else{
                this.fullwidthChat ? this.fullwidthChat = false : this.fullwidthChat = true
            }
        }

    },
})