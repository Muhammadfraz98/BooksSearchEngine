import {SETCURRENTUSER,CLEARCURRENTUSER} from './types'

const initialState = {
  currentUser: '',
 
}

const authReducer = (state = initialState, action) => {
 
  switch (action.type) {
  
    case SETCURRENTUSER:
      console.log(action.payload)
     console.log(state)
      return {
        ...state,
        currentUser: action.payload
  
      }

    case CLEARCURRENTUSER:
      return {
        ...state,
        currentUser: ''
      }

    default:
      return state
  }
}


// export const selectUser = (state) => state.user.user;

export default authReducer
