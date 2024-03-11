/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { register } from '../../actions/auth'
import { CLEAR_MESSAGE } from '../../actions/types'

import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  Grid,
  makeStyles,
  TextField,
  Typography
} from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import { Link, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { isEmail } from 'validator'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    height: 80,
    width: 80,
    margin: theme.spacing(1),
    marginBottom: 20,
    backgroundColor: theme.palette.primary.main
  },
  avatarIcon: {
    height: 'inherit',
    width: 'inherit'
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

export default function SignUp (props) {
  const classes = useStyles()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [street, setStreet] = useState('')
  const [houseNumber, setHouseNumber] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [firstNameError, setFirstNameError] = useState(false)
  const [lastNameError, setLastNameError] = useState(false)
  const [streetError, setStreetError] = useState(false)
  const [houseNumberError, setHouseNumberError] = useState(false)
  const [cityError, setCityError] = useState(false)
  const [postalCodeError, setPostalCodeError] = useState(false)
  const [pwdError, setPwdError] = useState(false)
  const [loading, setLoading] = useState(false)

  const { isLoggedIn } = useSelector(state => state.auth)
  const { message } = useSelector((state) => state.message)
  const dispatch = useDispatch()

  const handleRegister = (e) => {
    e.preventDefault()

    setLoading(true)

    const registerCallback = register(email, password, lastName, firstName, street, houseNumber, postalCode, city)
    registerCallback(dispatch)
      .then(() => {
        props.history.push('/login')
      })
      .catch(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    dispatch({
      type: CLEAR_MESSAGE
    })
  }, [])

  if (isLoggedIn) {
    return <Redirect to="/dashboard" />
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircle className={classes.avatarIcon} />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Create your rentit24 account.
        </Typography>
        <form onSubmit={handleRegister} className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                error = {firstNameError}
                helperText = {firstNameError ? 'The first name must have 2 - 30 characters' : ''}
                autoComplete='fname'
                name='firstName'
                variant='outlined'
                margin='normal'
                required
                fullWidth
                onChange={(e) => setFirstName(e.target.value)}
                onBlur={(e) => { setFirstNameError(e.target.value.length < 2 || e.target.value.length > 30) }}
                onFocus={(e) => { setFirstNameError(false) }}
                id='firstName'
                label='First Name'
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error = {lastNameError}
                helperText = {lastNameError ? 'The last name must have 2 - 30 characters' : ''}
                variant='outlined'
                margin='normal'
                required
                fullWidth
                onChange={(e) => setLastName(e.target.value)}
                onBlur={(e) => { setLastNameError(e.target.value.length < 2 || e.target.value.length > 30) }}
                onFocus={() => { setLastNameError(false) }}
                id='lastName'
                label='Last Name'
                name='lastName'
                autoComplete='lname'
              />
            </Grid>
            <Grid item xs={7}>
              <TextField
                error = {streetError}
                helperText = {streetError ? 'The street must have 3 - 40 characters' : ''}
                variant='outlined'
                margin='normal'
                required
                fullWidth
                onChange={(e) => setStreet(e.target.value)}
                onBlur={(e) => { setStreetError(e.target.value.length < 3 || e.target.value.length > 40) }}
                onFocus={() => { setStreetError(false) }}
                id='street'
                label='Street'
                name='street'
                autoComplete='street'
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                error = {houseNumberError}
                helperText = {houseNumberError ? 'The house number must have 1 - 4 characters' : ''}
                variant='outlined'
                margin='normal'
                required
                fullWidth
                type='number'
                inputProps={{
                  min: '1',
                  max: '9999'
                }}
                onChange={(e) => setHouseNumber(e.target.value)}
                onBlur={(e) => { setHouseNumberError(e.target.value.length < 1 || e.target.value.length > 4) }}
                onFocus={() => { setHouseNumberError(false) }}
                id='houseNumber'
                label='House Number'
                name='houseNumber'
                autoComplete='houseNumber'
              />
            </Grid>
            <Grid item xs={7}>
              <TextField
                error = {cityError}
                helperText = {cityError ? 'The city must have 3 - 20 characters' : ''}
                variant='outlined'
                margin='normal'
                required
                fullWidth
                onChange={(e) => setCity(e.target.value)}
                onBlur={(e) => { setCityError(e.target.value.length < 3 || e.target.value.length > 20) }}
                onFocus={() => { setCityError(false) }}
                id='city'
                label='City'
                name='city'
                autoComplete='city'
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                error = {postalCodeError}
                helperText = {postalCodeError ? 'The postal code must have 5 characters' : ''}
                variant='outlined'
                margin='normal'
                required
                fullWidth
                type="number"
                inputProps={{
                  min: '1',
                  max: '99999'
                }}
                onChange={(e) => setPostalCode(e.target.value)}
                onBlur={(e) => { setPostalCodeError(e.target.value.length !== 5) }}
                onFocus={() => { setPostalCodeError(false) }}
                id='postalCode'
                label='Postal Code'
                name='postalCode'
                autoComplete='postalCode'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                  error = {emailError}
                  helperText = {emailError ? 'Please enter a valid Email Address' : ''}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onBlur={() => { setEmailError(!isEmail(email)) }}
                  onFocus={() => { setEmailError(false) }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error = {pwdError}
                helperText = {pwdError ? 'The password must have 6 - 40 characters' : ''}
                variant='outlined'
                margin='normal'
                required
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
                onBlur={(e) => { setPwdError(e.target.value.length < 6 || e.target.value.length > 40) }}
                onKeyUp={(e) => { setPwdError(e.target.value.length < 6 || e.target.value.length > 40) }}
                onFocus={() => { setPwdError(false) }}
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
              />
            </Grid>
          </Grid>
          {message && <Typography color='error' align="center">{message}</Typography>}
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            disabled={loading || firstNameError || lastNameError || streetError || houseNumberError || cityError || postalCodeError || emailError || pwdError}
          >
            Sign Up
          </Button>
          <Grid container justify='center'>
            <Grid item>
                <Typography variant="body1" align="center">
                    Already have an account?&nbsp;
                    <Link to="/login">
                        Login
                    </Link>
                </Typography>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}
