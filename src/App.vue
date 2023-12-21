<template>
  <div class="">
    <HeaderPage></HeaderPage>
    <router-view />
    <FooterPage />
  </div>
</template>

<script setup>
import HeaderPage from './components/HeaderPage.vue'
import FooterPage from './components/FooterPage.vue'
import axios from 'axios'
import { useAuthStore } from './store/index'
import { storeToRefs } from 'pinia'
const authStore = useAuthStore()
const { authUser, notiCount } = storeToRefs(authStore)
// auth user
const fetchUser = async () => {
  const result = await axios.get('/api/user')
  if (result) {
    authUser.value = result.data
    localStorage.setItem('id', result.data.id)
    authUser.value = result.data
    const response = await axios.get(`/api/notifications/${result.data.id}`)
    notiCount.value = response.data.notiCount
  }
}
fetchUser()
</script>

<style lang="scss" scoped></style>
