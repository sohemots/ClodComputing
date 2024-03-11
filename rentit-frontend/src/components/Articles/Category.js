/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API_ENDPOINT } from '../../config'

import { Box, makeStyles } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import ArticleListItem from './ArticleListItem'

const useStyles = makeStyles((theme) => ({
  skeleton: {
    margin: theme.spacing(2),
    height: 50
  }
}))

function Category (props) {
  const classes = useStyles()
  const [category, setCategory] = useState([])

  const categoryName = props.match.params.category_name
  useEffect(() => {
    axios.get(API_ENDPOINT + 'categories/name/' + categoryName)
      .then(res => {
        setCategory(res.data)
      })
  }, [])

  return (
    <div>
      {category !== undefined
        ? (
          <Box align="center" mt={3}>
              {category.map((article, index) => {
                return <ArticleListItem key={index} article={article}></ArticleListItem>
              })}
          </Box>
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
    </div>
  )
}

export default Category
