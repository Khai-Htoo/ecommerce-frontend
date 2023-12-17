import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfilePage from '../views/MyProfile.vue'
import CartPage from '../views/CartPage.vue'
import TransactionPage from '../views/TransactionPage.vue'
import TransactionDetailPage from '../views/TransactionDetail.vue'
import NotificationPage from '../views/NotificationPage.vue'
import OrderPage from '../views/OrderPage.vue'
import NotificationDetailPage from '../views/NotificationDetail.vue'
import ContactPage from '../views/ContactPage.vue'
import productList from '../views/ProductList.vue'
import productDetail from '../views/ProductDetail.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfilePage
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartPage
    },
    {
      path: '/transaction',
      name: 'transaction',
      component: TransactionPage
    },
    {
      path: '/transactionDetail/:id',
      name: 'transactionDetail',
      component: TransactionDetailPage,
      props: true
    },
    {
      path: '/notification',
      name: 'notification',
      component: NotificationPage
    },
    {
      path: '/notificationDetail/:id',
      name: 'notificationDetail',
      component: NotificationDetailPage,
      props: true
    },
    {
      path: '/order',
      name: 'order',
      component: OrderPage
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactPage
    },
    {
      path: '/productList',
      name: 'productList',
      component: productList
    },
    {
      path: '/productDetail/:id',
      name: 'productDetail',
      component: productDetail,
      props: true
    }
  ]
})

export default router
