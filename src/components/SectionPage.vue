<template>
  <div>
    <section class="midium-banner">
      <div class="container">
        <div class="row">
          <!-- Single Banner  -->
          <div class="col-lg-6 col-md-6 col-12">
            <div class="single-banner">
              <img src="../assets/images/men.jpg" class="image" />
              <div class="content">
                <p>Man's Collectons</p>
                <h3>Man's items <br />Up to<span> 50%</span></h3>
                <!-- <a href="#" v-if="authUser">{{ authUser.name }}</a> -->
              </div>
            </div>
          </div>
          <!-- /End Single Banner  -->
          <!-- Single Banner  -->
          <div class="col-lg-6 col-md-6 col-12">
            <div class="single-banner">
              <img
                class="image"
                src="../assets/fonts/beautiful-female-shopaholic-kissing-high-heels_329181-3849.jpg"
              />
              <div class="content">
                <p>shoes women</p>
                <h3>
                  mid season <br />
                  up to <span>70%</span>
                </h3>
                <a href="#" class="btn">Shop Now</a>
              </div>
            </div>
          </div>
          <!-- /End Single Banner  -->
        </div>
      </div>
    </section>
  </div>
</template>

<script setup></script>

<style scoped>
.image {
  width: 600px !important;
  height: 350px !important;
}
</style>
