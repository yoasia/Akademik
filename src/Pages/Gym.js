import React from 'react';
import {  Grid } from 'semantic-ui-react';

//My components
import BookingComponent from '../components/BookingComponent';

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
          <BookingComponent user={this.state.user} tablename={"gym"} params={{ds_number:this.state.user.ds, id_user:this.state.user.id}}></BookingComponent>
        </Grid>
      );
    else
      return null;
  }
}

export default Gym;
