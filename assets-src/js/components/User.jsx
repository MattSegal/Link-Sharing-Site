import React, {PropTypes, Component} from 'react';
import style from 'components/User.scss'

class User extends Component
{
    static propTypes = {
        id: PropTypes.number,
        username: PropTypes.string,
        isCurrent: PropTypes.bool,
        onUserClick: PropTypes.func,
    }
    
    render()
    {
        let userStyle = style.user
        userStyle += this.props.isActive ? ' '+style.selected : ''
        return (
            <li 
                onClick={() => this.props.onUserClick(this.props.id)} 
                className={userStyle}>
                {this.props.username}
            </li>
        )
    }
}

module.exports = User