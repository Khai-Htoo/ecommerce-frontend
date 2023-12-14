<template>
  <div class="cart-body container-fluid" v-if="order">
    <div class="row">
      <div class="col-md-10 offset-1">
        <div class="card mt-5">
          <div class="card-body">
            <table class="table table-striped table-responsive">
              <thead>
                <tr>
                  <th>Product Image</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="o in order.data" :key="o.id">
                  <td>
                    <img :src="o.product.imageURL" class="img-thumbnail" style="height: 30px" />
                  </td>
                  <td>
                    {{ o.product.name_en }}
                  </td>
                  <td>{{ o.qty }}</td>
                  <td>{{ o.total }}</td>
                  <td>
                    <p class="btn btn-primary">{{ o.status }}</p>
                  </td>
                </tr>
              </tbody>
            </table>
            <hr />
            <!-- paginate -->
            <div class="text-center mt-3">
              <button
                @click="prevPage"
                :disabled="order.prev_page_url == null"
                class="badge badge-primary"
              >
                <i class="fas fa fa-angles-left"></i>
              </button>
              <span class="page mx-2"> {{ order.current_page }}</span>
              <button
                :disabled="order.next_page_url == null"
                @click="nextPage"
                class="badge badge-primary"
              >
                <i class="fas fa fa-angles-right"></i>
              </button>
            </div>
          </div>
        </div>
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
const order = ref(null)
var changePage = ref(1)
const fetchUser = async () => {
  const result = await axios.get('/api/user')
  if (result) {
    const response = await axios.get(`/api/order?page=${changePage.value}&id=${result.data.id}`)
    order.value = await response.data.order
  }
}
fetchUser()
const nextPage = () => {
  changePage.value++
  fetchUser()
}
const prevPage = () => {
  changePage.value--
  fetchUser()
}
</script>

<style scoped>
.cart-body {
  min-height: 600px;
  background: #edf7fc;
}
img {
  width: 600px !important;
  height: 600px !important;
}
.card {
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}
.img-thumbnail {
  width: 100px !important;
  height: 100px !important;
}
.fas {
  font-size: 30px;
}
.page {
  font-size: 20px;
  font-weight: 600;
}
.badge {
  width: 40px;
  height: 40px;
}
</style>
