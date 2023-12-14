<template>
  <section id="contact-us" class="contact-us section">
    <div class="container">
      <div class="contact-head">
        <div class="row">
          <div class="col-lg-8 col-12">
            <div class="form-main">
              <div class="title">
                <h4>Get in touch</h4>
                <h3>Write us a message</h3>
              </div>
              <form class="form" @submit.prevent="handleSubmit">
                <div class="row">
                  <div class="col-lg-6 col-12">
                    <div class="form-group">
                      <label>Your Name<span>*</span></label>
                      <input type="text" placeholder="" v-model="name" />
                      <strong class="text-danger" v-if="nameError">{{ nameError }}</strong>
                    </div>
                  </div>
                  <div class="col-lg-6 col-12">
                    <div class="form-group">
                      <label>Your Subjects<span>*</span></label>
                      <input type="text" placeholder="" v-model="subject" />
                      <strong class="text-danger" v-if="subjectError">{{ subjectError }}</strong>
                    </div>
                  </div>
                  <div class="col-lg-6 col-12">
                    <div class="form-group">
                      <label>Your Email<span>*</span></label>
                      <input type="email" placeholder="" v-model="email" />
                      <strong class="text-danger" v-if="emailError">{{ emailError }}</strong>
                    </div>
                  </div>
                  <div class="col-lg-6 col-12">
                    <div class="form-group">
                      <label>Your Phone<span>*</span></label>
                      <input type="text" placeholder="" v-model="phone" />
                      <strong class="text-danger" v-if="phoneError">{{ phoneError }}</strong>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-group message">
                      <label>your message<span>*</span></label>
                      <textarea placeholder="" v-model="message"></textarea>
                      <strong class="text-danger" v-if="messageError">{{ messageError }}</strong>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-group button">
                      <button type="submit" class="btn">Send Message</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="col-lg-4 col-12">
            <div class="single-head">
              <div class="single-info">
                <i class="fa fa-phone"></i>
                <h4 class="title">Call us Now:</h4>
                <ul>
                  <li>+09 794-257-469</li>
                  <li>+09 420-220-228</li>
                </ul>
              </div>
              <div class="single-info">
                <i class="fa fa-envelope-open"></i>
                <h4 class="title">Email:</h4>
                <ul>
                  <li><a>info@goodyStore.com</a></li>
                  <li><a>support@goodyStore.com</a></li>
                </ul>
              </div>
              <div class="single-info">
                <i class="fa fa-location-arrow"></i>
                <h4 class="title">Our Address:</h4>
                <ul>
                  <li>Phugyi ,Hmawbi , Yangon , Myanmar.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import axios from 'axios'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../store'
import { ref } from 'vue'
import { useToast } from 'vue-toast-notification'
const $toast = useToast()
const name = ref()
const email = ref()
const phone = ref()
const subject = ref()
const message = ref()
const nameError = ref()
const emailError = ref()
const phoneError = ref()
const subjectError = ref()
const messageError = ref()
const authStore = useAuthStore()
const { authUser } = storeToRefs(authStore)
const handleSubmit = async () => {
  try {
    const response = await axios.post('api/contact', {
      id: authUser.value.id,
      name: name.value,
      email: email.value,
      message: message.value,
      subject: subject.value,
      phone: phone.value
    })
    if (response) {
      ;(name.value = ''),
        (email.value = ''),
        (message.value = ''),
        (subject.value = ''),
        (phone.value = ''),
        $toast.open({
          message: 'Message sent successfully !',
          type: 'success',
          position: 'top-right',
          duration: 3000
        })
    }
  } catch (error) {
    console.log(error.response.data.errors)
    nameError.value = error.response.data.errors.name[0]
    emailError.value = error.response.data.errors.email[0]
    messageError.value = error.response.data.errors.message[0]
    subjectError.value = error.response.data.errors.subject[0]
    phoneError.value = error.response.data.errors.phone[0]
  }
}
</script>

<style></style>
