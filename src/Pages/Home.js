import React from 'react';

class Home extends React.Component {
  constructor() {
    super();
    this.state = { someKey: 'Home' };
  }

  render() {
    return <p>{this.state.someKey}</p>;
  }
}

export default Home;
