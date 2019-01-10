import React, {Component} from 'react';

class Message extends Component {
    render() {
    const currentName = this.props.user.name;
        // console.log(`hey i'm at Message`,this.props.user)
    const previousName =this.props.user.previousName;    
    // let newName = (this.props.user.type === "Incoming Notification") ? currentName : "false"
    // console.log(newName, this.props.currentUser)

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