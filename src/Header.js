import React from 'react';

class Header extends React.Component {
  constructor() {
    super();
    this.state = { someKey: 'Header' };
  }

  render() {
    return <p>{this.state.someKey}</p>;
  }

}

export default Header;
