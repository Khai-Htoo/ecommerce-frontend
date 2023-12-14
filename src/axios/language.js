import { ref } from 'vue'
import axios from 'axios'
const allLanguage = () => {
  const language = ref()
  const fetchLanguage = async () => {
    const response = await axios.get('/api/locale')
    language.value = response.data.locale
  }
  return { language, fetchLanguage }
}
export default allLanguage
