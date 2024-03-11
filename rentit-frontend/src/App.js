/* eslint-disable space-before-function-paren */
import React from 'react'
import store from './store'
import Home from './components/Home'
import Article from './components/Articles/Article'
import Categories from './components/Articles/Categories'
import Category from './components/Articles/Category'
import Cart from './components/Order/Cart'
import Search from './components/Articles/Search'
import Dashboard from './components/Private/Dashboard'
import Header from './components/Header'
import Footer from './components/Footer'
import Register from './components/Authentication/Register'
import Login from './components/Authentication/Login'
import Profile from './components/Private/Profile'

import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

const theme = createMuiTheme({
  spacing: 8,
  palette: {
    primary: {
      main: '#673ab7'
    },
    secondary: {
      main: '#f50057'
    },
    tonalOffset: 0.2,
    background: {
      default: '#fff'
    }
  },
  typography: {
    fontFamily: [
      '\'Bai Jamjuree\'',
      'sans-serif'
    ].join(',')
  }
})

const useStyles = makeStyles({
  root: {
    paddingBottom: 100
  }
})

function App() {
  const classes = useStyles()

  return (
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <Container disableGutters maxWidth="md" className={classes.root}>
            <Header></Header>
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route exact path="/article/:article_id" component={Article}></Route>
              <Route path="/categories/:category_name" component={Category}></Route>
              <Route path="/categories" component={Categories}></Route>
              <Route path="/cart" component={Cart}></Route>
              <Route path="/search/:search_value" component={Search}></Route>
              <Route path="/search" component={Search}></Route>
              <Route path="/login" component={Login}></Route>
              <Route path="/register" component={Register}></Route>
              <Route path="/dashboard" component={Dashboard}></Route>
              <Route path="/profile/" component={Profile}></Route>
            </Switch>
            <Footer></Footer>
          </Container>
        </ThemeProvider>
      </Router>
    </Provider>
  )
}

export default App
