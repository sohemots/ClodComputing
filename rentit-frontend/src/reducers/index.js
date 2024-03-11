import { combineReducers } from 'redux'
import auth from './auth'
import message from './message'
import cart from './cart'

export default combineReducers({
  auth,
  message,
  cart
})
