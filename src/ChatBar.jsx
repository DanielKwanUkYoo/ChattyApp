import React, {Component} from 'react';

class ChatBar extends Component {
    
    render() {
        const {name} = this.props.user;
        return (
        <footer className="chatbar">
            <input className="chatbar-username" placeholder={name} />
            <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
        </footer>
        )
    }
}

export default ChatBar;