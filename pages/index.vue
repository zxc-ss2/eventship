<template>
  <div class="chat__container" @click.stop="roomsStore.HideOptionsModal()">
    <div class="create-form" :class="addRoomTrigger ? '_visible' : '_hidden'">
      <CustomInput :placeholder="'Введите название'" v-model="addingUsername"/>
      <a href="#" class="add-room__btn" :class="addingUsername !== '' ? '_active' : ''">Добавить пользователя</a>
      <a @click="roomsStore.HideAddForm()" href="#" class="create-form__close">Закрыть</a>
    </div>
      <div class="chat__body">
        <div class="chat__left-column" :class="activeRoom === 0 ? '_visisble' : '_hidden'" :style="fullwidthChat ? 'flex:0 0 0px;width:0;visibility:collapse;' : ';width:auto;visisbility:visible;'">
          <div class="rooms__preloader" v-if="allRoomsItems.length === 0">
            <div class="loader">Loading...</div>
          </div>
          <div class="left__column-actions">
            <div class="left__column-search">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path fill="#9ca6af"  id="vac-icon-search" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"></path><!----></svg>
              <CustomInput :placeholder="'Поиск'" v-model="searchText"/>
            </div>
            <div @click="roomsStore.ShowAddForm($event)" class="left__column-add" :style="fullwidthChat ? 'display:none' : 'display:flex'">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path fill="#1976d2" id="vac-icon-add" d="M17,13H13V17H11V13H7V11H11V7H13V11H17M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"></path><!----></svg>
            </div>
          </div>
          <div class="left__column-content">
            <div class="left__column-list">
              <RoomItem v-for="(room, index) in searchRooms" :key="index" :room="room" :roomId="room.id" :lastMessage="getLastMessage(room.id)"/>
            </div>
          </div>
        </div>
        <div class="chat__right-column" :class="activeRoom != 0 ? '_visisble' : '_hidden'">
          <div class="right__column-actions top-actions">
            <div class="top-actions__icon" @click="roomsStore.BackIconClick()" :class="fullwidthChat ? '_rotated' : ''">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path id="vac-icon-toggle" d="M5,13L9,17L7.6,18.42L1.18,12L7.6,5.58L9,7L5,11H21V13H5M21,6V8H11V6H21M21,16V18H11V16H21Z"></path><!----></svg>
            </div>
            <div class="top-actions__room">
              <div class="top-actions__room-preview">
                <img src="~/assets/img/room-preview.png" alt="">
              </div>
              <div class="top-actions__room-name">{{ activeRoomName }}</div>
            </div>
            <div class="top-actions__dots">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path id="vac-icon-menu" d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z"></path><!----></svg>
            </div>
          </div>
          <div class="right__column-messages chat-list" ref="chat">
            <div v-if="activeRoom !== 0" class="first__message-date">{{ typeof getDateOfFirstMessage(activeRoom) !== 'undefined' ? 'Беседа начата: ' + getDateOfFirstMessage(activeRoom) : 'Нет сообщений'}}</div>
            <div class="chat-list__container">
              <MessageItem v-for="(msg, index) in selectRoom" :key="index" :msg="msg" />
            </div>
          </div>
          <div class="right__column-input message-input" v-if="activeRoom !== 0">
            <div class="message-input__audio">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 512 512" class="vac-icon-microphone"><path id="vac-icon-microphone" d="M432.8,216.4v39.2c0,45.2-15.3,84.3-45.2,118.4c-29.8,33.2-67.3,52.8-111.6,57.9v40.9h78.4c5.1,0,10.2,1.7,13.6,6c4.3,4.3,6,8.5,6,13.6c0,5.1-1.7,10.2-6,13.6c-4.3,4.3-8.5,6-13.6,6H157.6c-5.1,0-10.2-1.7-13.6-6c-4.3-4.3-6-8.5-6-13.6c0-5.1,1.7-10.2,6-13.6c4.3-4.3,8.5-6,13.6-6H236v-40.9c-44.3-5.1-81.8-23.9-111.6-57.9s-45.2-73.3-45.2-118.4v-39.2c0-5.1,1.7-10.2,6-13.6c4.3-4.3,8.5-6,13.6-6s10.2,1.7,13.6,6c4.3,4.3,6,8.5,6,13.6v39.2c0,37.5,13.6,70.7,40,97.1s59.6,40,97.1,40s70.7-13.6,97.1-40c26.4-26.4,40-59.6,40-97.1v-39.2c0-5.1,1.7-10.2,6-13.6c4.3-4.3,8.5-6,13.6-6c5.1,0,10.2,1.7,13.6,6C430.2,206.2,432.8,211.3,432.8,216.4z M353.5,98v157.6c0,27.3-9.4,50.3-29,69c-19.6,19.6-42.6,29-69,29s-50.3-9.4-69-29c-19.6-19.6-29-42.6-29-69V98c0-27.3,9.4-50.3,29-69c19.6-19.6,42.6-29,69-29s50.3,9.4,69,29C344.2,47.7,353.5,71.6,353.5,98z"></path><!----></svg>
            </div>
            <div class="message-input__textarea">
              <CustomInput :placeholder="'Сообщение'" v-model="newMsgText" @keydown.enter="roomsStore.SendMessage(activeRoom, editMessageId, newMsgText, $event.currentTarget)"/>
            </div>
            <div class="message-input__actions">
              <div class="message-input__actions-emoji">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path id="vac-icon-emoji" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"></path><!----></svg>
              </div>
              <div class="message-input__actions-file">
                <input type="file" name="file" id="input__file" class="input input__file">
                <label for="input__file">
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path id="vac-icon-paperclip" d="M16.5,6V17.5A4,4 0 0,1 12.5,21.5A4,4 0 0,1 8.5,17.5V5A2.5,2.5 0 0,1 11,2.5A2.5,2.5 0 0,1 13.5,5V15.5A1,1 0 0,1 12.5,16.5A1,1 0 0,1 11.5,15.5V6H10V15.5A2.5,2.5 0 0,0 12.5,18A2.5,2.5 0 0,0 15,15.5V5A4,4 0 0,0 11,1A4,4 0 0,0 7,5V17.5A5.5,5.5 0 0,0 12.5,23A5.5,5.5 0 0,0 18,17.5V6H16.5Z"></path><!----></svg>
                </label>
              </div>
              <div class="message-input__actions-enter" @click="roomsStore.SendMessage(activeRoom, editMessageId, newMsgText, $event.currentTarget)">
                <svg :class="editTrigger || newMsgText != '' ? '_ready' : ''" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path id="vac-icon-send-disabled" d="M2,21L23,12L2,3V10L17,12L2,14V21Z"></path><!----></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import CustomInput from "~/components/molecules/CustomInput.vue";
import AddForm from "~/components/molecules/AddForm.vue";
import RoomItem from "~/components/pageComponents/RoomItem.vue";
import MessageItem from "~/components/pageComponents/MessageItem.vue";
import { useRoomsStore } from '~/store/roomsStore'
import {storeToRefs} from "pinia";

const roomsStore = useRoomsStore();
const {
    activeRoom,
    addingUsername,
    allRoomsItems,
    activeRoomName,
    searchText,
    editMessageId,
    newMsgText,
    editTrigger,
    fullwidthChat,
    addRoomTrigger,
    searchRooms,
    selectRoom,
    getLastMessage,
    getDateOfFirstMessage,
} = storeToRefs(roomsStore)

onMounted(() => {
  roomsStore.GET_ROOMS();
})

</script>

<style lang="scss">
  @import "../assets/scss/null";
  @import "../assets/scss/style";

</style>