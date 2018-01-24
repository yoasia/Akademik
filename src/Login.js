import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
    this.state = { someKey: 'Login' };
  }

  render() {
    return <p>{this.state.someKey}</p>;
  }
}

export default Login;
