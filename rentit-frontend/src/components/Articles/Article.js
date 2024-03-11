/* eslint-disable react/prop-types */
import { React, useEffect, useState } from 'react'
import { ADD_ITEM } from '../../actions/types'
import axios from 'axios'
import { API_ENDPOINT } from '../../config'

import { Container, Grid, Button, Typography, FormControl, InputLabel, Select, MenuItem, makeStyles, Paper, TableContainer, Table, TableRow, TableCell, TableBody, Badge } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import isBefore from 'date-fns/isBefore'
import sub from 'date-fns/sub'
import { useDispatch, useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  article: {
    padding: '25px 50px 100px 50px',
    [theme.breakpoints.down('md')]: {
      textAlign: 'center'
    },
    [theme.breakpoints.up('md')]: {
      textAlign: 'left'
    }
  },
  skeleton: {
    margin: theme.spacing(2)
  },
  image: {
    maxWidth: '100%',
    maxHeight: 400,
    [theme.breakpoints.down('md')]: {
      marginBottom: 30
    }
  },
  information: {
    [theme.breakpoints.up('md')]: {
      paddingLeft: 30,
      paddingTop: 40
    },
    paddingTop: 0
  },
  bottomArea: {
    paddingTop: 90
  },
  dateText: {
    paddingLeft: 20
  },
  description: {
    marginBottom: 40
  },
  datePicker: {
    marginTop: 60
  },
  badge: {
    height: 43
  },
  metaInfo: {
    paddingTop: 15
  },
  price: {
    marginTop: 50
  },
  priceButton: {
    marginTop: 20,
    width: '75%',
    height: 50
  },
  quantitySelect: {
    marginRight: theme.spacing(3),
    marginTop: 20,
    width: '15%',
    height: 40
  }
}))

