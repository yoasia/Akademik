import React from 'react';

class Footer extends React.Component {
  constructor() {
    super();
    this.state = { someKey: 'Footer' };
  }

  render() {
    return <p>{this.state.someKey}</p>;
  }

}

export default Footer;
