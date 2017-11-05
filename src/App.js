import React, { Component } from 'react';
import './App.css';

// end top boilerplate (imports)

import Header from './Header';
import Message from './Message';
import MessageInput from './MessageInput';
import MessageFilter from './MessageFilter';
import uuid from 'uuid';

// end imports of custom components


/* Bonus objectives:
Allow the ordering of messages in the board by amount of likes
Allow the ordering of messages in the board by newest/oldest
Add search functionality in the form of a search bar
Use fuzzy searching to quickly find messages (hint: google it) */


class App extends Component {
  constructor(props){
    super(props)
    // set the default state the app will load when it is first rendered
    this.state = {
      messages: [
        { id: uuid.v4(), text: "Hello", likes: -1, timestamp: 1509794011149 },
        { id: uuid.v4(), text: "Goodbye", likes: 3, timestamp: 1509663092732 },
        { id: uuid.v4(), text: "Sayonarra", likes: 2, timestamp: 1509663092790 },
        { id: uuid.v4(), text: "Konnichiwa", likes: 0, timestamp: 1509663092767 }
      ]
    }
    // bind functions in this component
    this.handleLike = this.handleLike.bind(this);
    this.handleDislike = this.handleDislike.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleNewPost = this.handleNewPost.bind(this);
    this.handleFilterLatest = this.handleFilterLatest.bind(this);
    this.handleFilterOldest = this.handleFilterOldest.bind(this);
    this.handleFilterMostLikes = this.handleFilterMostLikes.bind(this);
    this.handleFilterLeastLikes = this.handleFilterLeastLikes.bind(this);
  }

  handleLike(id) {
    const message = this.state.messages.find(
      // search through 'messages' array for message with ID that matches
      // what the 'Message' component sends onClick in handleThumbsUp
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
    // minus the one that matches the Id passed through 'Message' component's 'handleBin'
    // and setting that as a new variable 'newMessages'
    const newMessages = this.state.messages.filter(
      message => message.id !== id
    )
    this.setState({
      messages: newMessages
    })
  }

  handleNewPost(text) {
    // get the current date then reformat timestamp in unix format
    // to add when this message is being posted as an object property
    const date = new Date()
    const timestamp = date.getTime()
    // set up an object within a variable which only exists in the scope of this function ('message')
    // this object has default post values (ie. a random uuid is generated and 0 likes)
    // plus adds the 'text' value passed from the 'MessageBoard' component when 'handleSubmit' runs
    const message = { id: uuid.v4(), text: text, likes: 0, timesamp: timestamp }
    // then push this new 'message' object to the end of the current 'messages' array
    this.state.messages.unshift(message)
    // then set this new 'messages' array as the current version of 'messages' in this instance
    this.setState({
      messages: this.state.messages
    })
  }

  handleFilterLatest() {
    this.state.messages.sort(function(a, b) {
      return a.timestamp - b.timestamp
    })
    this.setState({
      messages: this.state.messages
    })
  }

  handleFilterOldest() {
    this.state.messages.sort(function(a, b) {
      return a.timestamp - b.timestamp
    }).reverse()
    this.setState({
      messages: this.state.messages
    })
  }

  handleFilterMostLikes() {
    this.state.messages.sort(function(a, b) {
      return a.likes - b.likes
    }).reverse()
    this.setState({
      messages: this.state.messages
    })
  }

  handleFilterLeastLikes() {
    this.state.messages.sort(function(a, b) {
      return a.likes - b.likes
    })
    this.setState({
      messages: this.state.messages
    })
  }

  getTimeStamp() {
    let date = new Date()
    let timestamp = date.getTime()
    console.log(timestamp)
  }

  render() {
    return (
      <div className="App">
        <div class="container">
          {this.getTimeStamp()}
          {/* call the component 'Header' and pass it a 'prop' named 'title' with the value 'Anon Message Board' */}
          <Header title={"Anon Message Board"} />
          {/* Call the 'MessageBoard' component and pass through the title, label, button text
          plus the method / function 'handleNewPost' to enable use in the component - */}
          <MessageInput
            title={"Post a message"}
            inputLabel={"Type your message here"}
            buttonText={"Post to the board"}
            // Pass 'handleNewPost' as a prop to component 'MessageBoard'
            onNewPost={this.handleNewPost}
          />

          <div class="panel-group">
            <div class="panel panel-default">
              <div class="panel-heading">Message Board</div>
              <MessageFilter
                onFilterLatest={this.handleFilterLatest}
                onFilterOldest={this.handleFilterOldest}
                onFilterMostLikes={this.handleFilterMostLikes}
                onFilterLeastLikes={this.handleFilterLeastLikes}/>
              <div class="panel-body">
                <ul class="message-board">
                  {/* run through all objects within 'messages' array and remake each object
                  in the format that sends each property value to the 'Message' component correctly mapped as props */}
                  {this.state.messages.map(message => {
                    return(
                      <Message
                        text={message.text}
                        likes={message.likes}
                        id={message.id}
                        // functions are sent through as props to then be called in the 'Message' component
                        // by their prop name, not their function name
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
