// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { store } from 'state'
import { Header, ScrollFooter } from 'comps'

import {
  // AddLinkModalContainer,
  LoginContainer,
  LinkListContainer,
  LinkDetailsContainer,
  BookmarkListContainer,
  SearchContainer,
} from 'containers'

const ROUTES = [
  // { path: '/add', comp: AddLinkModalContainer },
  { path: '/bookmarks', comp: BookmarkListContainer },
  { path: '/login', comp: LoginContainer },
  { path: '/search', comp: SearchContainer },
  { path: '/link/:linkId', comp: LinkDetailsContainer },
  { path: '/', comp: LinkListContainer },
]

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <React.Fragment>
        <Header />
        <Switch>
          {ROUTES.map(r => (
            <Route key={r.path} path={r.path}>
              <r.comp />
            </Route>
          ))}
        </Switch>
        <ScrollFooter />
      </React.Fragment>
    </BrowserRouter>
  </Provider>
)

const root: any = document.getElementById('app')
ReactDOM.render(<App />, root)
