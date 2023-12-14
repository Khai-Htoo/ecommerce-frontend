import { defineStore } from 'pinia'
export const useAuthStore = defineStore('authStore', {
  state: () => {
    return {
      authUser: null,
      authModal: false,
      passwordModal: false,
      profileModal: false,
      orderModal: false,
      transferModal: false,
      scanDataModal: false,
      addMoney: false,
      language: null,
      transferPhone: null,
      transferUser: null,
      reviewForm: null,
      totalPrice: 0,
      cart: null,
      count: 0,
      notiCount: 0,
      notification: null
    }
  },
  getters: {},
  actions: {}
})
