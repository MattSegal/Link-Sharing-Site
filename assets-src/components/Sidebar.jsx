import React, {PropTypes, Component} from 'react'
import style from './Sidebar.scss'
import {Link, Switch, Route} from 'react-router-dom'
import {NO_USER_SELECTED} from 'constants'


class Sidebar extends Component
{
  static propTypes = {
    users: PropTypes.array,
    loggedInUser: PropTypes.object,
  }

  render()
  {
    const {users, loggedInUser} = this.props
    const maxId = Math.max(...(users.map(u => u.id)))
    const loggedIn = child => loggedInUser.id !== NO_USER_SELECTED && child
    const loggedOut = child => loggedInUser.id === NO_USER_SELECTED && child
    const routed = (route, child, key) => (
      <Switch key={key}>
        <Route path={route}>
          <li><Link to={route} className={style.selectedItem}>{child}</Link></li>
        </Route>
        <Route>
          <li><Link to={route} className={style.item}>{child}</Link></li>
        </Route>
      </Switch>
    )
    const linked = (route, child, key) => (
      <li key={key}><a href={route} className={style.item}>{child}</a></li>
    )

    return (
      <div>
        <div className={style.sidebarSpacer} />
        <div className={style.sidebar}>
          <Switch key={-1}>
            <Route exact path="/">
              <li><Link to="/" className={style.selectedItem}>Latest</Link></li>
            </Route>
            <Route>
              <li><Link to="/" className={style.item}>Latest</Link></li>
            </Route>
          </Switch>
          {users.map(u => routed(`/user/${u.username}`, u.username, u.id))}
          {loggedIn(routed("/bookmarks", "Bookmarks", maxId + 1))}
          {loggedIn(linked("/change", "Change Password", maxId + 2))}
          {loggedIn(linked("/logout", "Log Out", maxId + 3))}
          {loggedOut(linked("/login", "Log In", maxId + 4))}
          {loggedOut(linked("/signup", "Sign Up", maxId + 5))}
        </div>
      </div>
    )
  }
}

module.exports = Sidebar