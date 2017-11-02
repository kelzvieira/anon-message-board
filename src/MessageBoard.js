import React, { Component } from 'react'

class MessageBoard extends Component {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
  }



  handleSubmit() {
    const text = document.getElementById('message').value
    this.props.onNewPost(text)
  }

  render() {
    return (
      <div class="panel-group">
        <div class="panel panel-primary">
          <div class="panel-heading">{this.props.title}</div>
          <div class="panel-body">
            <div class="form-group">
              <label>{this.props.inputLabel}</label>
              <textarea id="message" type="text" class="form-control"></textarea>
            </div>
            <button id="submit" class="btn btn-default" onClick={this.handleSubmit}>{this.props.buttonText}</button>
          </div>
        </div>
      </div>
    )
  }
}

export default MessageBoard
