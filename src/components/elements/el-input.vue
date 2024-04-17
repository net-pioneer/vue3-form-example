<template>
  <div class="form-group">
    <label :for="id">{{ title }}<span class="text-danger fw-bold" v-if="validateFlag.includes('REQUIRED')">*</span></label>
    <input type="text" ref="inputbox" v-model="modelValue.value" class="form-control" value="" :id="id" :name="id" >
  </div>
</template>

<script lang="ts" setup>
import {computed, defineModel, defineProps, onBeforeMount, onMounted, onUnmounted, PropType, ref} from "vue";
import {formModel} from "@/types/types";
import {useI18n} from "vue-i18n";
const props = defineProps({
  title: {
    type:String
  },
  id: {
    type:String
  }
});
const modelValue = defineModel<formModel>('field',{
  required:true,
})
const inputbox = ref();
const validateFlag = modelValue.value?._decorator;
</script>

<style scoped>

</style>