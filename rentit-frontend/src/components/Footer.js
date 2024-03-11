import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import HomeIcon from '@material-ui/icons/Home'
import ListIcon from '@material-ui/icons/List'
import DashboardIcon from '@material-ui/icons/Dashboard'
import { ShoppingCart } from '@material-ui/icons'
import { Badge } from '@material-ui/core'
import { useHistory, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: 'auto',
    bottom: -1,
    right: 'auto',
    maxWidth: theme.breakpoints.values.md,
    boxShadow: '0px 0px 10px -2px rgba(0,0,0,0.2)'
  },
  bottomNavigation: {
    flexGrow: 1,
    width: '100%',
    height: '100%'
  }
}))

function Footer () {
  const classes = useStyles()
  const history = useHistory()
  const path = useLocation().pathname

  const cart = useSelector(state => state.cart)

  // set the right bottomNavigation to active
  const [value, setValue] = useState(getPathValue())

  function getPathValue () {
    if (path.length === 1) return 'home'
    else {
      let end = path.indexOf('/', 1)
      if (end === -1) {
        end = path.length
      }
      const value = path.substring(1, end)
      if (value === 'categories' || value === 'article' || value === 'search') return 'store'
      else if (value === 'cart' || value === 'checkout') return 'cart'
      else if (value === 'dashboard' || value === 'profile') return 'dashboard'
    }
  }

  useEffect(() => {
    setValue(getPathValue())
  })

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleClick = (to) => {
    history.push(to)
  }

  return (
    <AppBar elevation={4} position="fixed" color="transparent" className={classes.appBar}>
      <Toolbar disableGutters>
        <BottomNavigation
            value={value}
            onChange={handleChange}
            className={classes.bottomNavigation}
        >
            <BottomNavigationAction
              label="Home"
              value="home"
              icon={<HomeIcon />}
              onClick={() => handleClick('/')}
            />
            <BottomNavigationAction
              label="Store"
              value="store"
              icon={<ListIcon />}
              onClick={() => handleClick('/categories')}
            />
            <BottomNavigationAction
              label="Cart"
              value="cart"
              icon={<Badge badgeContent={cart ? cart.items.length : 0} color="primary"><ShoppingCart /></Badge>}
              onClick={() => handleClick('/cart')}
            />
            <BottomNavigationAction
              label="Dashboard"
              value="dashboard"
              icon={<DashboardIcon />}
              onClick={() => handleClick('/dashboard')}
            />
        </BottomNavigation>
      </Toolbar>
    </AppBar>
  )
}

export default Footer
