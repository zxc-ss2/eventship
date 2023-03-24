export interface MessageItem{
    room_id: string | number;
    content: [
        {
            msgId: string | number,
            time: string,
            msgText: string,
            date: string,
            dateTrigger: boolean,
            modalTrigger: boolean
        }
    ]
}