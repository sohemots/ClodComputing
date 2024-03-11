/* eslint-disable react/prop-types */
import { React, useEffect, useState } from 'react'
import { login } from '../../actions/auth'
import { CLEAR_MESSAGE } from '../../actions/types'

import { Link, Redirect } from 'react-router-dom'
import { Avatar, Button, Container, CssBaseline, makeStyles, TextField, Typography } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import { isEmail } from 'validator'
import { useDispatch, useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    height: 80,
    width: 80,
    margin: theme.spacing(2),
    marginBottom: 20,
    backgroundColor: theme.palette.primary.main
  },
  avatarIcon: {
    height: 'inherit',
    width: 'inherit'
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

function Login (props) {
  const classes = useStyles()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const { isLoggedIn } = useSelector(state => state.auth)
  const { message } = useSelector(state => state.message)

  const dispatch = useDispatch()

  const handleLogin = (e) => {
    e.preventDefault()

    setLoading(true)

    const loginCallback = login(email, password)
    loginCallback(dispatch)
      .then(() => {
        props.history.push('/dashboard')
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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircle className={classes.avatarIcon}/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in to your rentit24 account.
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleLogin}
        >
          <TextField
            error = {error}
            helperText = {error ? 'Please enter a valid Email Adress' : ''}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onBlur={() => { setError(!isEmail(email)) }}
            onFocus={() => { setError(false) }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {message && <Typography color='error' align="center">{message}</Typography>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading || error}
          >
            Sign In
          </Button>
          <Typography variant="body1" align="center">
            Dont have an account?&nbsp;
            <Link to="/register">
              Register
            </Link>
          </Typography>
        </form>
      </div>
    </Container>
  )
}

export default Login
