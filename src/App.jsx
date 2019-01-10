import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
const socket = new WebSocket("ws://localhost:3001");


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "bob"},
      messages: []
    }
    this.socket = socket;
    this.addText = this.addText.bind(this);
   
    // this.userInputName = this.userInputName(this);
  }
  
  // userInputName(name) {

  // }

  componentDidMount() {
    console.log("componentDidMount <App />");

    this.socket.onmessage = (e) => {
      console.log(e)
      console.log(JSON.parse(e.data));
      
      this.setState({
        messages: this.state.messages.concat(JSON.parse(e.data))
      })
      
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



  addText(newText) {
    const newMessage = {
      username: this.state.currentUser.name,
      content: newText
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
        <Message user={this.state.currentUser} messages={this.state.messages} />
        <ChatBar user={this.state.currentUser} addText={this.addText} userInputName={this.userInputName}/>
      </div>
      
    );
  }
}
export default App;
