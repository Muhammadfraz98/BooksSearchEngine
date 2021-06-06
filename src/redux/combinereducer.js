import { combineReducers, createStore } from 'redux'
import booksfetch from './books/reducer'
import authReducer from './user/authreducer'


function saveToLocalStorage(state){
  try{
      const serializedState = JSON.stringify(state)
      localStorage.setItem('user', serializedState)
  }catch(e){
      console.log(e)
  }
}


function LoadFromLocalStorage(){
  try{
      const serialzedState = localStorage.getItem('user')
      if(serialzedState === null) return undefined
      return JSON.parse(serialzedState)
  }catch(e){
      console.log(e);
      return undefined
  }
}

const rootReducer= combineReducers({
   booksfetch,
  auth: authReducer
})


const presistedState = LoadFromLocalStorage()


//store
const store = createStore(
  rootReducer,
  presistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

store.subscribe(()=> saveToLocalStorage(store.getState()))

export default rootReducer
