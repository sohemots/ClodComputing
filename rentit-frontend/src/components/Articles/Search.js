/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import ArticleListItem from './ArticleListItem'
import { API_ENDPOINT } from '../../config'

import { Box, Container, FormControl, Input, InputAdornment, InputLabel, makeStyles, MenuItem, Select, Typography } from '@material-ui/core'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  filter: {
    margin: '20px 0',
    display: 'flex'
  },
  filterItem: {
    margin: '0 5px',
    width: 200
  },
  categoryFilterItem: {
    margin: '0 5px',
    width: 250
  },
  infoText: {
    margin: '30px 0'
  }
}))

function Search (props) {
  const classes = useStyles()

  const searchValue = props.match.params.search_value

  const [articles, setArticles] = useState([])
  const [category, setCategory] = useState('All')
  const [categories, setCategoryies] = useState([])
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(99999)

  useEffect(() => {
    console.log(category)
    axios.get(API_ENDPOINT + 'articles/search', {
      params: {
        name: searchValue,
        category: category !== 'All' ? category : '',
        minPrice: minPrice,
        maxPrice: maxPrice
      }
    })
      .then(res => {
        setArticles(res.data)
      })
  }, [searchValue, category, minPrice, maxPrice])

  useEffect(() => {
    axios.get(API_ENDPOINT + 'categories/name/')
      .then(res => {
        setCategoryies(res.data)
      })
  }, [])

  return (
    <Container>
      <Box className={classes.filter}>
        <FormControl className={classes.categoryFilterItem}>
          <InputLabel htmlFor="minPrice-filter">Category</InputLabel>
          <Select
            id="category-filter"
            value={category}
            onChange={(event) => { setCategory(event.target.value) }}
          >
            <MenuItem value={'All'}>{'All'}</MenuItem>
            {categories.map((cat, i) => {
              return <MenuItem key={i} value={cat}>{cat}</MenuItem>
            })}
          </Select>
        </FormControl>
        <FormControl className={classes.filterItem}>
          <InputLabel htmlFor="minPrice-filter">Min. Price</InputLabel>
          <Input
            id="minPrice-filter"
            value={minPrice}
            onChange={(event) => { setMinPrice(event.target.value) }}
            startAdornment={<InputAdornment position="start">€</InputAdornment>}
          />
        </FormControl>
        <FormControl className={classes.filterItem}>
          <InputLabel htmlFor="minPrice-filter">Max. Price</InputLabel>
          <Input
            id="maxPrice-filter"
            value={maxPrice}
            onChange={(event) => { setMaxPrice(event.target.value) }}
            startAdornment={<InputAdornment position="start">€</InputAdornment>}
          />
        </FormControl>
      </Box>
      { searchValue && articles.length > 0
        ? (
            <div>
              <Typography className={classes.infoText} variant='subtitle1' align="left">Ihre suche nach {'"'}{searchValue}{'"'} ergab folgende Treffer:</Typography>
              {articles.map((article, index) => {
                return (
                  <ArticleListItem key={index} article={article}></ArticleListItem>
                )
              })}
            </div>
          )
        : (
          <div>Type your search above</div>
          )
      }
    </Container>
  )
}

export default Search
