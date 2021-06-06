import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSelector, useDispatch } from 'react-redux'
import { bookSearch, bookFetch, AllBooksFetch } from '../redux/books/actions'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Waypoint } from 'react-waypoint'
import { Link, Redirect, useHistory } from 'react-router-dom'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'


const useStyles = makeStyles((theme) => ({
  root: {
      padding: theme.spacing(2,0,0,0),
      width:'100%',
      flexGrow: 1,
  },
 
}));
export default function BooksList () {
  const classes = useStyles();
  let params = useParams()
  let history = useHistory()
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const user=useSelector(state=>state.auth.currentUser)
  console.log(user)
  const AllBooks = useSelector(state => state.booksfetch.allbooks)
  console.log(AllBooks)
  console.log(params)
  const [loggedIn, setLoggedIn] = useState(false)
  
  const handleEnter = () => {
    console.log('bottom of page')
    setPage(page + 1)
    dispatch(AllBooksFetch(params.query, page))
  }

  useEffect(() => {
    dispatch(AllBooksFetch(params.query, page))
  }, [])

  // useEffect(() => {
  //   localStorage.getItem(user)
  //   console.log(user,'user exist')
  //   setLoggedIn(true)
  // }, [user])

  console.log(page)
  console.log(user, 'user......')

  
  // if(!user) return <Redirect to ='/Login'/>
  return (
    <div className={classes.root}>
     
      <ol>
        {AllBooks.map(book => (         
          <Link to={`/SingleBook/${book.id}`}>
              <Grid container spacing={2} justify="center" direction="row" align="center"  >
              <Grid item xs={3}> 
                 <Paper item elevation={1}>
                  <img
                    src={book.image}
                    alt={book.book}     
                  />
                    <p>{book.book}</p>
                 </Paper>

                  
            </Grid>
            </Grid>
          </Link>
          
        ))}
      </ol>
    
      <Waypoint onEnter={handleEnter}>
      <div >
      <Grid justify="center" align="center"  >
        <Grid item > 
          <CircularProgress />
      </Grid>
      </Grid>
    </div>
      </Waypoint>
      
    </div>
  )
  }
// }