import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vue3StarRatings from 'vue3-star-ratings'
import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css'
import './axios/axios'
import App from './App.vue'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
const app = createApp(App)
app.component('vue3-star-ratings', vue3StarRatings)
app.use(VueSweetalert2)
app.use(ToastPlugin)
app.use(createPinia())
app.use(router)
app.mount('#app')
