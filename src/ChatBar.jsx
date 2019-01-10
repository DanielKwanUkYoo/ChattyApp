import React, {Component} from 'react';

class ChatBar extends Component {

    render() {
        const {name} = this.props.user;
        const newText = (e) => {
            e.preventDefault();
            if (e.key === 'Enter') {
                this.props.addText(e.target.value)
                e.target.value = '';   
            }
        }
        const newUser = (e) => {
            e.preventDefault();
            if (e.key === "Enter") {
                e.target.placeholder = e.target.value;
                this.props.addNewUser(e.target.value)
            }
        }

        return (
        <footer className="chatbar">
            <input onKeyUp={newUser} className="chatbar-username" placeholder={name} />
            <input onKeyUp={newText} name="textbox" className="chatbar-message" placeholder="Type a message and hit ENTER" />
        </footer>
        )
    }
}

export default ChatBar;

