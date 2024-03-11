/* eslint-disable react/prop-types */
import React from 'react'
import './Home.css'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { Button, Container, Grid } from '@material-ui/core'
import ImageGallery from 'react-image-gallery'
import { useSelector } from 'react-redux'

const useStyles = makeStyles({
  root: {
    paddingTop: 30
  },
  login: {
    margin: '40px 0'
  },
  images: {
    marginTop: 50
  },
  card: {
    width: '80%',
    marginTop: 70
  },
  media: {
    height: 200
  }
})

function Home (props) {
  const classes = useStyles()
  const { isLoggedIn } = useSelector(state => state.auth)
  const images = [
    {
      original: 'https://atouba-bucket.s3.amazonaws.com/images/renIT_bild1.jpg'
    },
    {
      original: 'https://atouba-bucket.s3.amazonaws.com/images/renIT_bild2.png'
    },
    {
      original: 'https://atouba-bucket.s3.amazonaws.com/images/renIT_bild3.jpg'
    }
  ]

  return (
    <Container className={classes.root} align="center">
      <Typography variant="h4" align="center" paragraph>Welcome to RentIT</Typography>
      <Typography variant="subtitle1" align="center" paragraph>Your place to rent IT-Devices with comfort.</Typography>
      {!isLoggedIn
        ? <div>
          <Grid className={classes.login} spacing={2} container justify='space-around'>
            <Grid item xs={12} sm={4}>
              <Button fullWidth variant="outlined" color='primary' onClick={() => props.history.push('/login')}>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button fullWidth variant="contained" color='primary' onClick={() => props.history.push('/register')}>
                Register
              </Button>
            </Grid>
          </Grid>
            </div>
        : <div></div>
      }
      <div className={classes.images}>
        <ImageGallery items={images} autoPlay={true} showThumbnails={false} showFullscreenButton={false} showPlayButton={false}/>
      </div>
      <Card elevation={2} className={classes.card}>
        <CardActionArea onClick={() => props.history.push('/categories')}>
          <CardMedia
            className={classes.media}
            image="https://atouba-bucket.s3.amazonaws.com/images/rentIT_bild4.png"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="h6">
              Check our categories 💻🖥🖨📱
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              ... and find something you like!
          </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card elevation={2} className={classes.card}>
        <CardActionArea onClick={() => props.history.push('/cart')}>
          <CardMedia
            className={classes.media}
            image="https://atouba-bucket.s3.amazonaws.com/images/rentIT_bild5.jpg"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="h6">
              Already put something in the cart? 📝
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Time to rent!
          </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Container>
  )
}

export default Home
