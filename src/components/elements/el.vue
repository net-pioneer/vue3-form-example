<script setup>
import {defineModel} from "vue";

const title = defineModel('title',{
  default:'',
  required:true,
  get: (value) => {
    // Custom validation logic for getting the value
    return value.toUpperCase();
  },
  set: (value) => {
    // Custom validation logic for setting the value
    return value.toLowerCase();
  }
});
</script>

<template>
  <input type="text" v-model="title" />
</template>