function Article (props) {
  const classes = useStyles()
  const articleId = parseInt(props.match.params.article_id)
  const [article, setArticle] = useState({})
  const [quantity, setQuantity] = useState(1) // chosen quantity
  const [availabilityInMonth, setAvailabilityInMonth] = useState({}) // available article per day per month
  const [selectedDate, handleDateChange] = useState(new Date())
  let inCart = 0
  let availableQuantity = 0
  availableQuantity = useSelector(state => {
    if (state.cart.items && article) {
      const itemIndex = state.cart.items.findIndex((i) => {
        return i.article.articleId === articleId
      })
      if (itemIndex >= 0) {
        inCart = state.cart.items[itemIndex].quantity
        return article.stockLevel - state.cart.items[itemIndex].quantity
      }
    }
    return article.stockLevel
  })

  const dispatch = useDispatch()

  useEffect(() => {
    axios.get(API_ENDPOINT + 'articles/' + articleId)
      .then(res => {
        setArticle(res.data)
      })
    axios.get(API_ENDPOINT + 'articles/availableQuantity?id=' + articleId + '&month=' + ((new Date()).getMonth() + 1))
      .then(res => {
        setAvailabilityInMonth(res.data)
      })
  }, [])

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value)
  }

  const handleAddToCart = () => {
    dispatch({
      type: ADD_ITEM,
      payload: {
        articleId: articleId,
        quantity: quantity
      }
    })
  }

  useEffect(() => {
    if (quantity > availableQuantity) setQuantity(availableQuantity)
  }, [availableQuantity])

  const handleMonthChange = async (date) => {
    return axios.get(API_ENDPOINT + 'articles/availableQuantity?id=' + articleId + '&month=' + (date.getMonth() + 1))
      .then(res => {
        setAvailabilityInMonth(res.data)
      })
  }

  return (
      <Container className={classes.article}>
        { article.articleId
          ? (
              <Grid container justify='center'>
                  <Grid item xs={12} md={6} align="center">
                      <img src={article.images[0] ? article.images[0].imageLink : 'https://i.stack.imgur.com/GNhxO.png'} className={classes.image}></img>
                  </Grid>
                  <Grid item xs={12} md={6} className={classes.information}>
                      <Typography variant="h5">{article.name}</Typography>
                      <div className={classes.metaInfo}>
                          <Typography>Serial-No: {article.serialNumber}</Typography>
                          <Typography>Model: {article.model}</Typography>
                      </div>
                      <div>
                          <Typography className={classes.price} variant="h4">{article.price.toFixed(2).replace('.', ',')} €</Typography>
                          {availableQuantity > 0
                            ? <div>
                                <FormControl className={classes.quantitySelect}>
                                  <InputLabel id="quantity-select-label">Qty.:</InputLabel>
                                  <Select
                                    labelId="quantity-select-label"
                                    id="quantity-select"
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                  >
                                    {new Array(availableQuantity).fill(0).map((v, i) => {
                                      return (
                                        <MenuItem key={i} value={(i + 1)}>{(i + 1)}</MenuItem>
                                      )
                                    })}
                                  </Select>
                                  {inCart}x in cart
                                </FormControl>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.priceButton}
                                    endIcon={<ShoppingCartIcon />}
                                    onClick={handleAddToCart}
                                >
                                    Add to cart
                                </Button>
                              </div>
                            : <Button
                              disabled={true}
                              variant="contained"
                              color="disabled"
                              className={classes.priceButton}
                              endIcon={<ShoppingCartIcon />}
                              >
                                  Currently out of stock
                              </Button>
                          }
                        </div>
                  </Grid>
                  <Grid
                    container
                    spacing={4}
                    direction="row-reverse"
                    justify="center"
                    alignItems="flex-start"
                    item xs={12}
                    className={classes.bottomArea}
                  >
                    <Grid item xs={12} sm={6} align='left:'>
                      <Typography className={classes.dateText}>Take a look at the avalability of this article:</Typography>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                          className={classes.datePicker}
                          autoOk
                          disablePast
                          disableToolbar
                          variant="static"
                          openTo="date"
                          value={selectedDate}
                          onChange={handleDateChange}
                          onMonthChange={handleMonthChange}
                          renderDay={(day, selectedDate, isInCurrentMonth, dayComponent) => {
                            return <Badge color='secondary' className={classes.badge} badgeContent={availabilityInMonth.available && isInCurrentMonth && day.getYear() === (new Date()).getYear() && !isBefore(day, sub(new Date(), { days: 1 })) ? availabilityInMonth.available[day.getDate() - 1] : undefined}>{dayComponent}</Badge>
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography className={classes.description} paragraph>{article.description}</Typography>
                      {article.properties
                        ? <div>
                          <Typography variant="h6" paragraph>Properties</Typography>
                          <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="simple table">
                              <TableBody>
                                {Object.keys(article.properties).map((key) => key !== 'propertiesId' && key !== 'article'
                                  ? (
                                    <TableRow key={key}>
                                      <TableCell component="th" scope="row">
                                        {key}
                                      </TableCell>
                                      <TableCell align="right">{article.properties[key]}</TableCell>
                                    </TableRow>
                                    )
                                    // eslint-disable-next-line react/jsx-key
                                  : <div></div>
                                )}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </div>
                        : <div></div>
                      }
                    </Grid>
                  </Grid>
              </Grid>
            )
          : (
              <Grid container>
                  <Grid item xs={12} md={6}>
                      <Skeleton className={classes.skeleton} variant="rect" height={300}/>
                  </Grid>
                  <Grid item xs={12} md={6}>
                      <Skeleton className={classes.skeleton}/>
                      <Skeleton className={classes.skeleton} width="60%"/>
                  </Grid>
                  <Grid item xs={12}>
                      <Skeleton className={classes.skeleton}/>
                      <Skeleton className={classes.skeleton}/>
                      <Skeleton className={classes.skeleton}/>
                      <Skeleton className={classes.skeleton}/>
                      <Skeleton className={classes.skeleton}/>
                  </Grid>
              </Grid>
            )
        }
      </Container>
  )
}

export default Article
