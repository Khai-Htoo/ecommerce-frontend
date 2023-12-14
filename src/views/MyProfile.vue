<template>
  <div class="container my-5" v-if="authUser">
    <div class="card w-100">
      <div class="card-body">
        <div class="row">
          <div class="col-md-5 d-flex justify-content-center align-items-center">
            <div class="">
              <qrcode-vue class="p-2 px-3" :value="authUser.phone" :size="350" />
              <p class="text-primary text-center">Receive Qr</p>
            </div>
          </div>
          <div class="col-md-7">
            <div class="mt-5">
              <div class="card pp-card">
                <div class="card-body d-flex justify-content-between">
                  <div class="w-25">
                    <img
                      v-if="authUser.image"
                      :src="authUser.imageURL"
                      class="img-thumbnail w-75 h-75"
                      alt=""
                    />
                    <img
                      v-else
                      class="img-thumbnail w-75 h-75"
                      src="../assets/images/profile.jpg"
                      alt=""
                    />
                  </div>
                  <div class="w-75">
                    <p class="text-white">Name - {{ authUser.name }}</p>
                    <p class="text-white">Email - {{ authUser.email }}</p>
                    <p class="text-white">Phone - {{ authUser.phone }}</p>
                    <p class="text-white">
                      Address - {{ authUser.address ? authUser.address : '-' }}
                    </p>
                  </div>
                </div>
                <div class="wrap mx-4 mb-3">
                  <button class="cus-btn text-white" @click="ppModal">
                    Edit Profile <i class="fas fa-edit"></i>
                  </button>
                  <button class="cus-btn text-white mx-2" @click="modal">
                    Change Password <i class="fas fa-key"></i>
                  </button>
                </div>
              </div>
            </div>
            <!-- wallet -->
            <div class="mt-5">
              <div class="card pp-card">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-4">
                      <div class="bg-white">
                        <img src="../assets/fonts/Wallet-amico (1).png" alt="" />
                      </div>
                    </div>
                    <div class="col-md-8">
                      <p class="mb-4 text-white">{{ authUser.name }} Wallet</p>
                      <p class="text-white">
                        Account Number - {{ authUser.wallet.account_number }}
                      </p>
                      <p class="text-white mt-3">Balance - {{ authUser.wallet.amount }}Ks</p>
                      <div class="">
                        <button class="text-white cus-btn mt-3" @click="transferForm">
                          Sent Money <i class="text-white fas fa-paper-plane"></i>
                        </button>
                        <button class="text-white cus-btn mx-3 mt-3" @click="addMoneyForm">
                          Add Money <i class="text-white fas fa-plus"></i>
                        </button>
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
  <div v-else>
    <div class="d-flex justify-content-center">
      <img class="img" src="../assets/image/Authentication-bro.png" alt="" />
    </div>
  </div>
  <div class="" v-if="passwordModal">
    <PasswordModal />
  </div>
  <div class="" v-if="profileModal">
    <EditPasswordModal />
  </div>
  <div class="" v-if="transferModal">
    <TransferForm />
  </div>
  <div class="" v-if="scanDataModal">
    <ScanDataModal />
  </div>
  <div class="" v-if="addMoney">
    <AddMoney />
  </div>
</template>

<script setup>
import AddMoney from '../components/AddMoney.vue'
import ScanDataModal from '../components/ScanDataModal.vue'
import TransferForm from '../components/TransferForm.vue'
import EditPasswordModal from '../components/EditProfileModal.vue'
import PasswordModal from '../components/PasswordModal.vue'
import QrcodeVue from 'qrcode.vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../store'
const authStore = useAuthStore()
const { authUser, passwordModal, profileModal, transferModal, scanDataModal, addMoney } =
  storeToRefs(authStore)
const ppModal = () => {
  profileModal.value = true
}
const modal = () => {
  passwordModal.value = true
}
const transferForm = () => {
  transferModal.value = true
}
const addMoneyForm = () => {
  addMoney.value = true
}
</script>

<style scoped>
.img-thumbnail {
  border-radius: 100%;
}
.cus-btn {
  padding: 12px 15px 12px 15px;
  background-color: #2ee59d;
  transition: all 0.3s ease 0s;
}
.img-thumbnail {
  border-radius: 100%;
}
p {
  font-size: 20px;
  margin-bottom: 10px;
}
.pp-card {
  background-color: #578bfb;
}
/* button */
.cus-btn:hover {
  box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
  transform: translateY(-7px);
}
.img {
  width: 600px !important;
  height: 600px !important;
}
</style>
