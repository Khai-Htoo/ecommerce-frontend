<template>
  <div class="container mb-5 animate__animated animate__fadeIn" v-if="transaction">
    <div class="row mt-3">
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
    </div>
    <div class="mt-2 body">
      <div
        class="card my-2 animate__animated animate__fadeIn"
        v-for="t in transaction.data"
        :key="t.id"
      >
        <router-link :to="{ name: 'transactionDetail', params: { id: t.trx_no } }">
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <div class=" ">
                <div class="mb-2">
                  <h4 v-if="t.type == 1">Receive Money</h4>
                  <h4 v-if="t.type == 2">Transfer Money</h4>
                </div>
                <p>Refer Id : {{ t.ref_no }}</p>
                <div class="">
                  <p v-if="t.type == 1">form : {{ t.source.name }}</p>
                  <p v-if="t.type == 2">to : {{ t.source.name }}</p>
                  <p>{{ t.date }}</p>
                </div>
              </div>
              <div class="">
                <p class="text-success" v-if="t.type == 1">+{{ t.amount }}Ks</p>
                <p class="text-danger" v-if="t.type == 2">-{{ t.amount }}Ks</p>
              </div>
            </div>
          </div>
        </router-link>
      </div>
      <div class="text-center mt-3">
        <button
          @click="prevPage"
          class="badge badge-primary"
          :disabled="transaction.prev_page_url == null"
        >
          <i class="fa-solid fa-angles-left"></i>
        </button>
        <span class="px-3 text">{{ transaction.current_page }}</span>
        <button
          @click="nextPage"
          class="badge badge-primary"
          :disabled="transaction.next_page_url == null"
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
import { ref } from 'vue'
const type = ref()
const page = ref(1)
const transaction = ref()
const fetchUser = async () => {
  const result = await axios.get('/api/user')
  if (result) {
    const response = await axios.get(
      `/api/transactions?page=${page.value}&user_id=${result.data.id}&type=${type.value}`
    )
    transaction.value = response.data.data
  }
}
const typeFilter = () => {
  fetchUser()
}
fetchUser()
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
p {
  font-size: 16px;
  font-weight: 600;
}
.body {
  height: 850px !important;
}
h4 {
  color: #7571f9 !important;
  font-weight: 600;
}
img {
  width: 600px !important;
  height: 600px !important;
}
.badge {
  padding: 15px;
}
</style>
