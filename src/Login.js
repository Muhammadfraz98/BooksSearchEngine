import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { useDispatch } from 'react-redux'
import {setCurrentUser,clearCurrentUser} from './redux/user/authactions'
const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: '100%', 

    marginTop: theme.spacing(1),
    
  },
  submit: {

    margin: theme.spacing(1)
  }
}))
const Login = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)

  // login the user
  const handleSignIn = e => {
    e.preventDefault()
    if(name.length> 0  && password.length > 0) {
      const user={name: name,password}
      console.log(user)
      localStorage.setItem("user", ["name: " ,user.name," password: ", user.password]);
      setLoggedIn(true);
      dispatch(setCurrentUser(user))
    }
  }
  if(loggedIn) {
    return <Redirect to="/" />
  }
  else {
   <Redirect to="/login" />
  }
  
  return (
    
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} noValidate>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h6'>
            Log in
          </Typography>
          <TextField
            variant='outlined'
            margin='normal'
            required
            size="small"
            id='Name'
            label='Name'
            name='Name'
            autoComplete='Name'
            autoFocus
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            size="small"
            name='password'
            label='Password'
            type='password'
            id='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete='current-password'
          />
          <br></br>
          <Button
            type='submit'
            size="small"
            
            variant='contained'
            color='primary'
            className={classes.submit}
            onClick={handleSignIn}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  )
}
export default Login
