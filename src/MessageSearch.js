import React, { Component } from 'react';

class MessageSearch extends Component {
  constructor(props) {
    super(props)

    this.handleSearchButton = this.handleSearchButton.bind(this);
    this.handleSearchClear = this.handleSearchClear.bind(this);
  }

  handleSearchButton() {
    // retrieves user input value
    const text = document.getElementById('search-bar').value
    // retrieves the onSearch function from App and runs it with the above value
    this.props.onSearch(text)
    document.getElementById('search-bar').value = ''
  }

  handleSearchClear() {
    // sets the searchText state to an empty string
    this.props.onSearch('')
  }

  render() {
    return(
      <div className='search-bar'>
        <input type="text" id='search-bar' className='margin-medium input-search'></input>
        <button className='margin-medium btn btn-default' onClick={this.handleSearchButton}>Search</button>
        <button className='margin-medium btn btn-default' onClick={this.handleSearchClear}>Clear results</button>
      </div>
    )
  }
}

export default MessageSearch
