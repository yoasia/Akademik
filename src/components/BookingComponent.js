import React from 'react';
import { Card, Icon, Button, Segment, Grid, Header, Menu, Label } from 'semantic-ui-react';
import axios from 'axios';

class BookingComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user:props.user,
      tablename:props.tablename,
      params:props.params,
      downloaded:false,
      data:[],
    };

    this.getData = this.getData.bind(this);
  }
  
  componentDidMount() {
    if(this.state.user)
      this.getData(this.state.tablename, this.state.params);
  }

  componentWillUpdate(nextProps, nextState) {
    if(nextProps.tablename != this.state.tablename || nextProps.params != this.state.params)
      this.getData(nextProps.tablename, nextProps.params);
  }

  componentWillReceiveProps(nextProps) {
      this.setState({
        user:nextProps.user, 
        tablename:nextProps.tablename,
        params:nextProps.params
      });
  }

  book(){}
  cancel(){}
  refresh(){}

  getData(tablename, params){

    if(!this.state.user || !tablename ){
      console.log("User or tablename not set. Could not update Booking Component");
      return;
    }

    let self = this;
    var downloaded = false;
    var data = null;
    var hours = null;
  
    axios.get("http://localhost:3000/"+tablename, {
      // params: params
      params: {}
    })
    .then(function (response) {
      downloaded = true;
        if(response.data){
            data = response.data;
            self.setState({downloaded, data});
        }
        else{
            self.setState({downloaded});
        }
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    let self = this;
    if(this.state.data.length != 0 && this.state.data)
      return (
        <Grid.Row key={1}>
          {this.state.data.days.map((day, index)=>{
            return (
              <Grid.Column key={index} computer={2} tablet={5} mobile={16}>
                <Card>
                  <Card.Content key={1}>
                    <Card.Header className="upper-case">
                      {day.name}
                    </Card.Header>
                    <Card.Meta>
                      {day.date}
                    </Card.Meta>
                  </Card.Content>
                  <Card.Content key={2}>
                    <Segment.Group >
                    {day.hours.map((hours, index)=>{
                      var buttonElement = null;
                      let canBook = (!hours.user_id);
                      let itsUserReservation = (hours.user_id == self.state.user.id)
                      let canCancel = itsUserReservation;

                      if(canBook){
                        buttonElement = (
                          <Button basic className="margin-left" size='mini' color='green'>Book</Button>
                        )
                      }
                      else if(canCancel){
                        buttonElement = (
                          <Button basic size='mini' color='red' >Cancel</Button>
                        )
                      }

                      if(!itsUserReservation)
                        return (
                            <Segment key={index} textAlign="center" className="flex">
                              <div className="flex-grow">
                                {self.state.data.hours[index]}
                              </div>
                              <div className="margin-left flex-grow bigger-font">
                                {hours.user_room}
                                {buttonElement}
                              </div>

                            </Segment>
                          )
                      else
                      return (
                          <Segment  key={index} color="purple" textAlign="center" className="flex">
                            {self.state.data.hours[index]}
                            <div className="margin-left">
                              {buttonElement}
                            </div>
                          </Segment>)
                    })}
                    </Segment.Group>
                  </Card.Content>
                </Card>
              </Grid.Column>
              );
          })}
        </Grid.Row>
      );
    else
      return null;
  }
}

export default BookingComponent;
