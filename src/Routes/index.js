import React from 'react'
import { NavLink, Switch, Route, Redirect ,Link} from 'react-router-dom'
import UseAutocomplete from '../pages/SearchEngine'
import SingleBook from '../pages/BookDetail'
import BooksList from '../pages/BooksList'
import Login from '../Login'

function index() {
    return (
        <div>
            <Switch>
               <Route
                    exact
                    activeClassName
                    current
                    path='/'
                    component={UseAutocomplete}
                ></Route>

                <Route
                    exact
                    activeClassName
                    current
                    path='/SingleBook/:id'
                    component={SingleBook}
                ></Route>

                <Route
                    exact
                    activeClassName
                    current
                    path='/'
                    component={UseAutocomplete}
                ></Route>
                    
                <Route
                    exact
                    activeClassName
                    current
                    path='/AllBooks/:query'
                    component={BooksList}
                ></Route>

                <Route
                    exact
                    activeClassName
                    current
                    path='/Login'
                    component={Login}
                ></Route>
                
                <Redirect from='/login' to='/' />
            </Switch>
        </div>
    )
}

export default index;
