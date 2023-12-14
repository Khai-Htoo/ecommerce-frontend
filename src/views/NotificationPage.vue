<template>
  <div class="container body mb-5 animate__animated animate__fadeIn" v-if="notification">
    <!-- <div class="row mt-3">
      <div class="col-md-3">
        <div class="d-flex">
          <p class="mx-3 mt-2">Type</p>
          <select class="form-control" @change="typeFilter" v-model="type">
            <option value="all">All</option>
            <option value="1">Income</option>
            <option value="2">Expanse</option>
          </select>
        </div>
      </div>
    </div> -->
    <div class="mt-2 body">
      <div
        class="card my-2 animate__animated animate__fadeIn"
        v-for="n in notification.data"
        :key="n.id"
      >
        <router-link :to="{ name: 'notificationDetail', params: { id: n.id } }">
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <div class=" ">
                <div class="mb-2">
                  <h4>{{ n.data['title'] }}</h4>
                  <p class="mt-3">{{ n.data['message'] }}</p>
                </div>
              </div>
              <div class="">
                <div class="" v-if="n.read_at == null"><i class="fas fa-bell text-danger"></i></div>
                <div class="" v-else><i class="fas fa-bell"></i></div>
              </div>
            </div>
          </div>
        </router-link>
      </div>
      <div class="text-center mt-3">
        <button
          @click="prevPage"
          class="badge badge-primary"
          :disabled="notification.prev_page_url == null"
        >
          <i class="fa-solid fa-angles-left"></i>
        </button>
        <span class="px-3 text">{{ notification.current_page }}</span>
        <button
          @click="nextPage"
          class="badge badge-primary"
          :disabled="notification.next_page_url == null"
        >
          <i class="fa-solid fa-angles-right"></i>
        </button>
      </div>
    </div>
  </div>
  <div v-else class="d-flex justify-content-center">
    <img src="../assets/2953962.jpg" alt="" />
  </div>
</template>
<script setup>
import axios from 'axios'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import allNotification from '../axios/notification'
import { useAuthStore } from '../store'
const authStore = useAuthStore()
const { authUser } = storeToRefs(authStore)
const page = ref(1)
const { fetchNoti, notification } = allNotification()
const fetchUser = async () => {
  const result = await axios.get('/api/user')
  if (result) {
    authUser.value = result.data
    fetchNoti(`/api/notifications/${result.data.id}?page=${page.value}`)
  }
}
fetchUser()

// paginate
const nextPage = () => {
  page.value++
  fetchUser()
}
const prevPage = () => {
  page.value--
  fetchUser()
}
</script>

<style scoped>
.card {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
.body {
  min-height: 100px !important;
}
p {
  font-size: 16px;
  font-weight: 600;
}

h4 {
  color: #7571f9 !important;
  font-weight: 600;
}
img {
  width: 600px;
  height: 600px;
}
.footer-top section {
  position: fixed;
}
.badge {
  padding: 15px;
}
</style>
