import React, { useEffect, useState } from 'react'
import ArticleListItem from '../Articles/ArticleListItem'
import { CHANGE_RENTALDATE, CHANGE_QUANTITY, CHANGE_RETURNDATE, CLEAR_CART, DELETE_ITEM } from '../../actions/types'
import { API_ENDPOINT } from '../../config'
import authHeader from '../../services/auth-header'

import { Typography, Button, makeStyles, Grid, MenuItem, Select, InputLabel, FormControl, Paper, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, IconButton, Backdrop, CircularProgress } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import sub from 'date-fns/sub'
import add from 'date-fns/add'
import Axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  checkoutButton: {
    display: 'flex',
    margin: '20px auto',
    height: 50
  },
  article: {
    marginTop: 0
  },
  articleListItem: {
    width: '100%'
  },
  deleteButton: {
    marginBottom: -25,
    marginLeft: 'auto'
  },
  deleteButtonContainer: {
    display: 'flex',
    justifyContent: 'flex-start'
  },
  dateAndQuantity: {
    display: 'flex',
    padding: 30,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cartInfo: {
    marginTop: 100
  }
}))

const Cart = () => {
  const classes = useStyles()
  const { isLoggedIn } = useSelector(state => state.auth)
  const history = useHistory()
  const [open, setOpen] = useState(false)
  const [backDropOpen, setbackDropOpen] = useState(false)
  const [articles, setArticles] = useState([])
  const [total, setTotal] = useState(0)
  const dispatch = useDispatch()

  let cart = {}
  const calculateTotal = () => {
    if (cart && cart.items && articles.length > 0) {
      let sum = 0
      cart.items.forEach((item, index) => {
        // console.log(articles[index].price + ' * ' + item.quantity + ' * (' + new Date(item.returnDate).getDate() + ' - ' + new Date(item.rentalDate).getDate() + ' = ' + (new Date(item.returnDate).getDate() - new Date(item.rentalDate).getDate()) + ')')
        sum += articles[index].price * item.quantity * (new Date(item.returnDate).getDate() - new Date(item.rentalDate).getDate())
      })
      setTotal(sum)
    }
  }
  cart = useSelector(state => {
    calculateTotal()
    return state.cart
  })

  useEffect(() => {
    Axios({
      method: 'POST',
      url: API_ENDPOINT + 'articles/articlesByIds/',
      data: {
        ids: cart.items.map((item) => item.article.articleId)
      }
    }).then(res => {
      setArticles(res.data.filter((article) => article))
    })
  }, [])

  useEffect(calculateTotal, [articles])

  const rent = () => {
    setbackDropOpen(true)
    Axios({
      method: 'POST',
      url: API_ENDPOINT + 'quantities/',
      data: cart.items,
      headers: authHeader()
    }).then(res => {
      setbackDropOpen(false)
      dispatch({
        type: CLEAR_CART
      })
    }).catch(() => {
      setbackDropOpen(false)
    })
    setOpen(false)
  }

  const handleQuantityChange = (articleId, event) => {
    dispatch({
      type: CHANGE_QUANTITY,
      payload: {
        articleId: articleId,
        quantity: event.target.value
      }
    })
  }

  const handleRentalDateChange = (articleId, newDate) => {
    dispatch({
      type: CHANGE_RENTALDATE,
      payload: {
        articleId: articleId,
        rentalDate: newDate
      }
    })
  }

  const handleReturnDateChange = (articleId, newDate) => {
    dispatch({
      type: CHANGE_RETURNDATE,
      payload: {
        articleId: articleId,
        returnDate: newDate
      }
    })
  }

  const handleDelete = (articleId) => {
    dispatch({
      type: DELETE_ITEM,
      payload: {
        articleId: articleId
      }
    })
  }

  return (
        <div>
          <Backdrop invisible={true} open={backDropOpen}>
            <CircularProgress color="primary" />
          </Backdrop>
            {cart && cart.items.length > 0
              ? <div>
                  <Grid container justify="center" alignItems="center">
                    <Grid item xs={12} md={6} align="center">
                      <Typography variant='h5'>Total: {total}€</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Button disabled={backDropOpen} className={classes.checkoutButton} onClick={() => setOpen(true)} variant="contained" color="primary"endIcon={<ArrowForwardIosIcon />}>Proceed to Checkout</Button>
                      {isLoggedIn
                        ? <Dialog
                            fullWidth={true}
                            maxWidth='sm'
                            open={open}
                            onClose={() => setOpen(false)}
                          >
                            <DialogTitle id="confirmation-dialog">Ready to rent?</DialogTitle>
                            <DialogContent>
                              <DialogContentText>
                                You will rent {cart.items.length} item(s) and pay a total of {total}€.
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={() => { rent() }} color="primary">
                                Rent Now
                              </Button>
                            </DialogActions>
                          </Dialog>
                        : <Dialog
                            fullWidth={true}
                            maxWidth='sm'
                            open={open}
                            onClose={() => setOpen(false)}
                          >
                            <DialogTitle id="confirmation-dialog">Please log in or register to rent your articles.</DialogTitle>
                            <DialogContent>
                              <DialogContentText>
                               You need an account to rent your articles from RENTIT24. 👾
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={() => { history.push('/login') }} color="primary">
                                Login
                              </Button>
                              <Button onClick={() => { history.push('/register') }} color="primary">
                                Register
                              </Button>
                            </DialogActions>
                          </Dialog>
                      }
                    </Grid>
                  </Grid>
                  {articles && articles.length > 0
                    ? articles.map((article, index) => {
                      return (
                          <div key={index}>
                            {article && cart.items[index]
                              ? <div className={classes.article}>
                                  <div className={classes.deleteButtonContainer}>
                                    <IconButton disabled={backDropOpen} className={classes.deleteButton} onClick={() => { handleDelete(article.id) }} color='secondary'><DeleteForeverIcon /></IconButton>
                                  </div>
                                  <ArticleListItem article={article}></ArticleListItem>
                                  <Paper square variant='outlined' className={classes.dateAndQuantity}>
                                    <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
                                      <Grid item xs={12} sm={2} align='center'>
                                        <FormControl>
                                          <InputLabel id="quantity-select-label">Qty.:</InputLabel>
                                          <Select
                                            labelId="quantity-select-label"
                                            id="quantity-select"
                                            value={cart.items[index].quantity}
                                            onChange={(event) => handleQuantityChange(article.id, event)}
                                          >
                                            {new Array(article.stockLevel).fill(0).map((v, i) => {
                                              return (
                                                <MenuItem key={i} value={(i + 1)}>{(i + 1)}</MenuItem>
                                              )
                                            })}
                                          </Select>
                                        </FormControl>
                                      </Grid>
                                      <Grid item xs={5} sm={3} align='center'>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                          <KeyboardDatePicker
                                            disableToolbar
                                            disablePast
                                            maxDate={ sub(new Date(cart.items[index].returnDate), { days: 1 }) }
                                            variant="inline"
                                            format="dd/MM/yyyy"
                                            id="date-picker-inline"
                                            label="Rental Date"
                                            value={cart.items[index].rentalDate}
                                            onChange={(newDate) => { handleRentalDateChange(article.id, newDate) }}
                                            KeyboardButtonProps={{
                                              'aria-label': 'change date'
                                            }}
                                          />
                                        </MuiPickersUtilsProvider>
                                      </Grid>
                                      <Grid item xs={2} sm={2} align='center'>
                                        <Typography variant="body1">{(new Date(cart.items[index].returnDate).getDate() - new Date(cart.items[index].rentalDate).getDate()) > 0 ? (new Date(cart.items[index].returnDate).getDate() - new Date(cart.items[index].rentalDate).getDate()) + ' Day(s)' : ''}</Typography>
                                      </Grid>
                                      <Grid item xs={5} sm={3} align='center'>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                          <KeyboardDatePicker
                                            disableToolbar
                                            disablePast
                                            minDate={add(new Date(), { days: 1 })}
                                            variant="inline"
                                            format="dd/MM/yyyy"
                                            id="date-picker-inline"
                                            label="Return Date"
                                            value={cart.items[index].returnDate}
                                            onChange={(newDate) => { handleReturnDateChange(article.id, newDate) }}
                                            KeyboardButtonProps={{
                                              'aria-label': 'change date'
                                            }}
                                          />
                                        </MuiPickersUtilsProvider>
                                      </Grid>
                                      <Grid item xs={12} sm={2} align='center'>
                                        <Typography variant="body1">{(new Date(cart.items[index].returnDate).getDate() - new Date(cart.items[index].rentalDate).getDate()) > 0 ? '= ' + (articles[index].price * cart.items[index].quantity * (new Date(cart.items[index].returnDate).getDate() - new Date(cart.items[index].rentalDate).getDate())) + '€' : ''}</Typography>
                                      </Grid>
                                    </Grid>
                                  </Paper>
                                </div>
                              : <div></div>
                            }
                          </div>
                      )
                    })
                    : <div>
                        {Array(30).fill(0).map((a, i) => {
                          return (
                            <Skeleton key={i} className={classes.skeleton} variant="rect"/>
                          )
                        })}
                      </div>
                    }
                  </div>
              : <Typography className={classes.cartInfo} variant='h5' align="center">Your cart is empty.</Typography>
            }
        </div>
  )
}

export default Cart
