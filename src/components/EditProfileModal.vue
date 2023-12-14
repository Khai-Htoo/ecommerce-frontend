<template>
  <div>
    <div class="backdropCus" @click.self="closeModel">
      <div class="modalCus animate__animated animate__bounceIn">
        <div class="card">
          <h5 class="text-center mt-5">Change Your Account Password</h5>
          <i @click="closeModel" class="fas fa-times-circle text-muted"></i>
          <div class="card-body">
            <div class="p-5">
              <form @submit.prevent="profile">
                <input type="file" class="form-control mt-4" @change="selectImage" />
                <input type="text" class="form-control mt-4" placeholder="Name..." v-model="name" />
                <strong class="text-danger m-2" v-for="p in nameError" :key="p">{{ p }}</strong>
                <input
                  type="text"
                  class="form-control mt-4"
                  placeholder="Phone..."
                  v-model="phone"
                />
                <strong class="text-danger m-2" v-for="p in phoneError" :key="p">{{ p }}</strong>
                <input
                  type="text"
                  class="form-control mt-4"
                  placeholder="Address..."
                  v-model="address"
                />
                <strong class="text-danger m-2" v-for="p in addressError" :key="p">{{ p }}</strong>
                <button class="btn w-100 mb-3 mt-5">Confirm <i class="fas fa-edit"></i></button>
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
const authStore = useAuthStore()
const { authUser, profileModal } = storeToRefs(authStore)
// error
const nameError = ref()
const phoneError = ref()
const addressError = ref()
const name = ref(authUser.value.name)
const phone = ref(authUser.value.phone)
const address = ref(authUser.value.address ? authUser.value.address : '')
const image = ref()
const $toast = useToast()
const selectImage = (e) => {
  image.value = e.target.files[0]
}
const profile = async () => {
  try {
    const response = await axios.post('/api/editProfile', {
      id: authUser.value.id,
      name: name.value,
      phone: phone.value,
      address: address.value,
      image: image.value
    })
    if (response.data.status == 'success') {
      profileModal.value = false
      const result = await axios.get('/api/user')
      authUser.value = result.data
      $toast.open({
        message: response.data.msg,
        type: 'success',
        position: 'top-right',
        duration: 3000
      })
    }
  } catch (error) {
    nameError.value = error.response.data.errors.name
    phoneError.value = error.response.data.errors.phone
    addressError.value = error.response.data.errors.address
  }
}
// close model
const closeModel = () => {
  profileModal.value = false
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
