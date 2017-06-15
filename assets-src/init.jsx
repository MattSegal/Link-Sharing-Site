/*
    State Tree

    store {
        links {
            items: [link]
            updating: bool
        }

        users {
            items: [user]
            activeUserId: int
        }
        
        nav {
            scrollCount: int
            sidebar: bool
        }

        reddit {
            threads: [thread]
        }

        loggedInUser: user
    }

    link {
        id: int
        created: string
        description: string
        title: string
        url: string
        user: int
        updating: bool
    }

    user {
        id: int
        username: string
        bookmarks: [int]
        reddit_users
    }

    thread {
        reddit_id: string
        is_self: bool
        score: int
        num_comments: int
        comments: [comment]
        created_utc: int
        author: string
        subreddit: string
        permalink: string (relative url)
        url: string (absolute url)
        title: string
    }

    comment {
        // more info here
    }
*/

import {NO_USER_SELECTED, SCROLL_COUNT_INITIAL} from 'constants'

const initialiseState = (state) => ({
    ...state,

    links: {
      ...(state.links),
      updating: false,
      items: state.links.items.map(link => ({
        ...link,
        updating: false,
      })),
    },

    users: {
        ...(state.users),
        activeUserId: NO_USER_SELECTED,
    },

    nav: {
        scrollCount: SCROLL_COUNT_INITIAL,
        sidebar: false,
    },

    reddit: {
        threads: []  // No bootstrap data from reddit
    },

})

module.exports = initialiseState