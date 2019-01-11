//TODO notifications deletes when changed again
//Empty inputname will be anonymous
//is it same browser?
import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
const socket = new WebSocket("ws://localhost:3001");


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {
        name: 'bob',
        changed: false
      },
      numUser: 0,
      messages: []
    }
    this.socket = socket;
    this.addText = this.addText.bind(this);
    this.addNewUser = this.addNewUser.bind(this);

  }


  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket.onmessage = (e) => {
      const data = JSON.parse(e.data)

      switch(data.type) {
        case "Incoming Message":
          data.type = "Incoming Message(front)"
          this.setState({
            messages: this.state.messages.concat(data)
          })
        break;
        case "Incoming User":
          data.type = "Incoming Notification"
          this.setState({
            currentUser: data
          })
        break;
        case "Incoming newUser":
        console.log(`data has arrived`, data)
        this.setState({
          numUser: data.numOfUser
        })
      }
    }


    setTimeout(() => {
    const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    const messages = this.state.messages.concat(newMessage)
    this.setState({messages: messages})
    }, 3000);
  }

//-------------------------------------------
  addNewUser(newUser) {
    const addedUser = {
      previousName: this.state.currentUser.name,
      name: newUser,
      type: "Post User",
      changed: true
    }
    this.socket.send(JSON.stringify(addedUser))
  }
//-------------------------------------------
  addText(newText) {
    
    const newMessage = {
      username: this.state.currentUser.name,
      content: newText,
      type: "Post Message"
    }
    this.socket.send(JSON.stringify(newMessage));
  }

//-------------------------------------------
  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <p className="userCount">User Count: {this.state.numUser}</p>
        </nav>
        <MessageList messages={this.state.messages} />
        <Message user={this.state.currentUser} />
        <ChatBar user={this.state.currentUser} addText={this.addText} addNewUser={this.addNewUser}/>
      </div>
      
    );
  }
}
export default App;
