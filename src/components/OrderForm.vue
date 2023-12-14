<template>
  <div>
    <div class="backdropCus" @click.self="closeModel">
      <div class="modalCus animate__animated animate__bounceIn">
        <div class="card">
          <h5 class="text-center mt-5">Fill Your Detail</h5>
          <i @click="closeModel" class="fas fa-times-circle text-muted"></i>
          <div class="card-body">
            <div class="p-5">
              <form @submit.prevent="order">
                <input
                  type="number"
                  class="form-control mt-4"
                  placeholder="Phone Number..."
                  v-model="phone"
                />
                <input
                  type="text"
                  class="form-control mt-4"
                  placeholder="Your Address..."
                  v-model="address"
                />
                <button
                  class="btn w-100 mb-3 mt-5 d-flex justify-content-center align-items-center"
                >
                  <span class="loader mx-3" v-if="loader"></span> Confirm
                  <i class="mx-2 fa-solid fa-truck-fast"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import axios from 'axios'
import { useAuthStore } from '../store/index'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const loader = ref(false)
const phone = ref('')
const address = ref('')
const $toast = useToast()
const authStore = useAuthStore()
const router = useRouter()
const { authUser, orderModal, count, cart, totalPrice } = storeToRefs(authStore)
const order = async () => {
  loader.value = true
  const response = await axios.post('/api/order', {
    user_id: authUser.value.id,
    phone: phone.value,
    address: address.value,
    totalPrice: totalPrice.value
  })
  if (response.data.status == 'success') {
    loader.value = false
    count.value = 0
    cart.value = null
    orderModal.value = false
    $toast.open({
      message: response.data.msg,
      type: 'success',
      position: 'top-right',
      duration: 3000
    })
    router.push({ name: 'home' })
  } else {
    orderModal.value = false
    $toast.open({
      message: response.data.error,
      type: 'error',
      position: 'top-right',
      duration: 3000
    })
  }
}
// close model
const closeModel = () => {
  orderModal.value = false
}
</script>
<style scoped>
.backdropCus {
  z-index: 9999;
  position: fixed;
  top: 0;
  backdrop-filter: blur(2px);
  background: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
}
.modalCus {
  width: 600px;
  margin: 100px auto;
  background-color: white;
  border-radius: 20px;
}
input.form-control {
  padding: 13px;
  border: none;
  border-bottom: 3px solid #fd7e14;
}
p {
  font-size: large;
}
.card {
  position: relative;
}
.pointer {
  cursor: pointer;
}
.fa-times-circle {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 20px;
  padding: 15px;
}
</style>
