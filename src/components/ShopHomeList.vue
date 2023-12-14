<template>
  <section class="shop-home-list section mt-3">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 col-md-6 col-12">
          <div class="row">
            <div class="col-12">
              <div class="shop-section-title">
                <h1>{{ language == 'en' ? 'On sale' : 'အရောင်း' }}</h1>
              </div>
            </div>
          </div>
          <!-- Start Single List  -->
          <div class="single-list" v-for="p in onSale" :key="p.id">
            <div class="row">
              <div class="col-lg-6 col-md-6 col-12">
                <div class="list-image overlay">
                  <img :src="p.imageURL" alt="#" />
                  <a href="#" class="buy"><i class="fa fa-shopping-bag"></i></a>
                </div>
              </div>
              <div class="col-lg-6 col-md-6 col-12 no-padding">
                <div class="content">
                  <h4 class="title">
                    <a href="#">{{ language == 'en' ? p.name_en : p.name_mm }}</a>
                  </h4>
                  <p class="price with-discount">{{ p.discount_price }}Ks</p>
                </div>
              </div>
            </div>
          </div>
          <!-- End Single List  -->
        </div>
        <div class="col-lg-4 col-md-6 col-12">
          <div class="row">
            <div class="col-12">
              <div class="shop-section-title">
                <h1>{{ language == 'en' ? 'New' : 'အသစ်' }}</h1>
              </div>
            </div>
          </div>
          <!-- Start Single List  -->
          <div class="single-list" v-for="n in newProduct" :key="n.id">
            <div class="row">
              <div class="col-lg-6 col-md-6 col-12">
                <div class="list-image overlay">
                  <img :src="n.imageURL" alt="#" />
                  <a href="#" class="buy"><i class="fa fa-shopping-bag"></i></a>
                </div>
              </div>
              <div class="col-lg-6 col-md-6 col-12 no-padding">
                <div class="content">
                  <h5 class="title">
                    <a href="#">{{ language == 'en' ? n.name_en : n.name_mm }}</a>
                  </h5>
                  <p class="price with-discount">{{ n.discount_price }}Ks</p>
                </div>
              </div>
            </div>
          </div>
          <!-- End Single List  -->
        </div>
        <div class="col-lg-4 col-md-6 col-12">
          <div class="row">
            <div class="col-12">
              <div class="shop-section-title">
                <h1>{{ language == 'en' ? 'Top viewed' : 'ထိပ်တန်းကြည့်ရှု' }}</h1>
              </div>
            </div>
          </div>
          <!-- Start Single List  -->
          <div class="single-list" v-for="v in viewProduct" :key="v.id">
            <div class="row">
              <div class="col-lg-6 col-md-6 col-12">
                <div class="list-image overlay">
                  <img :src="v.imageURL" alt="#" />
                  <a href="#" class="buy"><i class="fa fa-shopping-bag"></i></a>
                </div>
              </div>
              <div class="col-lg-6 col-md-6 col-12 no-padding">
                <div class="content">
                  <h5 class="title">
                    <a href="#">{{ language == 'en' ? v.name_en : v.name_mm }}</a>
                  </h5>
                  <p class="price with-discount">{{ v.discount_price }}Ks</p>
                  <p class="mt-3"><i class="fas fa-eye"></i> {{ v.view }}</p>
                </div>
              </div>
            </div>
          </div>
          <!-- End Single List  -->
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import axios from 'axios'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from '../store'
const onSale = ref()
const newProduct = ref()
const viewProduct = ref()
const authStore = useAuthStore()
const { language } = storeToRefs(authStore)
const onSaleFetch = async () => {
  const response = await axios.get('/api/onSale')
  onSale.value = response.data.data
}
onSaleFetch()
const newProductFetch = async () => {
  const response = await axios.get('/api/new')
  newProduct.value = response.data.data
}
newProductFetch()
const viewProductFetch = async () => {
  const response = await axios.get('/api/view')
  viewProduct.value = response.data.data
}
viewProductFetch()
</script>

<style>
img {
  height: 240px !important;
}
</style>
