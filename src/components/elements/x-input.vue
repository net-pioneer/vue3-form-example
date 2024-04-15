<template>
  <div class="form-group">
    <label :for="id">{{ title }} <span class="text-danger fw-bold" v-if="validateFlag === 'REQUIRED'">*</span></label>
    <input type="text" ref="inputbox" :value="viwableModel" @input="onInput($event)" @focusout="onFocusOut" class="form-control" value="" :id="id" :name="id" >
    <small class="form-text text-danger" v-if="error_text">{{error_text}}</small>
  </div>
</template>

<script lang="ts">
import {computed, onBeforeMount, onMounted, onUnmounted, PropType, ref} from "vue";
import {formModel} from "@/types/types";
import {useI18n} from "vue-i18n";

export default {
  name: "x-input",
  props:{
    modelValue: {
      type: Object as PropType<formModel>
    },
    title: {
      type:String
    },
    id: {
      type:String
    },
  },
  setup(props,{emit}){
    const {t} = useI18n();
    const inputbox = ref();
    const validateFlag = props.modelValue?._decorator;
    const error_text = ref('');
    const onInput = (ev) => {
      emit("update:modelValue", {value:ev.target.value,_decorator:validateFlag});
      error_text.value = false;
    };
    const onFocusOut = (ev) => {
      const inp = ev.target.value;
      if(validateFlag === 'EMAIL'){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(emailRegex.test(inp)){
          emit('valid');
        }else{
          error_text.value = t('validation.EMAIL');
          emit('invalid');
        }
      }
      else if (validateFlag === 'REQUIRED'){
        if(inp === ''){
          error_text.value = t('validation.REQUIRED');
          emit('invalid');
        }else{
          emit('valid');
        }
      }
    }

    const viwableModel = computed({
      get: () => {
        return props.modelValue?.value;
      },
      set: (val) => {}
    });
    return {
      inputbox,
      onInput,
      onFocusOut,
      validateFlag,
      error_text,
      viwableModel,
    }
  }
}
</script>

<style scoped>

</style>