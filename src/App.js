import React, { Component } from 'react';
import './App.css';

// end top boilerplate (imports)
import Header from './Header';
import Message from './Message';
import MessageInput from './MessageInput';
import MessageFilter from './MessageFilter';
import MessageSearch from './MessageSearch';
// importing some third-party components to help with ID setting
import uuid from 'uuid';
// end imports of components

class App extends Component {
  constructor(props){
    super(props)
    // set the default state the app will load when it is first rendered
    this.state = {
      messages: [
        { id: uuid.v4(), text: "This is a post. Pretty standard stuff.", likes: -1, timestamp: 1509794011149 },
        { id: uuid.v4(), text: "This is anothher post, only wth some typos init", likes: 3, timestamp: 1509663092732 },
        { id: uuid.v4(), text: "Oh look! This post's punctuation is different - Fancy.", likes: 2, timestamp: 1509663092790 },
        { id: uuid.v4(), text: "Yet another post – with an emdash this time!", likes: 0, timestamp: 1509663092767 }
      ],
      // setting a state where only a 'text' variable is passed through which then
      // filters the messageBoard contents based on user search queries
      // a computered state - which leaves the original state (ie. the 'true' state) of all messages posted untouched
      searchText: '',
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
    this.handleSearch = this.handleSearch.bind(this);
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
    const message = { id: uuid.v4(), text: text, likes: 0, timestamp: timestamp }
    // then push this new 'message' object to the end of the current 'messages' array
    this.state.messages.unshift(message)
    // then set this new 'messages' array as the current version of 'messages' in this instance
    this.setState({
      messages: this.state.messages
    })
  }

  /* want to try to combine all filters into one handle to make code drier
  where the filter name is passed as a prop from the app
  and then the code is executed via callbacks in the MessageFilter component */

  handleFilterLatest() {
    // sorting the messages array by the timestamp property
    this.state.messages.sort(function(a, b) {
      return a.timestamp - b.timestamp
      // and then reversing it as it reads lowest integer first
      // timestamp is unix - meaning lowest value is the oldest value
    }).reverse()
    this.setState({
      messages: this.state.messages
    })
  }

  handleFilterOldest() {
    // same as above but not reversed
    this.state.messages.sort(function(a, b) {
      return a.timestamp - b.timestamp
    })
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

  handleSearch(text) {
    // receives 'text' value from user input in the MessageSearch component
    // sets this 'text' value as the searchText state to be called on as a filter value
    // when this.state.messages are called in this app
    this.setState({
      searchText: text,
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
            <div class="panel panel-primary">
              <div class="panel-heading">Message Board</div>
              <MessageSearch onSearch={this.handleSearch}/>
              {/* add logic for if element is true / false to show / hide results and inversely show / hide message board*/}
              <MessageFilter
                /* these will be callbacks - functions sent to other functions in another component
                (where they refrenced under a different name as a prop in this case) */
                onFilterLatest={this.handleFilterLatest}
                onFilterOldest={this.handleFilterOldest}
                onFilterMostLikes={this.handleFilterMostLikes}
                onFilterLeastLikes={this.handleFilterLeastLikes}/>
              <div class="panel-body">
                <ul class="message-board">
                  {/* run through all objects within 'messages' array and remake each object
                  in the format that sends each property value to the 'Message' component correctly mapped as props */}
                  {this.state.messages
                    // calling the current searchText state to filter this.state.messages by with .includes() method
                    // if it's an empty string (as is the case in the default value or when searchClear runs),
                    // the filter will match to all string entries and return all messages.
                    // As the filter handlers work on the current state, this does not affect them
                    // i.e. search results and new posts made after searching are filtered as well
                    .filter(message => message.text.toLowerCase().includes(this.state.searchText.toLowerCase()))
                    /* need to work out some way of having an error message return
                    when no matched posts can be retrieved - i.e. when the above searchText state is empty */
                    .map(message => {
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
                    )})
                  }
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
