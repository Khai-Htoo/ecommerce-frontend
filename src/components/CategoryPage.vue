<template>
  <section class="small-banner section">
    <div class="container-fluid">
      <div class="row">
        <!-- Single Banner  -->
        <div class="col-lg-2 col-md-4 col-12 mt-3" v-for="c in category" :key="c.id">
          <div class="single-banner">
            <img :src="c.imageURL" style="height: 200px" class="img-thumbnail" />
            <div class="content">
              <h3 class="text-white">{{ language == 'en' ? c.name_en : c.name_mm }}</h3>
              <h3 class="text-warning">
                <span class="mt-3 badge badge-warning text-dark p-2"
                  >{{ c.product_count }} {{ language == 'en' ? 'Items' : 'ပစ္စည်းများ' }}</span
                >
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import fetchCategory from '../axios/category'
import { useAuthStore } from '../store'
const { category, getCategory } = fetchCategory()
const authStore = useAuthStore()
const { language } = storeToRefs(authStore)
getCategory()
</script>

<style lang="scss" scoped></style>
