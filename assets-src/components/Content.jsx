import React, {PropTypes, Component} from 'react'
import {Route} from 'react-router-dom'

import LinkListContainer from 'containers/LinkListContainer'
import SidebarContainer from 'containers/SidebarContainer'
import Menu from 'components/Menu'
import LinkModalContainer from 'containers/LinkModalContainer'
import AddLinkModalContainer from 'containers/AddLinkModalContainer'

import style from './Sidebar.scss'

export default class Content extends Component 
{
  static contextTypes = {
    router: PropTypes.object
  }
  
  render() 
  {
    return (
      <div className={style.sidebarWrapper} >
        <Route path="/add" component={({match}) =>
          <AddLinkModalContainer router={this.context.router} />
        } />
        <SidebarContainer router={this.context.router} />
        <Route path="/link/:linkId" component={({match}) =>
          <LinkModalContainer 
            router={this.context.router} 
            linkId={Number(match.params.linkId)}
          />
        }/>
        <LinkListContainer />
      </div>
    )
  }
}
