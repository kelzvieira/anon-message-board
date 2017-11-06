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
      <div className='filter-bar'>
        <p><span className='filter-bar-label'>Sort posts:</span>
          <span id="btn-date-latest" className="margin-medium filter-option" onClick={this.handleLatest}>Latest First &darr;</span>
          <span id="btn-date-oldest" className="margin-medium filter-option" onClick={this.handleOldest}>Oldest First &uarr;</span>
          <span id="btn-likes-most" className="margin-medium filter-option" onClick={this.handleMostLikes}>Most Likes &uarr;</span>
          <span id="btn-likes-least" className="margin-medium filter-option" onClick={this.handleLeastLikes}>Least Likes &darr;</span>
        </p>
      </div>
    )
  }
}

export default MessageFilters
