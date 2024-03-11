/* eslint-disable react/prop-types */
import React from 'react'

import { Box, Divider, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: -1,
    padding: 10,
    display: 'flex',
    alignItems: 'center'
  },
  gridContainer: {
    padding: 30
  },
  image: {
    maxWidth: '100%',
    [theme.breakpoints.down('sm')]: {
      maxHeight: 130
    },
    [theme.breakpoints.up('sm')]: {
      maxHeight: 150
    }
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 20
  },
  title: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
      justifyContent: 'center'
    },
    [theme.breakpoints.up('sm')]: {
      textAlign: 'left',
      justifyContent: 'flex-start'
    }
  },
  price: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center'
    },
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'flex-start'
    },
    marginTop: 25,
    paddingRight: 15,
    paddingBottom: 10
  },
  stock: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center'
    },
    [theme.breakpoints.up('xs')]: {
      justifyContent: 'fle-start'
    }
  },
  lowStock: {
    color: 'red',
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center'
    },
    [theme.breakpoints.up('xs')]: {
      justifyContent: 'fle-start'
    }
  }
}))

function ArticleListItem (props) {
  const classes = useStyles()
  const { article } = props
  const history = useHistory()

  return (
        <Paper variant="outlined" className={classes.root} onClick={() => { history.push('/article/' + article.id) }}>
          <Grid container spacing={3} className={classes.gridContainer}>
            <Grid item xs={12} sm={5} align='center'>
              <img className={classes.image} src={article.imageLink ? article.imageLink : 'https://i.stack.imgur.com/GNhxO.png'}></img>
            </Grid>
            <Grid item xs={12} sm={7} className={classes.info}>
              <Typography className={classes.title} variant="h6">{article.name}</Typography>
              <Divider />
              <Box className={classes.price}>
                <Typography variant="body1">{article.price ? article.price.toFixed(2).replace('.', ',') + '€ / day' : ''}</Typography>
              </Box>
              {article.stockLevel && article.stockLevel > 3
                ? <Box className={classes.stock}>
                  <Typography variant="body2">{article.stockLevel + ' in stock'}</Typography>
                  </Box>
                : <Box className={classes.lowStock}>
                    <Typography variant="body2">{article.stockLevel + ' in stock'}</Typography>
                  </Box>
              }
            </Grid>
          </Grid>
        </Paper>
  )
}

export default ArticleListItem
