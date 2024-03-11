import axios from 'axios'
import { API_ENDPOINT } from '../config'

const API_URL = API_ENDPOINT + 'auth/'

class AuthService {
  login (email, password) {
    return axios
      .post(API_URL + 'signin', {
        email: email,
        password: password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data))
        }

        return response.data
      })
  }

  logout () {
    localStorage.removeItem('user')
  }

  register (email, password, lastname, firstname, street, hausNumber, plz, ort) {
    return axios.post(API_URL + 'signup', {
      email,
      password,
      lastname,
      firstname,
      street,
      hausNumber,
      plz,
      ort
    })
  }

  getCurrentUser () {
    return JSON.parse(localStorage.getItem('user'))
  }
}

export default new AuthService()
