import React from 'react';

class Gym extends React.Component {
  constructor() {
    super();
    this.state = { someKey: 'Gym' };
  }

  render() {
    return <p>{this.state.someKey}</p>;
  }
}

export default Gym;
