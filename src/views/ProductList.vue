<template>
  <div class="body">
    <div class="row">
      <div class="col-md-2">
        <div class="">
          <p class="bg-secondary p-2">
            <span class="ml-2 text-white"><i class="mr-2 fa-solid fa-list"></i>Category</span>
          </p>
          <ul>
            <li class="bg-grey my-2 p-2" v-for="c in category" :key="c.id">
              {{ c.name_en }}
              <span class="ml-2 badge badge-warning badge-pill">{{ c.product_count }}</span>
            </li>
          </ul>
        </div>
        <div class="">
          <p class="bg-secondary p-2">
            <span class="ml-2 text-white"><i class="mr-2 fa-solid fa-palette"></i>Color</span>
          </p>
          <ul>
            <li class="bg-grey my-2 p-2" v-for="c in color" :key="c.id">
              {{ c.name_en }}
            </li>
          </ul>
        </div>
        <div class="">
          <p class="bg-secondary p-2">
            <span class="ml-2 text-white"><i class="mr-2 fa-regular fa-copyright"></i>Brand</span>
          </p>
          <ul>
            <li class="bg-grey my-2 p-2" v-for="c in brand" :key="c.id">
              {{ c.name_en }}
            </li>
          </ul>
        </div>
      </div>
      <div class="col-md-10">
        <div class="d-flex justify-content-end">
          <div class="d-flex justify-content-center align-items-center">
            <p>Sort By</p>
            <select class="form-control mx-2 count" v-model="sortPrice" @change="sortPriceFilter">
              <option value="all" selected>All</option>
              <option value="expensive">Expensive</option>
              <option value="cheapest">Cheapest</option>
            </select>
          </div>
          <!-- Products -->
          <div class="d-flex justify-content-center align-items-center">
            <p>Show</p>
            <select class="form-control mx-2 count" v-model="paginate" @change="changePaginate">
              <option value="all">All</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>
          </div>
        </div>
        <div class="row product">
          <div class="col-md-3" v-for="p in product" :key="p.id">
            <router-link :to="{ name: 'productDetail', params: { id: p.id } }">
              <div class="card mb-4">
                <div class="card-body">
                  <img :src="p.imageURL" alt="" class="text-center" />
                  <p class="text-center mt-2">{{ p.name_en }}</p>
                  <h6 class="text-center">{{ p.discount_price }}$</h6>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import fetchCategory from '../axios/category'
import fetchColor from '../axios/color'
import fetchBrand from '../axios/brand'
import { ref } from 'vue'
import axios from 'axios'
const { category, getCategory } = fetchCategory()
const { color, getColor } = fetchColor()
const { brand, getBrand } = fetchBrand()
const product = ref()
const paginate = ref('all')
const sortPrice = ref('all')
getCategory()
getColor()
getBrand()

// product
const fetchProduct = async () => {
  const response = await axios.get(
    `/api/productList?paginate=${paginate.value}&sort=${sortPrice.value}`
  )
  console.log(response.data.data)
  if (response.data.data) {
    product.value = response.data.data
  } else if (response.data.paginateData) {
    product.value = response.data.paginateData.data
  }
}
fetchProduct()

// paginate
const changePaginate = () => {
  fetchProduct()
}

// sort by price
const sortPriceFilter = () => {
  fetchProduct()
}
</script>

<style scoped>
.body {
  margin: 50px 120px;
}
.count {
  width: 130px;
}
.bg-secondary {
  background-color: #fd7e14 !important;
  color: white;
}
.bg-grey {
  background-color: #e7e6e6 !important;
}
.product {
  margin-top: 40px;
}
.card {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px !important;
}
.card:hover {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px !important;
  transform: perspective(2000px) rotate(-3deg);
  transition-delay: 10s;
  transition:
    width 2s,
    height 4s;
}
</style>
