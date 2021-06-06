import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import {  Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { bookSearch, bookFetch } from '../redux/books/actions'
import {currentUser} from '../redux/user/authactions'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

import clsx from 'clsx';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  image:{
    marginLeft: 100
  }
}))

export default function SingleBook () {
  const [value, setValue] = React.useState(2);
  const [loggedIn, setLoggedIn] = useState(false)

    const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const theme = {
    spacing: value => value ** 2,
  }
  let params = useParams()
  const dispatch = useDispatch()
  const SingleBook = useSelector(state => state.booksfetch.book)
 
 
  const user = useSelector(state => state.auth.currentUser)
  console.log(user)
  const classes = useStyles()

  console.log("single book",SingleBook)
  console.log(params)

  useEffect(() => {
    console.log(params.id)
    dispatch(bookFetch(params.id))
  }, [params.id])

  useEffect(() => {
    localStorage.getItem(user)
    setLoggedIn(true)
  }, [])


// if(!user)return <Redirect to ='/Login'/>
  return (
    <div>
      {SingleBook ? (
        // <List
        //   component='nav'
        //   className={classes.root}
        //   aria-label='mailbox folders'
        // >
        //   <Grid container spacing={1} justify="center" align="center" direction ="row">   
        //     <Grid item >
        //         <Card className={classes.card} >
        //           <CardContent >
        //           <ListItem >
        //             <div className={classes.text}>
        //               <Typography variant="h6" component="h3" >
        //                 {SingleBook.book.value.replace(/[&\/\\,+$~%.:*?<>{}]/g,'')} 
        //               </Typography>
        //             </div>
        //           </ListItem>
        //           <Divider />

        //           {/* <CardMedia
        //             image={SingleBook.image.value}
        //             title="Book"
        //           /> */}
        //           <ListItem >
        //             <img src={SingleBook.image.value} ></img>
        //           </ListItem>
                
                  
        //           </CardContent>
        //         </Card>
        //     </Grid>
        //   </Grid>
        // </List>
        <Grid container spacing={0} justify="center" align="center" direction ="row">

        
            <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            Book
          </Avatar>
        }
        title={SingleBook.book.value.replace(/[&\/\\,+$~%.:*?<>{}]/g,'')}
 
      />
              
      <CardContent className={classes.image}>
      <ListItem alignItems="center">
                     <img src={SingleBook.image.value} ></img>
                   </ListItem>
      </CardContent>
      <CardActions disableSpacing>

        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Average rating: {SingleBook.avg_rating.value}</Typography>
          <Typography paragraph>Ratings Count: {SingleBook.ratings_count.value.replace(/[&\/\\,+$~%.:*?<>{}]/g,'')}</Typography>
        </CardContent>
      </Collapse>
    </Card>
    </Grid>
      ) : (
        <div>
          <Grid ustify="center" direction="row" align="center" >
            <Grid item> 
              <CircularProgress />
            </Grid>
          </Grid>
      </div>
      )}
    </div>
  )
}
