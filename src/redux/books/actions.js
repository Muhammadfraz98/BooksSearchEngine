import axios from 'axios'
import XMLParser from 'react-xml-parser'
import { GETBOOKS, GETBOOK, GETALLBOOKS } from './types'
let selectedFilter
let AllselectedFilter

export const bookSearch = query => dispatch => {
  axios
    .get(
      `https://www.goodreads.com/search/index.xml?key=FtRVHgmjzjpzKjCt3SUMw&q=${query}`
    )
    .then(response => {
      let jsonData = new XMLParser().parseFromString(response.data)
      console.log(jsonData)
      let booksList = jsonData.children[1].children[6].children
      if (booksList && booksList.length) {
        selectedFilter = booksList.map(book => {
          return {
            id: book.children[8].children[0].value,
            book: book.children[8].children[1].value,
            author: book.children[8].children[2].value
          }
          console.log(book)
        })
        console.log(selectedFilter)
        dispatch({
          type: GETBOOKS,
          payload: selectedFilter
        })
      } else {
        console.log('no more results from query searched')
      }
    })
    .catch(err => console.log(err))
}
export const bookFetch = id => dispatch => {
  axios
    .get(`https://www.goodreads.com/book/show/${id}?key=FtRVHgmjzjpzKjCt3SUMw`)
    .then(response => {
      let jsonsData = new XMLParser().parseFromString(response.data)
      console.log(jsonsData)
      let bookList = jsonsData.children[1].children
      console.log(bookList)
      let bookFilter = {
        book: bookList[1],
        image: bookList[8],
        avg_rating: bookList[18],
        ratings_count: bookList[22],
        author: bookList[26]
      }

      console.log(bookFilter)
      dispatch({
        type: GETBOOK,
        payload: bookFilter
      })
    })
    .catch(err => console.log(err))
}
export const AllBooksFetch = (query, page) => dispatch => {
  console.log(page)
  axios
    .get(
      `https://www.goodreads.com/search/index.xml?key=FtRVHgmjzjpzKjCt3SUMw&q=${query}+&page=${page}`
    )

    .then(response => {
      let jsonData = new XMLParser().parseFromString(response.data)
      console.log(jsonData)
      let AllbooksList = jsonData.children[1].children[6].children
      if (AllbooksList && AllbooksList.length) {
        AllselectedFilter = AllbooksList.map(book => {
          return {
            book: book.children[8].children[1].value,
            id: book.children[8].children[0].value,
            image: book.children[8].children[3].value
          }
          console.log(book)
        })
        console.log(AllselectedFilter)
        dispatch({
          type: GETALLBOOKS,
          payload: AllselectedFilter
        })
      } else {
        console.log('no more results again again')
      }
    })
    .catch(err => console.log(err))
}
