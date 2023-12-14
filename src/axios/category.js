import axios from "axios"
import { ref } from "vue"

const fetchCategory = () => {
const category = ref(null)
const getCategory = async() => {
   let response = await axios.get('/api/category');
   category.value = response.data.data
}
return {category,getCategory}
}
export default fetchCategory