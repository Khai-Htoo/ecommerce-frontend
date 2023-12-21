import axios from 'axios'
import { ref } from 'vue'

const getProduct = () => {
  const products = ref(null)
  const fetchProduct = async (url) => {
    const response = await axios.get(url)
    products.value = response.data.data
  }
  return { products, fetchProduct }
}
export default getProduct
