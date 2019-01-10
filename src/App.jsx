//TODO notifications deletes when changed again
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
        break;
        case "Incoming User":
          data.type = "Incoming Notification"
          // data.content = "User"
        break;
      }
      
      
      
      this.setState({
        currentUser: data,
        messages: this.state.messages.concat(JSON.parse(e.data))
      })
      console.log(`i'm currentState`, this.state.currentUser)
      
    }


    setTimeout(() => {
    console.log("Simulating incoming message");
    // Add a new message to the list of messages in the data store
    const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    const messages = this.state.messages.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages})
  }, 3000);
  }


  addNewUser(newUser) {
    const addedUser = {
      previousName: this.state.currentUser.name,
      name: newUser,
      type: "Post User",
      changed: true
    }
    this.socket.send(JSON.stringify(addedUser))
    // this.setState({
    //   currentUser: addedUser
    // })
  }

  addText(newText) {
    
    const newMessage = {
      username: this.state.currentUser.name,
      content: newText,
      type: "Post Message"
    }
    this.socket.send(JSON.stringify(newMessage));
  }

  
  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <Message user={this.state.currentUser} />
        <ChatBar user={this.state.currentUser} addText={this.addText} addNewUser={this.addNewUser}/>
      </div>
      
    );
  }
}
export default App;
