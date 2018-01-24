import React from 'react';

class Laundry extends React.Component {
  constructor() {
    super();
    this.state = { someKey: 'Laundry' };
  }

  render() {
    return <p>{this.state.someKey}</p>;
  }


}

export default Laundry;
