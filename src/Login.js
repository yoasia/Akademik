import React from 'react';
import axios from 'axios';
import md5 from 'md5';
import { Card, Loader, Image, Segment, Dimmer, 
  Menu, Button, Icon, Grid, Form,  Header  } from 'semantic-ui-react';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      logged: false,
      email: '', 
      password: '', 
      afterLogin:props.afterLogin,
      userData:null,
      msg:null
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, { name, value }) {
    if(name == "password")
      value = md5(value);
    this.setState({ [name]: value });
  } 


  handleSubmit(){
      let self = this;
      var userData = null;
      var randLogin = Math.random();
      var logged = false;
      var msg = null;

      axios.get("/api/login/login.php", {
        params: {
          email:this.state.email,
          p:this.state.password
        }
      })
      .then(function (response) {
          if(response.data.status){
              logged = true;
              var userData = response.data;
              self.setState({logged, userData});
              self.state.afterLogin(userData);
          }
          else{
              msg = response.data;
              self.setState({logged, msg});
          }
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <Grid container columns={1} stackable className="padd fullscreen">
          <Grid.Column key={1} verticalAlign="middle">
            <Card centered >
            <Card.Header key={1} className="padd gradient">
                <Header as="h1" textAlign="center">
                  Dormitory
                  </Header>
                <Image src='../assets/img/logo_pg.png' size='massive' ></Image>
              </Card.Header>
              <Card.Content key={2}>
                <Card.Header as="h1">
                  Sing In
                </Card.Header>
                <Card.Description>
                  <Form size="large"  onSubmit={this.handleSubmit}>
                    <Form.Input name="email" fluid label='Email' placeholder='xxx@gmail.com' onChange={this.handleChange} />
                    <Form.Input name="password" label='Password' type='password' placeholder='*******' onChange={this.handleChange} />
                    <Form.Button floated="right">Sing In</Form.Button>
                  </Form>
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
      </Grid>
    );
  }
}

export default Login;
