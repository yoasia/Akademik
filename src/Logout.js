import React from 'react';
import axios from 'axios';

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      sended:false,
      logout:false,
      logout:props.logout
    };
    this.logout = this.logout.bind(this);
  }

  componentDidMount(){
    this.logout();
  }

  logout(){
    let self = this;
    var sended = false;
    var logout = false;
    axios.get("http://localhost:3000/logout")
    .then(function (response) {
        sended = true;
        if(response.data.status){
            logout = true;
            self.state.logout();
            self.setState({sended, logout});
        }
        else{
            logged = false;
            self.setState({sended, logout});
        }
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return null;
  }
}

export default Logout;
