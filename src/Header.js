import React, { Component } from 'react'

class Header extends Component {
  // retrieving any properties (props) sent through when this component is called
  constructor (props) {
    super(props)
  }
  render() {
    return (
      <nav class="navbar">
        <div class="container-fluid">
          <div class="navbar-header ">
            {/* using the 'props' to populate the title  */}
            <h1>{this.props.title}</h1>
          </div>
        </div>
      </nav>
    )
  }
}

export default Header
