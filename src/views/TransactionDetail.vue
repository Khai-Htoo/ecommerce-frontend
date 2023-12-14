<template>
  <div class="container" v-if="data">
    <div class="card my-5">
      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <img src="../assets/image/6617.jpg" alt="" class="w-100 h-100" />
          </div>
          <div class="col-md-6 p-5">
            <h5 class="mb-4 text-muted">Trx ID : {{ data.trx_no }}</h5>
            <h5 class="my-4 text-muted">Refer Number : {{ data.ref_no }}</h5>
            <h5 class="my-4 text-muted">
              <span v-if="data.type == 1">From </span><span v-if="data.type == 2">To</span>:
              {{ data.source ? data.source.name : '-' }}
            </h5>
            <h5 class="my-4 text-muted">Amount :{{ data.amount }}Ks</h5>
            <h5 class="my-4 text-muted">Date : {{ data.date }}</h5>
            <h5 class="my-4 text-muted">Description : {{ data.description }}</h5>
            <h5 class="text-muted">
              Type : <span class="badge badge-success" v-if="data.type == 1">Income </span
              ><span class="badge badge-danger badge-pill" v-if="data.type == 2">Expanse</span>
            </h5>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="" v-else>
    <div class="preloader">
      <div class="preloader-inner">
        <div class="preloader-icon">
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
const data = ref('')

const props = defineProps(['id'])
onMounted(async () => {
  const response = await axios.get('/api/transaction/' + props.id)
  data.value = response.data
})
</script>

<style scoped></style>
