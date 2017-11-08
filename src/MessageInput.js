import React, { Component } from 'react'

class MessageInput extends Component {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleSubmit triggers when button is clicked (onClick) and receives
  // onNewPost as a prop from the App component
  // the value of which is a function called handleNewPost
  handleSubmit() {
    const text = document.getElementById('message').value
    this.props.onNewPost(text)
    document.getElementById('message').value = ''
  }

  render() {
    return (
      <div className="panel-group">
        <div className="panel panel-primary">
          <div className="panel-heading">{this.props.title}</div>
          <div className="panel-body">
            <div className="form-group">
              <label>{this.props.inputLabel}</label>
              {/* using id 'message' to retrieve the value entered by user in handleSubmit getElementById method */}
              <textarea id="message" type="text" className="form-control"></textarea>
            </div>
            {/* event listener to check when button is clicked to then trigger 'handleSubmit' event */}
            <button id="submit" className="btn btn-default" onClick={this.handleSubmit}>
              {this.props.buttonText}
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default MessageInput
