<template>
  <div class="chat-list__item message">
    <div class="message__wrapper message__wrapper-date">
      <div class="message__box message__box-date" :class="msg.dateTrigger ? '_hidden' : ''">
        <div class="message__container-date">
          <div class="message-content__text">{{ msg.date }}</div>
        </div>
      </div>
    </div>
  </div>
  <div class="chat-list__item message">
    <div class="message__wrapper">
      <div class="message__box">
        <div class="message__modal" :class="msg.modalTrigger ? '_active' : ''">
          <div class="message__modal-wrapper">
            <div class="message__modal-item" @click="roomsStore.EditMessage(msg.msgId)">Изменить сообщение</div>
            <div class="message__modal-item" @click="roomsStore.DeleteMessage(msg.msgId)">Удалить сообщение</div>
          </div>
        </div>
        <div class="message__container">
          <div class="message__options">
            <span class="message__options-smile">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path id="vac-icon-emoji-reaction" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"></path><!----></svg>
            </span>
            <span class="message__options-arrow" @click.stop="roomsStore.SwitchModal(msg.msgId)">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path id="vac-icon-dropdown-message" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"></path><!----></svg>
            </span>
          </div>
          <div class="message__text">{{ msg.msgText }}</div>
          <div class="message__time">
            <span>{{ msg.time }}</span>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24" class="vac-icon-check"><path id="vac-icon-double-checkmark" d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z"></path><!----></svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { MessageItem } from "~/types/MessageItem";
import { useRoomsStore } from '~/store/roomsStore'
import { storeToRefs } from "pinia";

const roomsStore = useRoomsStore();
const { outputMsgDate } = storeToRefs(roomsStore)

const props = defineProps<{
  msg: MessageItem,
  lastMessage: string | undefined,
}>();

onMounted(() => {
  console.log(props)
})

</script>

<style scoped>

</style>