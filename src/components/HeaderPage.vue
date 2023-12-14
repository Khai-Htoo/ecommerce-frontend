<template>
  <header class="header shop">
    <!-- Topbar -->
    <div class="topbar">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-md-12 col-12">
            <!-- Top Left -->
            <div class="top-left">
              <ul class="list-main">
                <li><i class="ti-headphone-alt"></i> +09 794-257-469</li>
                <li><i class="ti-email"></i> support@goody.com</li>
              </ul>
            </div>
            <!--/ End Top Left -->
          </div>
          <div class="col-lg-8 col-md-12 col-12">
            <!-- Top Right -->
            <div class="right-content">
              <ul class="list-main">
                <li>
                  <i class="ti-location-pin"></i>
                  {{ language == 'en' ? 'Store location' : 'ဆိုင်တည်နေရာ' }}
                </li>
                <li>
                  <i class="ti-alarm-clock"></i>
                  <router-link :to="{ name: 'transaction' }">{{
                    language == 'en' ? 'Transaction' : 'ငွေပေးငွေယူ'
                  }}</router-link>
                </li>
                <li>
                  <i class="ti-user"></i
                  ><router-link :to="{ name: 'profile' }">{{
                    language == 'en' ? 'My Account' : 'ငါ့အကောင့်'
                  }}</router-link>
                </li>
                <li>
                  <i class="ti-power-off"></i>
                  <a v-if="!authUser" @click="login">{{
                    language == 'en' ? 'Login' : 'လော့ဂ်အင်'
                  }}</a>
                  <span v-else @click="logout">{{
                    language == 'en' ? 'Logout' : 'ထွက်လိုက်ပါ။'
                  }}</span>
                </li>
              </ul>
            </div>
            <!-- End Top Right -->
          </div>
        </div>
      </div>
    </div>
    <!-- End Topbar -->
    <div class="middle-inner">
      <div class="container">
        <div class="row">
          <div class="col-lg-2 col-md-2 col-12">
            <!-- Logo -->
            <div class="logo mt-0">
              <a href=""><img src="../assets/images/logo1-removebg-preview.png" class="logo" /></a>
            </div>
            <!--/ End Logo -->
            <!-- Search Form -->
            <div class="search-top">
              <div class="top-search">
                <a href="#0"><i class="ti-search"></i></a>
              </div>
              <!-- Search Form -->
              <div class="search-top">
                <form class="search-form">
                  <input type="text" placeholder="Search here..." name="search" />
                  <button value="search" type="submit"><i class="ti-search"></i></button>
                </form>
              </div>
              <!--/ End Search Form -->
            </div>
            <!--/ End Search Form -->
            <div class="mobile-nav"></div>
          </div>
          <div class="col-lg-8 col-md-7 col-12">
            <div class="search-bar-top">
              <div class="search-bar">
                <select>
                  <option selected="selected">
                    {{ language == 'en' ? 'All Category' : 'အမျိုးအစားအားလုံး' }}
                  </option>
                  <option v-for="c in category" :key="c.id">
                    {{ language == 'mm' ? c.name_mm : c.name_en }}
                  </option>
                </select>
                <form>
                  <input
                    v-if="language == 'en'"
                    name="search"
                    placeholder="Search Products Here....."
                    type="search"
                  />
                  <input
                    v-if="language == 'mm'"
                    name="search"
                    placeholder="ထုတ်ကုန်များကို ဤနေရာတွင် ရှာဖွေပါ။....."
                    type="search"
                  />
                  <button class="btnn"><i class="ti-search"></i></button>
                </form>
              </div>
            </div>
          </div>
          <div class="col-lg-2 col-md-3 col-12">
            <div class="right-bar">
              <!-- Search Form -->
              <div class="sinlge-bar">
                <router-link :to="{ name: 'notification' }" class="single-icon"
                  ><i class="fas fa-bell" aria-hidden="true"></i
                  ><span class="total-count">{{ notiCount }}</span></router-link
                >
              </div>
              <div class="sinlge-bar shopping">
                <select
                  class="selectpicker"
                  @change="languageSwitch"
                  v-model="languageData"
                  data-width="fit"
                >
                  <option value="en" :selected="language == 'en'">English</option>
                  <option value="mm" :selected="language == 'mm'">Burmese</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Header Inner -->
    <div class="header-inner">
      <div class="container">
        <div class="cat-nav-head">
          <div class="row">
            <div class="col-lg-3">
              <div class="all-category">
                <h3 class="cat-heading">
                  <i class="fa fa-shop" aria-hidden="true"></i
                  >{{ language == 'en' ? 'Goody Shop' : 'ဂွတ် ဒီ စျေး ဆိုင်' }}
                </h3>
                <!-- <ul class="main-category">
									<li v-for="c in category" :key="c.id"><a >{{ c.name_en }}</a></li>
								</ul> -->
              </div>
            </div>
            <div class="col-lg-9 col-12">
              <div class="menu-area">
                <!-- Main Menu -->
                <nav class="navbar navbar-expand-lg">
                  <div class="navbar-collapse">
                    <div class="nav-inner">
                      <ul class="nav main-menu menu navbar-nav">
                        <li :class="{ active: $route.name === 'home' }">
                          <router-link :to="{ name: 'home' }">{{
                            language == 'en' ? 'Home' : 'မူလ'
                          }}</router-link>
                        </li>
                        <li :class="{ active: $route.name === 'order' }">
                          <router-link :to="{ name: 'order' }">{{
                            language == 'en' ? 'Order' : 'အော်ဒါများ'
                          }}</router-link>
                        </li>
                        <li>
                          <a href=""
                            >{{ language == 'en' ? 'Shop' : 'စျေးဆိုင်'
                            }}<i class="ti-angle-down"></i
                            ><span class="new">{{ language == 'en' ? 'New' : 'အသစ်' }}</span></a
                          >
                          <ul class="dropdown">
                            <li>
                              <router-link :to="{ name: 'cart' }">{{
                                language == 'en' ? 'Cart' : 'စျေးဝယ်ခြင်း'
                              }}</router-link>
                            </li>
                            <li>
                              <router-link :to="{ name: 'order' }">{{
                                language == 'en' ? 'Checkout' : 'ငွေရှင်းရန်'
                              }}</router-link>
                            </li>
                          </ul>
                        </li>
                        <li :class="{ active: $route.name === 'cart' }">
                          <router-link :to="{ name: 'cart' }"
                            ><i class="fa-solid fa-cart-shopping"></i
                            ><span class="badge badge-danger badge-pill cart">{{
                              count
                            }}</span></router-link
                          >
                        </li>
                        <li :class="{ active: $route.name === 'contact' }">
                          <router-link :to="{ name: 'contact' }">{{
                            language == 'en' ? 'Contact Us' : 'ကျွန်ုပ်တို့ကိုဆက်သွယ်ပါ'
                          }}</router-link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </nav>
                <!--/ End Main Menu -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--/ End Header Inner -->
    <!-- model -->
  </header>
