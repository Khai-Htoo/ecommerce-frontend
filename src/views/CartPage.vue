<template>
  <div class="cart-body container-fluid">
    <div class="row">
      <div class="col-md-10 offset-1">
        <div class="card mt-5">
          <div class="card-body">
            <table class="table table-striped table-responsive">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>In Stock</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Remove</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="c in cart" :key="c.id">
                  <td>
                    <img :src="c.product.imageURL" class="img-thumbnail" />
                  </td>
                  <td>
                    <h6>{{ c.product.total_qty }}</h6>
                  </td>
                  <td>{{ c.product.name_en }}</td>
                  <td>{{ c.product.discount_price }} Ks</td>
                  <td>
                    <div class="d-flex">
                      <button class="badge badge-danger" @click="minus(c)">-</button>
                      <h4 class="mx-2 mt-1">{{ c.qty }}</h4>
                      <button class="badge badge-primary" @click="plus(c)">+</button>
                    </div>
                  </td>
                  <td>
                    <i
                      @click="deleteCart(c)"
                      class="fa fa-close"
                      style="font-size: 35px; color: red"
                    ></i>
                  </td>
                  <td>{{ c.product.discount_price * c.qty }} ks</td>
                </tr>
                <tr>
                  <td colspan="6"><h5 class="float-right">Total Amount :</h5></td>
                  <td>
                    <h5>{{ totalPrice }}Ks</h5>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="float-right mt-3">
          <button class="btn" @click="orderForm">CheckOut</button>
        </div>
      </div>
    </div>
    <div class="" v-if="orderModal">
      <OrderForm />
    </div>
  </div>
</template>

<script setup>
import OrderForm from '../components/OrderForm.vue'
import { useAuthStore } from '../store'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toast-notification'
const authStore = useAuthStore()
const $toast = useToast()
const cart = ref('')
const { orderModal, count, totalPrice } = storeToRefs(authStore)
const fetchUser = async () => {
  const result = await axios.get('/api/user')
  if (result) {
    const response = await axios.get(`/api/cart/${result.data.id}`)
    if (response) {
      cart.value = response.data.cart
      totalPrice.value = 0
      cart.value.map((item) => (totalPrice.value += item.product.discount_price * item.qty))
    }
  }
}
fetchUser()

// add quantity //
const plus = async (c) => {
  c.qty++
  const response = await axios.get(`api/addQty/${c.id}`)
  if (response) {
    totalPrice.value += response.data
  }
}
// remove quantity //
const minus = async (c) => {
  c.qty--
  const response = await axios.get(`api/removeQty/${c.id}`)
  if (response) {
    totalPrice.value -= response.data
  }
}

// remove cart
const deleteCart = async (c) => {
  const response = await axios.get(`/api/deleteCart?cart_id=${c.id}&user_id=${c.user_id}`)
  if (response.data.status == 'success') {
    fetchUser()
    count.value -= 1
    $toast.open({
      message: response.data.msg,
      type: 'success',
      position: 'top-right',
      duration: 3000
    })
  }
}

// order modal
const orderForm = () => {
  orderModal.value = true
}
</script>

<style scoped>
.cart-body {
  min-height: 600px;
  background: #edf7fc;
}
.card {
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}
img {
  width: 100px !important;
  height: 100px !important;
}
.badge {
  width: 35px;
  height: 35px;
}
</style>
