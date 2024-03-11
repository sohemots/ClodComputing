/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API_ENDPOINT } from '../../config'

import { Container, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import Skeleton from '@material-ui/lab/Skeleton'

const useStyles = makeStyles((theme) => ({
  skeleton: {
    margin: theme.spacing(2),
    height: 50
  }
}))

function Categories (props) {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    axios.get(API_ENDPOINT + 'categories/name/')
      .then(res => {
        setCategories(res.data)
      })
  }, [])
  const classes = useStyles()
  return (
    <Container>
      {Object.keys(categories).length
        ? (
            <List>
              {Object.keys(categories).map((key) => {
                return (
                  <ListItem button key={key} onClick={() => props.history.push('/categories/' + key)}>
                    <ListItemIcon>
                      <ArrowForwardIosIcon />
                    </ListItemIcon>
                    <ListItemText primary={key} secondary={categories[key]}/>
                  </ListItem>
                )
              })}
            </List>
          )
        : (
            <div>
              {Array(30).fill(0).map((a, i) => {
                return (
                  <Skeleton key={i} className={classes.skeleton} variant="rect"/>
                )
              })}
            </div>
          )
        }
    </Container>
  )
}

export default Categories
