<template>
  <div>
    <div class="backdropCus" @click.self="closeModel">
      <div class="modalCus animate__animated animate__flipInY">
        <div class="card">
          <h5 class="text-center mt-5">Transfer Money</h5>
          <i @click="closeModel" class="fas fa-times-circle text-muted"></i>
          <div class="card-body">
            <div class="p-5">
              <div class="alert alert-primary" role="alert">
                {{ transferUser.name }} ({{ transferUser.phone }})
              </div>
              <form @submit.prevent="sentMoneyWithScan">
                <input
                  type="number"
                  class="form-control mt-4"
                  placeholder="Amount..."
                  v-model="amount"
                />
                <strong class="text-danger m-2" v-for="p in amountError" :key="p">{{ p }}</strong>
                <input
                  type="text"
                  class="form-control mt-4"
                  placeholder="Description..."
                  v-model="description"
                />
                <strong class="text-danger m-2" v-for="p in descriptionError" :key="p">{{
                  p
                }}</strong>
                <input
                  type="number"
                  class="form-control mt-4"
                  placeholder="Password..."
                  v-model="password"
                />
                <strong class="text-danger m-2" v-for="p in passwordError" :key="p">{{ p }}</strong>
                <button
                  class="btn w-100 mb-3 mt-5 d-flex justify-content-center align-items-center"
                >
                  <span class="loader mx-3" v-if="loader"></span>COnfirm
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
import { useRouter } from 'vue-router'
const router = useRouter()
// error
const loader = ref(false)
const amountError = ref()
const descriptionError = ref()
const passwordError = ref()
const amount = ref('')
const description = ref('')
const password = ref('')
const $toast = useToast()
const authStore = useAuthStore()
const { authUser, scanDataModal, transferPhone, transferModal, transferUser } =
  storeToRefs(authStore)
const sentMoneyWithScan = async () => {
  loader.value = true
  try {
    const response = await axios.post('/api/transferWithPhone', {
      user_id: authUser.value.id,
      to_phone: transferPhone.value,
      amount: amount.value,
      password: password.value,
      description: description.value
    })
    if (response.data.status == 'success') {
      loader.value = false
      scanDataModal.value = false
      transferModal.value = false
      const result = await axios.get('/api/user')
      authUser.value = result.data
      $toast.open({
        message: response.data.msg,
        type: 'success',
        position: 'top-right',
        duration: 3000
      })
      router.push({ name: 'transactionDetail', params: { id: response.data.trx_no } })
    }
    if (response.data.status == 'error') {
      loader.value = false
      scanDataModal.value = false
      transferModal.value = false
      $toast.open({
        message: response.data.msg,
        type: 'error',
        position: 'top-right',
        duration: 3000
      })
    }
  } catch (error) {
    amountError.value = error.response.data.errors.amount
    descriptionError.value = error.response.data.errors.description
    passwordError.value = error.response.data.errors.password
  }
}
// close model
const closeModel = () => {
  scanDataModal.value = false
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
  z-index: 99999;
}
.modalCus {
  width: 600px;
  margin: 100px auto;
  background-color: white;
  border-radius: 20px;
  z-index: 999999;
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
