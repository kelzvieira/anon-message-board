import React, { Component } from 'react'

class MessageFilters extends Component {
  constructor (props) {
    super(props)
    this.handleLatest = this.handleLatest.bind(this)
    this.handleOldest = this.handleOldest.bind(this)
    this.handleMostLikes = this.handleMostLikes.bind(this)
    this.handleLeastLikes = this.handleLeastLikes.bind(this)
  }

  handleLatest() {
    this.props.onFilterLatest()
  }

  handleOldest() {
    this.props.onFilterOldest()
  }

  handleMostLikes() {
    this.props.onFilterMostLikes()
  }

  handleLeastLikes() {
    this.props.onFilterLeastLikes()
  }

  render() {
    return (
      <div>
        <h5>Sort messages by:</h5>
          <button id="btn-date-latest" class="btn btn-default" onClick={this.handleLatest}>Latest</button>
          <button id="btn-date-oldest" class="btn btn-default" onClick={this.handleOldest}>Oldest</button>
          <button id="btn-likes-most" class="btn btn-default" onClick={this.handleMostLikes}>Most Likes</button>
          <button id="btn-likes-least" class="btn btn-default" onClick={this.handleLeastLikes}>Least Likes</button>
      </div>
    )
  }
}

export default MessageFilters
