import { ref } from 'vue'
import axios from 'axios'
const allNotification = () => {
  const notiCount = ref()
  const notification = ref()
  const fetchNoti = async (url) => {
    const result = await axios.get('/api/user')
    if (result) {
      const response = await axios.get(url)
      notiCount.value = response.data.notiCount
      notification.value = response.data.notification
    }
  }
  return { notiCount, fetchNoti, notification }
}
export default allNotification
