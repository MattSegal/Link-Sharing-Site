import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Actions from 'actions'
import HyperLink from 'components/HyperLink'

import FaArrowCircleODown from 'react-icons/lib/fa/arrow-circle-o-down'
import Spinner from 'components/Spinner'

import userStyle from 'scss/components/RedditUsers'

class RedditFeedContainer extends Component {
  static propTypes = {
    reddit: PropTypes.object,
  }

  epochToDate = (utcSeconds) => {
    const d = new Date(0)
    d.setUTCSeconds(utcSeconds)
    return d
  }


  // Todo check for logged in
  render()
  {
    const {loggedInUser} = this.props
    const {threads, updating} = this.props.reddit
    return (
      <div>
        <div className={userStyle.panel}>
          <div>
            <span className={userStyle.panelTitle}>Reddit Users</span>
            <span className={userStyle.download}>
              {updating 
                  ? <Spinner />
                  : <FaArrowCircleODown onClick={() => this.props.fetchThreads(loggedInUser.reddit_users.map(user => user.username))}/>
              }
            </span>
          </div>
          <div>
            {loggedInUser.reddit_users.map((user, idx) =>
              <div key={idx}>{user.username}</div>
            )}
          </div>
        </div>
        <div>
          {threads
            .sort((t1, t2) => t2.created_utc - t1.created_utc)
            .map(thread =>
            <HyperLink 
              key={thread.reddit_id}
              link={{
                title: thread.title,
                url: thread.url,
                username: thread.author,
                created: this.epochToDate(thread.created_utc),
                updating: false,
              }}
            />
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  reddit: state.reddit,
  loggedInUser: state.loggedInUser,
})

const mapDispatchToProps = (dispatch) => ({
  fetchThreads: (threads) => dispatch(Actions.fetchRedditThreads(threads)),
})

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(RedditFeedContainer)