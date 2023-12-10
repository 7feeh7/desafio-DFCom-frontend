import axios from 'axios'
import { parseCookies } from 'nookies'

const { 'dfcom-accessToken': token } = parseCookies()

const api = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:5000',
})

api.interceptors.request.use((config) => {
  console.log(config)

  return config
})

if (token) {
  api.defaults.headers.Authorization = `Bearer ${token}`
}

export default api
