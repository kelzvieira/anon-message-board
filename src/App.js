import React, { Component } from 'react';
import './App.css';

// end top boilerplate (imports)

import Header from './Header';
import Message from './Message';
import MessageBoard from './MessageBoard';
import uuid from 'uuid';

// end imports of custom components

class App extends Component {
  constructor(props){
    super(props)
    // setting the default state the app will load when it is first rendered
    this.state = {
      messages: [
        { id: uuid.v4(), text: "Hello", likes: 0 },
        { id: uuid.v4(), text: "Goodbye", likes: 0 },
        { id: uuid.v4(), text: "Sayonarra", likes: 0 },
        { id: uuid.v4(), text: "Konnichiwa", likes: 0 }
      ]
    }
    // binding my functions in this component
    this.handleLike = this.handleLike.bind(this);
    this.handleDislike = this.handleDislike.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleNewPost = this.handleNewPost.bind(this);
  }

  handleLike(id) {
    const message = this.state.messages.find(
      // search through 'messages' array for message with ID that matches
      // what the 'Message' component sent onClick in handleThumbsUp
      message => message.id === id
    )
    // add 1 to the 'likes' property of 'messages' object
    message.likes = message.likes +1;
    // make this new 'message' object the current version of it in this instance
    this.setState({
      messages: this.state.messages
    })
  }

  handleDislike(id) {
    const message = this.state.messages.find(
      message => message.id === id
    )
    // same as above but -1
    message.likes = message.likes -1;
    this.setState({
      messages: this.state.messages
    })
  }

  handleDelete(id) {
    // same as above but filtering down to all 'messages' objects in the array
    // minus the one that matches the Id passed through 'Message' component handleBin
    // and setting that as a new variable, 'newMessages'
    const newMessages = this.state.messages.filter(
      message => message.id !== id
    )
    this.setState({
      messages: newMessages
    })
  }

  handleNewPost(text) {
    const message = { id: uuid.v4(), text: text, likes: 0 }
    this.state.messages.push(message)
    this.setState({
      messages: this.state.messages
    })
  }

/* handlePost(text) {
    const message = { id: uuid.v4(), text: text, likes: 0 }
    this.state.messages.push(message)
    this.setState({
      messages: this.state.messages
    })
  } */

  render() {
    return (
      <div className="App">
        <div class="container">
          <Header title={"Anon Message Board"} />
          <MessageBoard
            title={"Post a message"}
            inputLabel={"Type your message here"}
            buttonText={"Post to the board"}
            onNewPost={this.handleNewPost}
          />

          <div class="panel-group">
            <div class="panel panel-default">
              <div class="panel-heading">Message Board</div>
              <div class="panel-body">
                <ul class="message-board">
                  {/* running through all objects within 'messages' array and remaking making each object in the following format*/}
                  {this.state.messages.map(message => {
                    return(
                      <Message
                        text={message.text}
                        likes={message.likes}
                        id={message.id}
                        // Here is where I call my functions written above and binded to this 'App' component
                        // These functions will receive the ID value of a post from the 'Message' component when triggered
                        onLike={this.handleLike}
                        onDislike={this.handleDislike}
                        onDeleteMessage={this.handleDelete}
                      />
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
