import axios from 'axios'
import { ref } from 'vue'

const fetchBrand = () => {
  const brand = ref(null)
  const getBrand = async () => {
    let response = await axios.get('/api/brand')
    brand.value = response.data.data
  }
  return { brand, getBrand }
}
export default fetchBrand
