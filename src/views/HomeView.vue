<template>
  <div class="">
    <SlideArea />
    <CategoryPage />
    <ProductPage />
    <div class="backdropCus" @click.self="closeModel">
      <div class="modalCus animate__animated animate__bounceIn"></div>
    </div>
    <SectionPage />
    <ShopHomeList />
    <locationPage />

    <!-- Start Shop Services Area -->
    <section class="shop-services section home">
      <div class="container">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-12">
            <!-- Start Single Service -->
            <div class="single-service">
              <i class="ti-rocket"></i>
              <h4>Free shiping</h4>
              <p>Orders over $100</p>
            </div>
            <!-- End Single Service -->
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <!-- Start Single Service -->
            <div class="single-service">
              <i class="ti-reload"></i>
              <h4>Free Return</h4>
              <p>Within 30 days returns</p>
            </div>
            <!-- End Single Service -->
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <!-- Start Single Service -->
            <div class="single-service">
              <i class="ti-lock"></i>
              <h4>Sucure Payment</h4>
              <p>100% secure payment</p>
            </div>
            <!-- End Single Service -->
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <!-- Start Single Service -->
            <div class="single-service">
              <i class="ti-tag"></i>
              <h4>Best Peice</h4>
              <p>Guaranteed price</p>
            </div>
            <!-- End Single Service -->
          </div>
        </div>
      </div>
    </section>
    <!-- End Shop Services Area -->

    <!-- Start Shop Newsletter  -->
    <section class="shop-newsletter section">
      <div class="container">
        <div class="inner-top">
          <div class="row">
            <div class="col-lg-8 offset-lg-2 col-12">
              <!-- Start Newsletter Inner -->
              <div class="inner">
                <h4>Newsletter</h4>
                <p>Subscribe to our newsletter and get <span>10%</span> off your first purchase</p>
                <form action="mail/mail.php" method="get" target="_blank" class="newsletter-inner">
                  <input name="EMAIL" placeholder="Your email address" required="" type="email" />
                  <button class="btn">Subscribe</button>
                </form>
              </div>
              <!-- End Newsletter Inner -->
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- End Shop Newsletter -->
    <!-- modal -->
    <div v-if="authModal">
      <AuthModel />
    </div>
  </div>
</template>

<script setup>
import LocationPage from '../components/LocationPage.vue'
import ShopHomeList from '../components/ShopHomeList.vue'
import SectionPage from '../components/SectionPage.vue'
import AuthModel from '../components/AuthModel.vue'
import CategoryPage from '../components/CategoryPage.vue'
import ProductPage from '../components/ProductPage.vue'
import SlideArea from '../components/SlideArea.vue'
import { useAuthStore } from '../store/index'
import { storeToRefs } from 'pinia'
const authStore = useAuthStore()
const { authModal } = storeToRefs(authStore)
</script>

<style scoped></style>
