import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import BookIcon from '@material-ui/icons/Book'
import { NavLink } from 'react-router-dom'
import React from 'react'
import Routes from './Routes/index';
import { useDispatch, useSelector } from 'react-redux'
import { clearCurrentUser} from './redux/user/authactions'
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
  }
}))

export default function MenuAppBar () {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick=e=>{
   localStorage.clear();
   dispatch(clearCurrentUser())
  }
  const user = useSelector(state => state.auth.currentUser)
  console.log(user)
  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          >
            <BookIcon color="secondary"/>
          </IconButton>
          <Typography variant='h6' className={classes.title}>
           Search
          </Typography>
          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                {!user ?(
                  <NavLink to='/Login'>
                    <MenuItem onClick={handleClick} >         
                      Login
                    </MenuItem>
                  </NavLink>
                ) : (   
                  <NavLink to='/Login'>
                    <MenuItem  onClick={handleClick}>
                      Logout
                    </MenuItem>
                  </NavLink>           
                )}
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Routes />
    </div>
  )
}
