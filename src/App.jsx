import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "bob"},
      messages: [
        {
          username: "bob",
          content: "something"
        },
        {
          username: "anonymous",
          content: "anonymouse said"
        }
      ]
    }
  }
  
  componentDidMount() {
    console.log(`it mounted!`)
  }
  
  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <Message user={this.state.currentUser} messages={this.state.messages} />
        <ChatBar user={this.state.currentUser} />
      </div>
      
    );
  }
}
export default App;
