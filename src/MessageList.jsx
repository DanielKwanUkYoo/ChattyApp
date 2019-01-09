import React, {Component} from 'react';

class MessageList extends Component {
    render() {
        const message = this.props.messages.map((message, i) => 
            <p key={i}>{message.content} </p>
        );
        const user = this.props.messages.map((user, i) => 
            <p key={i}>{user.username}</p>
        );

        return(  
            <div className="message">
                <span className="message-username">{user}</span>
                <span className="message-content">{message}</span>
            </div>
        )
    }
}

export default MessageList;