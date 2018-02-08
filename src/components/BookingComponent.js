import React from 'react';
import { Card, Icon, Button, Segment, Grid, Header, Menu, Label, Dimmer, Loader } from 'semantic-ui-react';
import axios from 'axios';


Date.prototype.today = function () { 
  return this.getFullYear() +"-"+
  (((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"-"+ 
  ((this.getDate() < 10)?"0":"") + this.getDate() 
}

function compareDate(a, b){
  var result = false;
  a = a.trim();
  b = b.trim();
  var array1 = a.split("-");
  var array2 = b.split("-");

  array1.forEach((element, index) => {
    if(parseInt(element) > parseInt(array2[index]))
      result = true;
  });

  return !result;
}
function compareTime(a, b){
  var result = false;
  a = a.trim();
  b = b.trim();
  var array1 = a.split(":");
  var array2 = b.split(":");
  var dontCheckNext = false;

  array2.forEach((element, index) => {
    if(parseInt(element) > parseInt(array1[index]) && !dontCheckNext)
      result = true;
    else if(parseInt(element) < parseInt(array1[index])) {
      dontCheckNext = true;
    }
  });

  return result;
}

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
    this.update = this.update.bind(this);
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

  update(event, data){
    
      if(!this.state.user || !this.state.params.tablename ){
        console.log("User or tablename not set. Could not update Booking Component");
        return;
      }

      let self = this;
      var downloaded = false;
      var id = data.idRecord;
      var tablename = this.state.params.tablename;
      var action = data.action;

      var params = new URLSearchParams();
      params.append('id', id);
      params.append('tablename', tablename);
      params.append('action', action);

      axios.post("/api/booking/update.php", params)
      .then(function (response) {
          downloaded = true;

          if(response.data){
              //success
          }
          
          self.getData(self.state.tablename, self.state.params);
          console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getData(tablename, params){

    if(!this.state.user || !tablename ){
      console.log("User or tablename not set. Could not update Booking Component");
      return;
    }

    let self = this;
    var downloaded = false;
    var data = null;
    var hours = null;
    
    axios.get("/api/booking/get.php", {
      params: params
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
    if(this.state.data.length != 0 && this.state.data && this.state.downloaded)
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

                      var timePassed = false;
                      var currentDay = new Date();
                      var currentTime = currentDay.getHours() + ":"  
                      + currentDay.getMinutes() + ":" 
                      + currentDay.getSeconds();
                      currentDay = currentDay.today();

                      timePassed = (compareDate(day.date, currentDay) && 
                        compareTime(self.state.data.hours[index], currentTime));

                      let canBook = (!hours.user_id);
                      let itsUserReservation = (hours.user_id == self.state.user.id)
                      let canCancel = itsUserReservation;

                      if(canBook){
                        buttonElement = (
                          <Button basic idRecord={hours.id} action="book" size='mini' color='green' onClick={self.update}>Book</Button>
                        )
                      }
                      else if(canCancel){
                        buttonElement = (
                          <Button basic idRecord={hours.id} action="cancel" size='mini' color='red' onClick={self.update} >Cancel</Button>
                        )
                      }

                      if (timePassed){
                        if(itsUserReservation)
                          buttonElement = (
                            <span>{hours.user_room}</span>
                          )
                        else{
                          let text = (hours.user_room) ? "" : "-";
                          buttonElement = (
                            <span>{text}</span>
                          )
                        }
                      }

                      if(!itsUserReservation)
                        return (
                            <Segment key={index} textAlign="center" className="flex const-height">
                              <div className="flex-grow">
                                {self.state.data.hours[index]}
                              </div>
                              <div className="flex-grow">
                                {hours.user_room}
                                {buttonElement}
                              </div>

                            </Segment>
                          )
                      else
                      return (
                          <Segment inverted tertiary key={index} color="purple" textAlign="center" className="flex const-height" >
                            <div className="flex-grow">
                              {self.state.data.hours[index]}
                            </div>
                            <div  className="flex-grow">
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
    else if(this.state.downloaded){
      return (
      <div ref={this.handleContextRef}>
          <Segment className="no-padd">
            <Dimmer inverted active>
              <Loader inverted size='big'>Loading</Loader> 
            </Dimmer>
          </Segment>
      </div>)
    }
    else
      return null;
  }
}

export default BookingComponent;
