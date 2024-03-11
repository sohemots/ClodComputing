import axios from 'axios'
import { API_ENDPOINT } from '../config'
import authHeader from './auth-header'

const API_URL = API_ENDPOINT
const USERS_API = API_ENDPOINT + 'user/'

class UserService {
  getPublicContent () {
    return axios.get(API_URL)
  }

  getUserBoard () {
    return axios.get(USERS_API, { headers: authHeader() })
  }

  getOneUser (id) {
    return axios.get(USERS_API + id)
  }
}

export default new UserService()
