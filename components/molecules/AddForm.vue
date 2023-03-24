<template>
  <div class="create-form" >
    <CustomInput v-model="searchText"/>
    <a href="#" class="add-room__btn"></a>
    <a href="#" class="create-form__close">Закрыть</a>
  </div>
</template>

<script>
import CustomInput from "~/components/molecules/CustomInput.vue";
import { useRoomsStore } from '~/store/roomsStore'
import {storeToRefs} from "pinia";

const roomsStore = useRoomsStore();
const {
  addingUsername,
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
} = storeToRefs(roomsStore)

onMounted(() => {
  console.log(12321)
  roomsStore.GET_ROOMS();
})
</script>

<style scoped>

</style>