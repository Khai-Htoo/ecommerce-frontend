import axios from 'axios'
import { ref } from 'vue'

const fetchColor = () => {
  const color = ref(null)
  const getColor = async () => {
    let response = await axios.get('/api/color')
    color.value = response.data.data
  }
  return { color, getColor }
}
export default fetchColor
