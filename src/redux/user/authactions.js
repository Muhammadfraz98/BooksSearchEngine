import {SETCURRENTUSER,CLEARCURRENTUSER} from './types'
export const  setCurrentUser = user => dispatch => {
  console.log(user)
  dispatch({
    type: SETCURRENTUSER,
    payload: user}
  )
    
  } 
export const clearCurrentUser = () => dispatch => {
dispatch({
   type: CLEARCURRENTUSER
  })
  
  
}

