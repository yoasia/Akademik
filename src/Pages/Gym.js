import React from 'react';
import {  Grid, Image } from 'semantic-ui-react';

//My components
import BookingComponent from '../components/BookingComponent';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header/Header';

class Gym extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      user: props.user
    };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.user)
      this.setState({user:nextProps.user});
  }

  render() {
     
    if(this.state.user)
      return (
        <Grid padded className="padd" textAlign="center"> 
          <Grid.Row key={1}>
            <Image src='../../assets/img/c1.png' size='small' wrapped />
          </Grid.Row>
          <Grid.Row key={2}>
            <Header as="h1">Gym schedule</Header>
          </Grid.Row>
          <BookingComponent user={this.state.user} tablename={"gym"} params={{floor:this.state.user.floor}}></BookingComponent>
        </Grid>
      );
    else
      return null;
  }
}

export default Gym;