</template>

<script setup>
import { useToast } from 'vue-toast-notification'
import Swal from 'sweetalert2'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../store/index'
import fetchCategory from '../axios/category'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import allNotification from '../axios/notification'
const authStore = useAuthStore()
const { authModal, count, cart, authUser, language } = storeToRefs(authStore)
const { category, getCategory } = fetchCategory()
const languageData = ref('en')
const $toast = useToast()

// notification
const { notiCount, fetchNoti } = allNotification()
const fetchUser = async () => {
  const result = await axios.get('/api/user')
  if (result) {
    authUser.value = result.data
    fetchNoti(`/api/notifications/${result.data.id}`)
  }
}
fetchUser()

// cart count
onMounted(async () => {
  const response = await axios.get('api/cartCount/' + localStorage.getItem('id'))
  cart.value = response.data.cart
  count.value = response.data.cart.length
})

// language
const fetchLanguage = async () => {
  const response = await axios.get('/api/locale')
  language.value = response.data.locale
}
fetchLanguage()
const languageSwitch = async () => {
  const response = await axios.get(`/api/locale/${languageData.value}`)
  if (response) {
    fetchLanguage()
    $toast.open({
      message: 'Language Switched',
      type: 'success',
      position: 'top-right',
      duration: 3000
    })
  }
}
const logout = () => {
  Swal.fire({
    title: 'You wanna logout?',
    icon: 'warning',
    showCancelButton: true,
    reverseButtons: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Logout'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await axios.post('/logout')
        authUser.value = null
      } catch (error) {
        if (error) {
          location.reload()
        }
      }
    }
  })
}
getCategory()
const login = () => {
  authModal.value = true
}
</script>

<style scoped>
.logo {
  height: 80px !important;
}
.cart {
  position: absolute;
  top: 10px;
  left: 35px;
}
.selectpicker {
  padding: 10px;
  background-color: #f7941d;
  color: white;
}
.fa-cart-shopping {
  font-size: 20px !important;
}
</style>
