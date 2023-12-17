<template>
  <div class="container">
    <div class="row my-5">
      <div class="col-md-5">
        <img :src="product.imageURL" class="w-100" style="height: 500px !important" />
      </div>
      <div class="col-md-7">
        <div class="quickview-content">
          <div class="alert alert-danger" role="alert" v-if="authUser == null">
            {{
              language == 'en'
                ? 'Unauthenticated! You need to login'
                : 'အထောက်အထားမခိုင်လုံပါ လော့ဂ်အင်ဝင်ရောက်ရန်လိုအပ်သည်'
            }}
          </div>
          <h2>{{ product.name_en }}</h2>
          <div class="quickview-ratting-review">
            <div class="quickview-ratting-wrap">
              <!-- <div class="quickview-ratting">
                        <i class="yellow fa fa-star"></i>
                        <i class="yellow fa fa-star"></i>
                        <i class="yellow fa fa-star"></i>
                        <i class="yellow fa fa-star"></i>
                        <i class="fa fa-star"></i>
                      </div> -->
              <a> ({{ reviewCount }} {{ language == 'en' ? 'reviews' : 'ဖောက်သည်သုံးသပ်ချက်' }})</a>
            </div>
            <div class="quickview-stock">
              <span
                ><i class="fa fa-check-circle-o"></i
                >{{ language == 'en' ? 'in stock' : 'ကုန်ပစ္စည်းလက်ဝယ်ရှိ' }}
                <span class="badge badge-warning badge-pill">{{ product.total_qty }}</span></span
              >
            </div>
          </div>
          <div class="d-flex align-items-center">
            <h3 class="badge badge-warning">{{ product.discount_price }}Ks</h3>
            <h3 class="mx-3"><i class="fas fa-eye"></i> : {{ product.view }}</h3>
          </div>
          <div class="quickview-peragraph">
            <p>{{ product.description }}</p>
          </div>
          <div class="size">
            <div class="row">
              <div class="col-12">
                <h5 class="title">{{ language == 'en' ? 'Color' : 'အရောင်' }}</h5>
                <select>
                  <option v-for="c in product.color" :key="c.id">
                    {{ language == 'en' ? c.name_en : c.name_mm }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="quantity">
            <!-- Input Order -->
            <div class="input-group">
              <div class="button minus" @click="qty--">
                <button
                  type="button"
                  class="btn btn-primary btn-number"
                  data-type="minus"
                  data-field="quant[1]"
                >
                  <i class="ti-minus"></i>
                </button>
              </div>
              <input
                type="text"
                name="quant[1]"
                class="input-number"
                data-min="1"
                data-max="1000"
                :value="qty"
              />
              <div class="button plus" @click="qty++">
                <button
                  type="button"
                  class="btn btn-primary btn-number"
                  data-type="plus"
                  data-field="quant[1]"
                >
                  <i class="ti-plus"></i>
                </button>
              </div>
            </div>
            <!--/ End Input Order -->
          </div>
          <div class="add-to-cart">
            <a @click="addToCart(product.id)" class="btn">{{
              language == 'en' ? 'Add to cart' : 'စျေးဝယ်ခြင်းထဲသို့ထည့်သည်'
            }}</a>
            <a class="btn min"><i class="ti-heart"></i></a>
            <a class="btn min"><i class="fa fa-compress"></i></a>
          </div>
          <div>
            <hr />
            {{ language == 'en' ? ' Review' : 'သုံးသပ်ချက်' }}
            <div class="card" v-if="reviewData">
              <div class="mx-3 my-2" v-for="d in reviewData" :key="d.id">
                <div class="d-flex align-items-center">
                  <img v-if="d.user.imageURL" :src="d.user.imageURL" alt="" class="img-thumbnail" />
                  <img
                    v-else
                    class="img-thumbnail w-75 h-75"
                    src="../assets/images/profile.jpg"
                    alt=""
                  />
                  <div class="mx-3 starColor">
                    {{ language == 'en' ? 'Rating' : 'အဆင့်သတ်မှတ်ချက်' }} : {{ d.rating }}
                    <p>{{ d.review }}</p>
                  </div>
                </div>
                <hr />
              </div>
            </div>
            <div class="card" v-if="authUser">
              <div class="card-body">
                <form @submit.prevent="handleSubmit">
                  <vue3-star-ratings v-model="rating" class="mb-2" />
                  <textarea v-model="review"></textarea>
                  <strong v-if="reviewError" class="mt-2 text-danger">{{ reviewError }}</strong>
                  <br />
                  <button class="btn btn-primary">
                    {{ language == 'en' ? 'COnfirm' : 'အတည်ပြုပါ။' }}
                  </button>
                </form>
              </div>
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
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../store'
import { ref } from 'vue'
const props = defineProps(['id'])
const reviewCount = ref(0)
const $toast = useToast()
const rating = ref(0)
const review = ref()
const reviewData = ref()
const qty = ref(1)
const authStore = useAuthStore()
const { authUser, language, cart, count } = storeToRefs(authStore)
const product = ref()
// error
const reviewError = ref()
const eachProduct = async () => {
  const response = await axios.get(`/api/product/${props.id}`)
  if (response) {
    getReview(response.data.data.id)
    product.value = response.data.data
    reviewCount.value = response.data.review.length
  }
}
eachProduct()
// get review
const getReview = async () => {
  const response = await axios.get(`/api/getReview/${props.id}`)
  console.log(response.data)
  reviewData.value = response.data
}
// add to cart
const addToCart = async (id) => {
  if (authUser.value == null) {
    $toast.open({
      message: 'Unauthenticated! You need to Login First',
      type: 'error',
      position: 'top',
      duration: 3000
    })
  }
  const response = await axios.post('/api/addToCart', {
    user_id: authUser.value.id,
    product_id: id,
    qty: qty.value
  })
  if (response.data.status == 'success') {
    const result = await axios.get('api/cartCount/' + authUser.value.id)
    cart.value = result.data.cart
    count.value = result.data.cart.length
    $toast.open({
      message: response.data.msg,
      type: 'success',
      position: 'top-right',
      duration: 3000
    })
  } else {
    $toast.open({
      message: response.data.msg,
      type: 'error',
      position: 'top-right',
      duration: 3000
    })
  }
}
// review
const handleSubmit = async () => {
  try {
    const response = await axios.post('/api/review', {
      user_id: authUser.value.id,
      product_id: product.value.id,
      review: review.value,
      rating: rating.value
    })
    if (response) {
      getReview(product.value.id)
      ;(review.value = ''), (rating.value = 0)
      $toast.open({
        message: 'Make Review Success!',
        type: 'success',
        position: 'top-right',
        duration: 3000
      })
    }
  } catch (error) {
    reviewError.value = error.response.data.errors.review[0]
  }
}
</script>

<style scoped>
.img-thumbnail {
  width: 70px !important;
  height: 70px !important;
  border-radius: 100%;
}
</style>
