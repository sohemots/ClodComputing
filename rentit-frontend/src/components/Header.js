/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { logout } from '../actions/auth'
import AuthService from '../services/auth-service'

import { makeStyles, fade } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import LaptopChromebook from '@material-ui/icons/LaptopChromebook'
import SearchIcon from '@material-ui/icons/Search'
import { AccountCircle } from '@material-ui/icons'
import DashboardIcon from '@material-ui/icons/Dashboard'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { Avatar, ListItemIcon, Menu, MenuItem } from '@material-ui/core'
import { useHistory, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  header: {
    paddingBottom: 8
  },
  rentitButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    },
    fontFamily: '\'Geo\', sans-serif'
  },
  search: {
    flexGrow: 1,
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3)
    },
    width: 'auto'
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`
  },
  accountLoggedOut: {
    color: 'white',
    marginLeft: theme.spacing(2),
    marginRight: -5
  },
  accountLoggedIn: {
    color: 'white',
    marginLeft: theme.spacing(2),
    marginRight: -5,
    backgroundColor: theme.palette.secondary.main
  }
}))

function Header (props) {
  const classes = useStyles()
  const { searchValue } = props
  const history = useHistory()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [user, setUser] = React.useState({})
  const { isLoggedIn } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    setUser(AuthService.getCurrentUser())
  }, [isLoggedIn])

  return (
    <div className={classes.header}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            disableRipple
            edge="start"
            className={classes.rentitButton}
            color="inherit"
            aria-label="rentit-button"
            onClick={() => {
              history.push('/')
            }}
          >
            <LaptopChromebook />
          </IconButton>
          <Typography className={classes.title} variant="h4" noWrap>
            RentIt
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <div>
                <InputBase
                placeholder="Search…"
                defaultValue={searchValue}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                onKeyUp={(e) => {
                  // if (e.key === 'Enter') {
                  history.push('/search/' + e.target.value)
                  // }
                }}
                inputProps={{ 'aria-label': 'search' }}
                />
            </div>
          </div>

          {isLoggedIn
            ? (
              <div>
                <Avatar className={classes.accountLoggedIn} onClick={(event) => { setAnchorEl(event.currentTarget) }} >{user && user.firstname ? user.firstname.charAt(0).toUpperCase() : ''}</Avatar>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => { setAnchorEl(null) }}
                >
                  <MenuItem onClick={() => { history.push('/dashboard/'); setAnchorEl(null) }}>
                    <ListItemIcon>
                      <DashboardIcon fontSize="small" />
                    </ListItemIcon>
                    Dashboard
                  </MenuItem>
                  <MenuItem onClick={() => { history.push('/profile/'); setAnchorEl(null) }}>
                    <ListItemIcon>
                      <AccountCircle fontSize="small" />
                    </ListItemIcon>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={() => { logout(dispatch); history.push('/'); setAnchorEl(null) }}>
                    <ListItemIcon>
                      <ExitToAppIcon fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </div>
              )
            : (
              <IconButton className={classes.accountLoggedOut} component={Link} to='/login' aria-label="login">
                <AccountCircle />
              </IconButton>
              )}

        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
