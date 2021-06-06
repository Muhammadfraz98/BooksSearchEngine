import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useDispatch, useSelector } from 'react-redux'
import { bookSearch } from '../redux/books/actions'
import {useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import hero from '../library-bookshelf.jpg'
import '../App.css'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  
}));
export default function SearchEngine () {
  const theme = {
    spacing: value => value ** 2,
  }
  const classes = useStyles();
  const dispatch = useDispatch()
  const [query, setquery] = useState('')
  const bookData = useSelector(state => state.booksfetch.books)
  console.log(bookData)
  let history = useHistory()
  
  const handleOptionChange = (e, v) => {
    console.log(v.id)
    if (v.id) {
      history.push(`/SingleBook/${v.id}`)
    }
  }

  const handleChange = e => {
    let input = e.target.value
    setquery(input)
    console.log(input)
    setTimeout(() => {
      console.log('requesting data...')
    }, 8000)
    dispatch(bookSearch(query))
  }
  const handleClick = () => {
    console.log(query)
    if (query) {
      history.push(`/AllBooks/${query}`)
    }
  }

  useEffect(() => {}, [query])

  return (
    <div className={classes.root} >
      <Grid container spacing={1} justify="center" align="center"  direction="row" >
      <Grid item xs={12} > 
        <img src={hero}/> 
      </Grid>
    </Grid>
    <Grid container spacing={1} justify="center" align="center"  direction="row" >
      <Grid item xs={6} >
      <Autocomplete
        id='free-solo'
        options={bookData}
        freeSolo
        getOptionLabel={option => option.book}
        onChange={handleOptionChange}
        renderInput={params => (
          <TextField
            {...params}
            label='Search'
            size="small"
            variant='outlined'
            onChange={handleChange}
          />
        )}
      />
      </Grid>
      <Grid item  >
        <Button variant='contained' color='primary' size="large" onClick={handleClick}>
          Seacrh
        </Button>
      </Grid>
      </Grid>
    </div>
  )
}

