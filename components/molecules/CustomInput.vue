<template>
  <input v-model.trim="value" type="text" class="custom-input" :placeholder="placeholder">
</template>

<script lang="ts" setup>
import { computed } from '#imports';

const props = defineProps<{
  modelValue: string;
  placeholder: string
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();


const value = computed({
  get() {
    return props.modelValue;
  },

  set(value: string){
    emit('update:modelValue', value);
  }
});

</script>