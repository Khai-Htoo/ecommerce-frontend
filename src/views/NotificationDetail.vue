<template>
  <div class="container">
    <div class="card my-5">
      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <img src="../assets/image/2678147.jpg" class="w-100 h-75" />
          </div>
          <div class="col-md-6 p-5">
            <div class="py-5">
              <h4 class="mb-3 text-primary">Title : {{ noti.data['title'] }}</h4>
              <h4 class="mb-3 text-primary">Message : {{ noti.data['message'] }}</h4>
              <h4 class="mb-3 text-primary">Time : {{ noti.created_at }}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="" >
        <div class="preloader">
		<div class="preloader-inner">
			<div class="preloader-icon">
				<span></span>
				<span></span>
			</div>
		</div>
	</div> -->
  <!-- </div> -->
</template>

<script setup>
import axios from 'axios'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import allNotification from '../axios/notification'
import { useAuthStore } from '../store'
const { fetchNoti } = allNotification()
const noti = ref(null)
const props = defineProps(['id'])
const authStore = useAuthStore()
const { notiCount } = storeToRefs(authStore)

const fetchUser = async () => {
  const result = await axios.get('/api/user')
  if (result) {
    const response = await axios.get(`/api/notification?user_id=${result.data.id}&noti=${props.id}`)
    if (response) {
      noti.value = response.data.notification
      notiCount.value = response.data.notiCount
    }
    fetchNoti(`/api/notifications/${result.data.id}`)
  }
}
fetchUser()
</script>

<style scoped></style>
