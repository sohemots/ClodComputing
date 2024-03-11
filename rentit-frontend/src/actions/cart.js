import { ADD_ITEM, DELETE_ITEM, REMOVE_ITEM, CHANGE_QUANTITY, CLEAR_CART, CHANGE_RETURNDATE, CHANGE_RENTALDATE } from './types'

export const addItem = (articleId, quantity) => ({
  type: ADD_ITEM,
  payload: {
    articleId: articleId,
    quantity: quantity
  }
})

export const changeQuantity = (articleId, quantity) => ({
  type: CHANGE_QUANTITY,
  payload: {
    articleId: articleId,
    quantity: quantity
  }
})

export const changeRentalDate = (articleId, newDate) => ({
  type: CHANGE_RENTALDATE,
  payload: {
    articleId: articleId,
    rentalDate: newDate
  }
})
export const changeReturnDate = (articleId, newDate) => ({
  type: CHANGE_RETURNDATE,
  payload: {
    articleId: articleId,
    returnDate: newDate
  }
})

export const removeItem = (articleId) => ({
  type: REMOVE_ITEM,
  payload: { articleId: articleId }
})

export const deleteItem = (articleId) => ({
  type: DELETE_ITEM,
  payload: { articleId: articleId }
})

export const clearCart = (articleId) => ({
  type: CLEAR_CART
})
