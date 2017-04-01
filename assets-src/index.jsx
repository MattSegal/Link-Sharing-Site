"use strict";

import style from 'scss/style.scss'
import React from 'react';
import ReactDOM from 'react-dom'
import {applyMiddleware, createStore} from 'redux'
import {Provider} from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import createLogger  from 'redux-logger'
import {BrowserRouter, Link} from 'react-router-dom'

import reducer from 'reducers'
import {setupState} from 'utilities'
import Content from 'components/Apps/ContentApp'
import Header from 'components/Apps/HeaderApp'


// Middleware
const loggerMiddleware = createLogger()

const middleware = applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
)

// Store - assume we have bootstrapData available
console.log('Loading bootstrap data', bootstrapData)
let initialState = setupState(bootstrapData)
console.log('Set up bootstrap data', bootstrapData)
const store  = createStore(reducer, initialState, middleware)


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Header/>
        <div className="headerSpacer" />
        <div className="contentWrapper">
          <Content/>
        </div>
      </div>
    </BrowserRouter>
  </Provider>, 
  document.getElementById('react-app-root')
)