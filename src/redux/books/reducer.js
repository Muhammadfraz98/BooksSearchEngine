import { GETBOOKS, GETBOOK, GETALLBOOKS } from './types'

const initialState = {
  books: [],
  book: '',
  allbooks: []
}
export default function booksfetch (state = initialState, action) {
  switch (action.type) {
    case GETBOOKS: {
      console.log(action.payload)
      return {
        ...state,
        books: action.payload
      }
    }
    case GETBOOK: {
      console.log(action.payload)
      return {
        ...state,
        book: action.payload
      }
    }
    case GETALLBOOKS: {
      console.log(action.payload)
      return {
        ...state,
        allbooks: [...state.allbooks, ...action.payload]
      }
    }
    default:
      return state
  }
}
