/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Container, Grid, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  heading: {
    marginTop: 40
  },
  table: {
    marginTop: 70
  }
}))

function Profile () {
  const classes = useStyles()
  const [user, setUser] = useState({})
  const { isLoggedIn } = useSelector(state => state.auth)

  useEffect(() => {
    if (isLoggedIn) {
      setUser(JSON.parse(localStorage.getItem('user')))
    }
  }, [isLoggedIn])

  return (
    <Container>
      {isLoggedIn
        ? <div>
            <Typography className={classes.heading} variant='h4' align="center">Your Profile</Typography>
            <Grid className={classes.table} container justify='center' alignItems='center' align='center' spacing={3}>
              <Grid item xs={12} sm={5}>
              <Typography variant='body1'>First name:</Typography>
              </Grid>
              <Grid item xs={12} sm={5}>
                <Typography variant='body2'>{user.firstname}</Typography>
              </Grid>
              <Grid item xs={12} sm={5}>
                <Typography variant='body1'>Last name:</Typography>
              </Grid>
              <Grid item xs={12} sm={5}>
                <Typography variant='body2'>{user.lastname}</Typography>
              </Grid>
              <Grid item xs={12} sm={5}>
                <Typography variant='body1'>Address:</Typography>
              </Grid>
              <Grid item xs={12} sm={5}>
                <Typography variant='body2'>{user.street + ' ' + user.hausNumber + ' | ' + user.plz + ' ' + user.ort}</Typography>
              </Grid>
              <Grid item xs={12} sm={5}>
                <Typography variant='body1'>Email:</Typography>
              </Grid>
              <Grid item xs={12} sm={5}>
                <Typography variant='body2'>{user.email}</Typography>
              </Grid>
            </Grid>
          </div>
        : (
          <Typography variant='h5' align="center">Signin to get the Dashboad</Typography>
          )
      }
    </Container>
  )
}

export default Profile
