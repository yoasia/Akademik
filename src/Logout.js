import React from 'react';

class Logout extends React.Component {
  constructor() {
    super();
    this.state = { someKey: 'Logout' };
  }

  render() {
    return <p>{this.state.someKey}</p>;
  }
}

export default Logout;
