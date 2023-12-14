<template>
  <div>
    <div class="backdropCus" @click.self="closeModel">
      <div class="modalCus animate__animated animate__bounceIn">
        <div class="card">
          <h5 class="text-center mt-5">Transfer Money</h5>
          <i @click="closeModel" class="fas fa-times-circle text-muted"></i>
          <div class="card-body">
            <div class="px-5">
              <button class="btn" @click="phone">Phone</button>
              <button class="btn mx-2" @click="scan">Scan</button>
            </div>
            <div class="px-5 py-3" v-if="withPhone">
              <div class="alert alert-primary mb-4" role="alert" v-if="toPhoneUser">
                To : {{ toPhoneUser.name }}({{ toPhoneUser.phone }})
              </div>
              <div class="alert alert-danger mb-4" role="alert" v-if="error">
                {{ error }}
              </div>
              <form @submit.prevent="sentMoneyWithPhone">
                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Sent Phone Number..."
                    v-model="toPhone"
                    aria-describedby="button-addon2"
                  />
                  <button
                    class="btn-success px-3"
                    @click="checkPhone"
                    type="button"
                    id="button-addon2"
                  >
                    <i class="fa-solid fa-check"></i>
                  </button>
                </div>
                <strong class="text-danger m-2" v-for="p in phoneError" :key="p">{{ p }}</strong>
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
                  <span class="loader mx-3" v-if="loader"></span> COnfirm
                  <i class="mx-2 fas fa-key"></i>
                </button>
              </form>
            </div>
            <div class="" v-if="withScan">
              <qrcode-stream class="w-100" @error="onError" @decode="onDecode"></qrcode-stream>
              {{ qrError }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { QrcodeStream } from 'vue3-qrcode-reader'
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
const phoneError = ref()
const amountError = ref()
const descriptionError = ref()
const passwordError = ref()
const withPhone = ref(true)
const withScan = ref(false)
const toPhone = ref('')
const error = ref('')
const qrError = ref('')
const amount = ref('')
const toPhoneUser = ref('')
const password = ref('')
const description = ref('')
const $toast = useToast()
const authStore = useAuthStore()
const { authUser, transferModal, scanDataModal, transferPhone, transferUser } =
  storeToRefs(authStore)

// transfer with phone
const sentMoneyWithPhone = async () => {
  loader.value = true
  try {
    const response = await axios.post('/api/transferWithPhone', {
      user_id: authUser.value.id,
      to_phone: toPhone.value,
      amount: amount.value,
      password: password.value,
      description: description.value
    })
    if (response.data.status == 'success') {
      loader.value = false
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
      transferModal.value = false
      $toast.open({
        message: response.data.msg,
        type: 'error',
        position: 'top-right',
        duration: 3000
      })
    }
  } catch (error) {
    console.log(error)
    phoneError.value = error.response.data.errors.to_phone
    amountError.value = error.response.data.errors.amount
    descriptionError.value = error.response.data.errors.description
    passwordError.value = error.response.data.errors.password
  }
}

// check phone
const checkPhone = async () => {
  const response = await axios.get(
    `/api/checkPhone?to_phone=${toPhone.value}&authUser=${authUser.value.id}`
  )
  if (response.data.success) {
    toPhoneUser.value = response.data.success
  }
  if (response.data.error) {
    error.value = response.data.error
  }
}

// qr scanner
const scan = () => {
  ;(withPhone.value = false), (withScan.value = true)
}
const phone = () => {
  ;(withPhone.value = true), (withScan.value = false)
}
// error
const onError = (error) => {
  if (error.name === 'NotAllowedError') {
    qrError.value = 'user denied camera access permission'
  } else if (error.name === 'NotFoundError') {
    qrError.value = ' no suitable camera device installed'
  } else if (error.name === 'NotSupportedError') {
    qrError.value = 'page is not served over HTTPS (or localhost)'
  } else if (error.name === 'NotReadableError') {
    qrError.value = ' maybe camera is already in use'
  } else if (error.name === 'OverconstrainedError') {
    qrError.value = ' did you request the front camera although there is none?'
  } else if (error.name === 'StreamApiNotSupportedError') {
    qrError.value = 'browser seems to be lacking features'
  }
}
// result
const onDecode = async (decodedString) => {
  if (decodedString) {
    const response = await axios.get(
      `/api/checkPhone?to_phone=${decodedString}&authUser=${authUser.value.id}`
    )
    if (response.data.success) {
      const result = await axios.get(`/api/transferUser/${decodedString}`)
      if (result) {
        transferUser.value = result.data
      }
      scanDataModal.value = true
      withScan.value = false
      transferPhone.value = decodedString
    }
    if (response.data.error) {
      $toast.open({
        message: response.data.error,
        type: 'error',
        position: 'top-right',
        duration: 3000
      })
    }
  }
}

// close model
const closeModel = () => {
  transferModal.value = false
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
