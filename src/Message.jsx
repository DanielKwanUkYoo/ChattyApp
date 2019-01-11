import React, {Component} from 'react';

class Message extends Component {
    render() {
    const currentName = this.props.user.name;
    const previousName =this.props.user.previousName;    
        return (
            <main className="messages">
                <div className="message system">            
                    <p>{this.props.user.changed && 
                    previousName + ' changed to ' + currentName}
                    </p>
                </div>
            </main>            
        )
    }
}
export default Message;