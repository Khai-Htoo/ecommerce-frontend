<template>
  <div>
    <div class="backdropCus" @click.self="closeModel">
      <div class="modalCus animate__animated animate__bounceIn">
        <!-- sign in -->
        <div class="card" v-if="signIn">
          <h5 class="text-center mt-5">
            {{
              language == 'en' ? 'Sign In To Goody Account ' : 'ဂွတ် ဒီ အကောင့်သို့ အကောင့်ဝင်ပါ။'
            }}
          </h5>
          <i @click="closeModel" class="fas fa-times-circle text-muted"></i>
          <div class="card-body">
            <div class="p-4 px-5">
              <form @submit.prevent="login">
                <input
                  v-if="language == 'en'"
                  type="email"
                  class="form-control mt-3"
                  placeholder="Email..."
                  v-model="email"
                />
                <input
                  v-else
                  type="email"
                  class="form-control mt-3"
                  placeholder="အီးမေးလ်..."
                  v-model="email"
                />
                <strong class="text-danger m-2" v-for="p in emailError" :key="p">{{ p }}</strong>
                <input
                  v-if="language == 'en'"
                  type="password"
                  class="form-control mt-4"
                  placeholder="Password..."
                  v-model="password"
                />
                <input
                  v-else
                  type="password"
                  class="form-control mt-4"
                  placeholder="စကားဝှက်..."
                  v-model="password"
                />
                <strong class="text-danger m-2" v-for="p in passwordError" :key="p">{{ p }}</strong>
                <button
                  class="btn w-100 mb-3 mt-5 d-flex justify-content-center align-items-center"
                >
                  <span class="loader mx-3" v-if="loader"></span>
                  {{ language == 'en' ? 'Sign In' : 'ဝင်ရောက်ပါ' }}
                  <i class="mx-2 fas fa-key"></i>
                </button>
              </form>
              <span class="" v-if="language == 'en'"
                >Don't have account?
                <span class="text-primary pointer" @click="signUpBtn"> Sign Up</span> Here</span
              >
              <span class="" v-else
                >အကောင့်မရှိဘူးလား။
                <span class="text-primary pointer" @click="signUpBtn">
                  ဤနေရာတွင် စာရင်းသွင်းပါ။</span
                ></span
              >
              <br />
            </div>
          </div>
        </div>
        <!-- sign up -->
        <div class="card animate__animated animate__flipInY" v-if="signUp">
          <h5 class="text-center mt-5">
            {{
              language == 'en' ? 'Sign Up To Goody Account' : 'ဂွတ် ဒီ အကောင့်သို့ စာရင်းသွင်းပါ။'
            }}
          </h5>
          <i @click="closeModel" class="fas fa-times-circle text-muted"></i>
          <div class="card-body">
            <div class="p-4 px-5">
              <form @submit.prevent="register">
                <input
                  v-if="language == 'en'"
                  type="text"
                  class="form-control mt-4"
                  placeholder="Name..."
                  v-model="name"
                />
                <input
                  v-else
                  type="text"
                  class="form-control mt-4"
                  placeholder="နာမည်..."
                  v-model="name"
                />
                <strong class="text-danger m-2" v-for="p in nameError" :key="p">{{ p }}</strong>
                <input
                  v-if="language == 'en'"
                  type="email"
                  class="form-control mt-3"
                  placeholder="Email..."
                  v-model="email"
                />
                <input
                  v-else
                  type="email"
                  class="form-control mt-3"
                  placeholder="အီးမေးလ်..."
                  v-model="email"
                />
                <strong class="text-danger m-2" v-for="p in emailErrorR" :key="p">{{ p }}</strong>
                <input
                  v-if="language == 'en'"
                  type="text"
                  class="form-control mt-4"
                  placeholder="Phone..."
                  v-model="phone"
                />
                <input
                  v-else
                  type="text"
                  class="form-control mt-4"
                  placeholder="ဖုန်း..."
                  v-model="phone"
                />
                <strong class="text-danger m-2" v-for="p in phoneError" :key="p">{{ p }}</strong>
                <input
                  v-if="language == 'en'"
                  type="password"
                  class="form-control mt-4"
                  placeholder="Password..."
                  v-model="password"
                />
                <input
                  v-else
                  type="password"
                  class="form-control mt-4"
                  placeholder="စကားဝှက်..."
                  v-model="password"
                />
                <strong class="text-danger m-2" v-for="p in passwordErrorR" :key="p">{{
                  p
                }}</strong>
                <input
                  v-if="language == 'en'"
                  type="password"
                  class="form-control mt-4"
                  placeholder="Confirmation Password..."
                  v-model="password_confirmation"
                />
                <input
                  v-else
                  type="password"
                  class="form-control mt-4"
                  placeholder="အတည်ပြုစကားဝှက်..."
                  v-model="password_confirmation"
                />
                <strong class="text-danger m-2" v-for="p in passwordCErrorR" :key="p">{{
                  p
                }}</strong>
                <button
                  class="btn w-100 mb-3 mt-5 d-flex justify-content-center align-items-center"
                >
                  <span class="loader mx-3" v-if="loader"></span>
                  <span> {{ language == 'en' ? 'Sign Up' : 'ဆိုင်းအပ်' }}</span>
                  <i class="mx-2 fas fa-key"></i>
                </button>
              </form>
              <span v-if="language == 'en'"
                >Already have account?
                <span class="text-primary pointer" @click="signInBtn"> Sign In</span> here</span
              >
              <span v-else
                >အကောင့်ရှိပြီးသားလား။
                <span class="text-primary pointer" @click="signInBtn">
                  ဤနေရာတွင် အကောင့်ဝင်ပါ။</span
                ></span
              >
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
const emailError = ref()
const passwordError = ref()
const emailErrorR = ref()
const passwordErrorR = ref()
const nameError = ref()
const phoneError = ref()
const passwordCErrorR = ref()
const $toast = useToast()
const loader = ref(false)
const signIn = ref(true)
const signUp = ref(false)
const phone = ref('')
const email = ref('')
const password = ref('')
const password_confirmation = ref('')
const name = ref('')
const authStore = useAuthStore()
const { authModal, authUser, language } = storeToRefs(authStore)

