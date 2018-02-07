import React from 'react';
import axios from 'axios';

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      sended:false,
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
    axios.get("api/logout.php")
    .then(function (response) {
        sended = true;
        if(response.data.status){
            self.setState({sended});
            self.state.logout();
        }
        else{
          logout = false;
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
