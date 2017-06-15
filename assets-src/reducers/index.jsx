import {pipe} from 'utilities'
import {getLinksReducer} from './GetLinks'
import {activeUserReducer} from './ActiveUser'
import {deleteLinkReducer} from './DeleteLink'
import {editLinkReducer} from './EditLink'
import {addLinkReducer} from './AddLink'
import {bookmarkLinkReducer} from './BookmarkLink'
import {toggleSidebarReducer} from './ToggleSidebar'
import {scrollLinksReducer} from './ScrollLinks'
import {redditReducer} from './Reddit'


const reducer = (state, action) =>
    pipe(
        addLinkReducer(action),
        deleteLinkReducer(action),
        editLinkReducer(action),
        getLinksReducer(action),
        activeUserReducer(action),
        bookmarkLinkReducer(action),
        toggleSidebarReducer(action),
        scrollLinksReducer(action),
        redditReducer(action),
    )(state)


module.exports = reducer