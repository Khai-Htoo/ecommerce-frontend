<template>
  <div>
    <div class="backdropCus" @click.self="closeModel">
      <div class="modalCus animate__animated animate__bounceIn">
        <div class="card">
          <h5 class="text-center mt-5">Change Your Account Password</h5>
          <i @click="closeModel" class="fas fa-times-circle text-muted"></i>
          <div class="card-body">
            <div class="p-5">
              <form @submit.prevent="submit">
                <input
                  type="number"
                  class="form-control mt-4"
                  placeholder="Enter Amount..."
                  v-model="amount"
                />
                <strong class="text-danger m-2" v-for="p in amountError" :key="p">{{ p }}</strong>
                <input type="file" class="form-control mt-4" @change="selectImage" />
                <strong class="text-danger m-2" v-for="p in imageError" :key="p">{{ p }}</strong>
                <button
                  class="btn w-100 mb-3 mt-5 d-flex justify-content-center align-items-center"
                >
                  <span class="loader mx-3" v-if="loader"></span> COnfirm
                  <i class="mx-2 fas fa-key"></i>
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
// error
const loader = ref(false)
const amount = ref()
const image = ref()
const amountError = ref()
const imageError = ref()
const $toast = useToast()
const authStore = useAuthStore()
const { authUser, passwordModal, addMoney } = storeToRefs(authStore)
const selectImage = (e) => {
  image.value = e.target.files[0]
}
const submit = async () => {
  loader.value = true
  try {
    const response = await axios.post('/api/addMoney', {
      id: authUser.value.id,
      amount: amount.value,
      image: image.value
    })
    if (response.data.status == 'success') {
      loader.value = false
      addMoney.value = false
      $toast.open({
        message: response.data.msg,
        type: 'success',
        position: 'top-right',
        duration: 3000
      })
    } else {
      passwordModal.value = false
      $toast.open({
        message: response.data.msg,
        type: 'error',
        position: 'top-right',
        duration: 3000
      })
    }
  } catch (error) {
    amountError.value = error.response.data.errors.amount
    imageError.value = error.response.data.errors.image
  }
}
// close model
const closeModel = () => {
  addMoney.value = false
}
</script>
<style scoped>
.backdropCus {
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
