import React, {PropTypes, Component} from 'react';
import style from 'components/Sidebar.scss'

const User = props => 
{
    const username = props.username.charAt(0).toUpperCase() + props.username.slice(1);
    const userStyle = style.user + (props.isActive ? ' ' + style.selected : '')
    return (
        <li 
            onClick={() => props.onUserClick(props.id)} 
            className={userStyle}>
            {username}
        </li>
    )
}
User.propTypes = {
    id: PropTypes.number,
    username: PropTypes.string,
    isActive: PropTypes.bool,
    onUserClick: PropTypes.func,
}

module.exports = User