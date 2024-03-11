/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { API_ENDPOINT } from '../../config'
import AuthService from '../../services/auth-service'
import authHeader from '../../services/auth-header'

import { Backdrop, Button, CircularProgress, Divider, Grid, makeStyles, Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import Axios from 'axios'

const useStyles = makeStyles((theme) => ({
  tableHeader: {
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20
  },
  welcome: {
    marginTop: 50
  },
  loginInfo: {
    marginTop: 100
  },
  rentalInfo: {
    marginTop: 30
  },
  tableRow: {
    padding: 10
  },
  image: {
    width: 'auto',
    maxHeight: 180,
    maxWidth: '100%'
  }
}))

function Dashboard () {
  const classes = useStyles()
  const [user, setUser] = useState(null)
  const { isLoggedIn } = useSelector(state => state.auth)
  const [rentedArticles, setRentedArticles] = useState([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
      Axios.get(API_ENDPOINT + 'quantities/listRental/', { headers: authHeader() })
        .then(res => {
          setRentedArticles(res.data)
        })
    }
  }, [])

  const handleReturn = (articleQuantityId) => {
    setOpen(true)
    Axios({
      method: 'POST',
      url: API_ENDPOINT + 'quantities/return/',
      data: {
        ids: [articleQuantityId]
      },
      headers: authHeader()
    }).then(res => {
      Axios.get(API_ENDPOINT + 'quantities/listRental/', { headers: authHeader() })
        .then(res => {
          setRentedArticles(res.data)
          setOpen(false)
        })
        .catch(() => {
          setOpen(false)
        })
    })
  }

  return (
    <div>
        {user && isLoggedIn
          ? (
            <div>
              <Typography className={classes.welcome} variant='h4' align="center">Hi {user.firstname} 👋</Typography>
              {rentedArticles.length > 0
                ? <div>
                    <Typography className={classes.rentalInfo} variant='h6' align="center">Here is an overview of your rented items:</Typography>
                    <Grid className={classes.tableHeader} container spacing={2} alignItems='center' justify='center' align='center'>
                    <Grid item xs={12} md={2}></Grid>
                      <Grid item xs={5} md={2}>
                        <Typography variant='body1'>Name</Typography>
                      </Grid>
                      <Grid item xs={4} md={1}>
                        <Typography variant='body2' >Qty.</Typography>
                      </Grid>
                      <Grid item xs={4} md={2}>
                        <Typography variant='body2' >Rent Date</Typography>
                      </Grid>
                      <Grid item xs={4} md={1}>
                        <Typography variant='body2' >Return Date</Typography>
                      </Grid>
                      <Grid item xs={5} md={2}>
                        <Typography variant='body2' >Extend</Typography>
                      </Grid>
                      <Grid item xs={5} md={1}>
                        <Typography variant='body2' >Return</Typography>
                      </Grid>
                    </Grid>
                    <Divider></Divider>
                    {rentedArticles.map((article, index) => {
                      return (
                        <div key={index}>
                          <Grid container className={classes.tableRow} spacing={3} alignItems='center' justify='center' align='center'>
                            <Grid item xs={12} md={2}>
                              <img className={classes.image} src={article.imageLink} height='auto' width='100%'/>
                            </Grid>
                            <Grid item xs={5} md={2}>
                              <Typography variant='body1' paragraph>{article.name}</Typography>
                            </Grid>
                            <Grid item xs={4} md={1}>
                              <Typography variant='body2' >{article.quantity}x</Typography>
                            </Grid>
                            <Grid item xs={4} md={2}>
                              <Typography variant='body2' >{article.rent_date.substr(0, 10).replaceAll('-', '.')}</Typography>
                            </Grid>
                            <Grid item xs={4} md={1}>
                              <Typography variant='body2' >{article.return_date ? article.return_date.substr(0, 10).replaceAll('-', '.') : '-'}</Typography>
                            </Grid>
                            <Grid item xs={5} md={2}>
                              <Button disabled variant="contained" color='primary'>
                                Extend
                              </Button>
                            </Grid>
                            <Grid item xs={5} md={1}>
                              <Button disabled={open} variant="contained" color='secondary' onClick={() => handleReturn(article.article_quantityId)}>
                                Return
                              </Button>
                            </Grid>
                          </Grid>
                          <Divider></Divider>
                        </div>
                      )
                    })}
                  </div>
                : <Typography className={classes.rentalInfo} variant='h6' align="center">You currently have no rentals.</Typography>}
            </div>
            )
          : (
              <Typography className={classes.loginInfo} variant='h5' align="center">Please log in or create an account to see your Dashboard.</Typography>
            )}
      <Backdrop invisible={true} open={open}>
        <CircularProgress color="primary" />
      </Backdrop>
    </div>
  )
}

export default Dashboard
