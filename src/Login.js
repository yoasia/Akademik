import React from 'react';
import axios from 'axios';
import { Card, Loader, Image, Segment, Dimmer, 
  Menu, Button, Icon, Grid, Form,  Header  } from 'semantic-ui-react';


class Login extends React.Component {
  constructor() {
    super();
    this.state = { 
      
     };
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
                  <Form size="large">
                    <Form.Input fluid label='Username' placeholder='username' />
                    <Form.Input label='Password' type='password' placeholder='*******' />
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
