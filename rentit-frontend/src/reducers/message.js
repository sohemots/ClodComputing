/* eslint-disable default-param-last */
import { SET_MESSAGE, CLEAR_MESSAGE } from '../actions/types'

const initialState = {}

export default function (state = initialState, action) {
  if (action === undefined) return state

  const { type, payload } = action

  switch (type) {
    case SET_MESSAGE:
      return { message: payload }

    case CLEAR_MESSAGE:
      return { message: '' }

    default:
      return state
  }
}
