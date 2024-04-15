import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import i18n from "./composables/i18n.js";
import App from './App.vue'
import router from './router'
import useRequest from "@/composables/useRequest";
const request = useRequest;
const req = new request.Request();

const app = createApp(App)
app.provide<useRequest.Request>("http", req);
app.use(createPinia())
app.use(router)
app.use(i18n)
app.mount('#app')