// login //
const login = async () => {
  loader.value = true
  try {
    await axios.get('/sanctum/csrf-cookie')
    const response = await axios.post('/login', {
      email: email.value,
      password: password.value
    })
    if (response) {
      loader.value = false
      const result = await axios.get('/api/user')
      authUser.value = result.data
      authModal.value = false
      $toast.open({
        message: 'Welcome Back Guy! &#128512',
        type: 'success',
        position: 'top-right',
        duration: 3000
      })
    }
  } catch (error) {
    emailError.value = error.response.data.errors.email
    passwordError.value = error.response.data.errors.password
  }
}

// register //
const register = async () => {
  loader.value = true
  try {
    await axios.get('/sanctum/csrf-cookie')
    const response = await axios.post('/register', {
      phone: phone.value,
      name: name.value,
      password_confirmation: password_confirmation.value,
      email: email.value,
      password: password.value
    })
    if (response) {
      loader.value = false
      const result = await axios.get('/api/user')
      authUser.value = result.data
      authModal.value = false
      $toast.open({
        message: 'Register success Welcome guy! &#128512',
        type: 'success',
        position: 'top-right',
        duration: 3000
      })
    }
  } catch (error) {
    console.log(error.response.data.errors)
    emailErrorR.value = error.response.data.errors.email
    passwordErrorR.value = error.response.data.errors.password
    nameError.value = error.response.data.errors.name
    phoneError.value = error.response.data.errors.phone
    passwordCErrorR.value = error.response.data.errors.password
  }
}

// close model
const closeModel = () => {
  authModal.value = false
}

const signUpBtn = () => {
  signIn.value = false
  signUp.value = true
}
const signInBtn = () => {
  signIn.value = true
  signUp.value = false
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
  z-index: 9999;
}
.modalCus {
  width: 600px;
  margin: 100px auto;
  background-color: white;
  border-radius: 20px;
  z-index: 9999;
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
