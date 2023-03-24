<template>
  <div class="left__column-room room">
    <div class="room__wrapper">
      <div class="room__container" @click="roomStore.ChangeRoom(roomId, room.username)" :class="roomId ===  activeRoom ? '_active' : ''">
        <div class="room__preview">
          <img src="~/assets/img/room-preview.png" alt="">
        </div>
        <div class="room__text">
          <div class="room__text-top">
            <div class="room__text-title">{{ room.username }}</div>
            <div class="room__text-date">{{ room.address.zipcode }}</div>
          </div>
          <div class="room__text-bottom">
            <div class="room__text-preview">{{ typeof lastMessage !== undefined ? lastMessage : 'Чат создан'}}</div>
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path id="vac-icon-dropdown-room" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"></path><!----></svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useRoomsStore } from "~/store/roomsStore";
import { RoomItem } from "~/types/RoomItem";

const roomStore = useRoomsStore();
const { roomsItems, activeRoom, searchRooms } = storeToRefs(roomStore);
const props = defineProps<{
  room: RoomItem,
  roomId: number,
  lastMessage: string | undefined
}>();

onMounted(() => {
  console.log(props)
})
</script>

<style scoped>

</style>