import React, {Component} from 'react';
import {connect} from 'react-redux'
import Sidebar from 'components/Sidebar'
import Actions from 'actions'

class SidebarContainer extends Component
{
  render()
  {
    const {users, loggedInUser} = this.props
    const sortedUsers = users
      .sort((u1, u2) => u1.id - u2.id)
      .map(user => ({
        ...user,
        username: user.username.charAt(0).toUpperCase() + user.username.slice(1),
      }))

    return (
      <Sidebar 
        users={sortedUsers} 
        loggedInUser={loggedInUser}
      />
    )
  }
}

let mapStateToProps = (state) => ({
  users: state.users.items,
  loggedInUser: state.loggedInUser,
})

let mapDispatchToProps = (dispatch) => ({})

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarContainer)