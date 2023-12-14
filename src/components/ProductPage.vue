<template>
  <div class="product-area section" v-if="products">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="section-title">
            <h2>{{ language == 'en' ? 'Trending Item' : 'ခေတ်စားနေသော အရာများ' }}</h2>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="product-info">
            <div class="nav-main">
              <!-- Tab Nav -->
              <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item">
                  <a @click="all" class="nav-link active" data-toggle="tab" role="tab">{{
                    language == 'en' ? 'All' : 'အားလုံး'
                  }}</a>
                </li>
                <li class="nav-item" v-for="c in category" :key="c.id">
                  <a
                    @click="categoryFilter(c.id)"
                    class="nav-link"
                    :class="{ active: activeTab === c.id }"
                    data-toggle="tab"
                    role="tab"
                    >{{ language == 'en' ? c.name_en : c.name_mm }}</a
                  >
                </li>
              </ul>
              <!--/ End Tab Nav -->
            </div>
            <div class="tab-content" id="myTabContent">
              <!-- Start Single Tab -->
              <div class="tab-pane fade show active" id="man" role="tabpanel">
                <div class="tab-single">
                  <div class="row">
                    <div
                      class="col-xl-3 col-lg-4 col-md-4 col-12"
                      v-for="p in products.data"
                      :key="p.id"
                    >
                      <div class="single-product card">
                        <div class="card-body">
                          <div class="product-img">
                            <a>
                              <img class="default-img" :src="p.imageURL" style="height: 300px" />
                              <img class="hover-img" :src="p.imageURL" style="height: 300px" />
                            </a>
                            <div class="button-head">
                              <div class="product-action">
                                <a
                                  data-toggle="modal"
                                  @click="eachProduct(p.id)"
                                  data-target="#exampleModal"
                                  title="Quick View"
                                  ><i class="ti-eye"></i
                                  ><span>{{
                                    language == 'en' ? 'Quick Shop' : 'အမြန်ဆိုင်'
                                  }}</span></a
                                >
                                <a title="Wishlist"
                                  ><i class="ti-heart"></i
                                  ><span>{{
                                    language == 'en' ? 'Add to Wishlist' : 'ဆန္ဒစာရင်းသို့ ထည့်ပါ။'
                                  }}</span></a
                                >
                              </div>
                              <div class="product-action-2">
                                <a title="Add to cart">{{
                                  language == 'en' ? 'Add to cart' : 'စျေးဝယ်ခြင်းထဲသို့ထည့်သည်'
                                }}</a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="product-content card-footer">
                          <h3>
                            <a href="">{{ language == 'en' ? p.name_en : p.name_mm }}</a>
                          </h3>
                          <div class="product-price">
                            <span style="text-decoration: line-through" class="badge badge-danger"
                              >{{ p.sale_price }}Ks</span
                            >
                            <span class="badge badge-warning ml-2">{{ p.discount_price }}Ks</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-center mt-3">
              <button
                @click="prevPage"
                class="badge badge-primary"
                :disabled="products.prev_page_url == null"
              >
                <i class="fa-solid fa-angles-left"></i>
              </button>
              <span class="px-3 text">{{ products.current_page }}</span>
              <button
                @click="nextPage"
                :disabled="products.next_page_url == null"
                class="badge badge-primary"
              >
                <i class="fa-solid fa-angles-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- model -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" v-if="product">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span class="ti-close" aria-hidden="true"></span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row no-gutters">
              <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                <!-- Product Slider -->
                <div class="product-gallery">
                  <div class="quickview-slider-active">
                    <div class="single-slider d-flex justify-content-center mt-5">
                      <img :src="product.imageURL" class="w-75 h-50" />
                    </div>
                  </div>
                </div>
                <!-- End Product slider -->
              </div>
              <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
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
                      <a>
                        ({{ reviewCount }}
                        {{ language == 'en' ? 'reviews' : 'ဖောက်သည်သုံးသပ်ချက်' }})</a
                      >
                    </div>
                    <div class="quickview-stock">
                      <span
                        ><i class="fa fa-check-circle-o"></i
                        >{{ language == 'en' ? 'in stock' : 'ကုန်ပစ္စည်းလက်ဝယ်ရှိ' }}
                        <span class="badge badge-warning badge-pill">{{
                          product.total_qty
                        }}</span></span
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
                          <img :src="d.user.imageURL" alt="" class="img-thumbnail" />
                          <div class="mx-3 starColor">
                            <!-- <vue3-star-ratings :numberOfStars="d.rating" class="mb-2 starColor" /> -->
                            <!-- <vue3-star-ratings :value="3" :max-rating="5"></vue3-star-ratings> -->
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
                          <strong v-if="reviewError" class="mt-2 text-danger">{{
                            reviewError
                          }}</strong>
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
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import axios from 'axios'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import fetchCategory from '../axios/category'
import getProduct from '../axios/product'
import { useAuthStore } from '../store'
const $toast = useToast()
const activeTab = ref()
var page = ref(1)
const reviewCount = ref(0)
const rating = ref(0)
const review = ref()
const product = ref(null)
const reviewData = ref()
const { category, getCategory } = fetchCategory()
const { products, fetchProduct } = getProduct()
const qty = ref(1)

// error
const reviewError = ref()

// pinia
const authStore = useAuthStore()
const { authUser, cart, count, language } = storeToRefs(authStore)

// get category
getCategory()

// all product >
fetchProduct(`/api/products?page=${page.value}`)
const categoryFilter = (id) => {
  fetchProduct(`/api/products?category_id=${id}`)
}

// paginate
const nextPage = () => {
  page.value++
  fetchProduct(`/api/products?page=${page.value}`)
}
const prevPage = () => {
  page.value--
  fetchProduct(`/api/products?page=${page.value}`)
}

// all product
const all = () => {
  fetchProduct(`/api/products?page=${page.value}`)
}

// product detail
const eachProduct = async (id) => {
  const response = await axios.get(`/api/product/${id}`)
  if (response) {
    getReview(response.data.data.id)
    product.value = response.data.data
    reviewCount.value = response.data.review.length
  }
}

// get review
const getReview = async (id) => {
  const response = await axios.get(`/api/getReview/${id}`)
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
.v-toast__item {
  z-index: 999999999 !important;
}
.custom-text {
  font-weight: bold;
  font-size: 1.9em;
  border: 1px solid #cfcfcf;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 5px;
  color: #999;
  background: #fff;
}

.img-thumbnail {
  width: 70px !important;
  height: 70px !important;
  border-radius: 100%;
}
.badge {
  padding: 15px;
}
</style>
