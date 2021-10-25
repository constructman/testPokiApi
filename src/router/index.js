import React from 'react'
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'
import App from '../App'
import Header from '../components/Header'
import About from '../About'
import Favorites from '../Favorites'


const Router = () => {
  return (
    <BrowserRouter>
          <Header />
      <Switch>
        <Route exact={true} path="/">
          <App />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/favorites">
          <Favorites />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Router