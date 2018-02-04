import React from 'react';
import { Card, Icon, Button, Segment, Grid, Header, Menu } from 'semantic-ui-react';
import axios from 'axios';
import GridColumn from 'semantic-ui-react/dist/commonjs/collections/Grid/GridColumn';

class Laundry extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      downloaded_laundry:null,
      downloaded_floors:null,
      user_floor:null,
      floorSelectOptions:null,
      hours:null,
      user:props.user,
      laundry_list:[]
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({user:nextProps.user})
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  componentWillMount(){
    let self = this;
    var url = null;
    var downloaded_laundry = null;
    var downloaded_floors = null;
    var laundry_list = null;
    var hours = null;
    var user_floor = null;
    var floors = null;
    var floorSelectOptions = null;
    var randLogin = Math.random();

    axios.get("http://localhost:3000/laundry")
    .then(function (response) {
      downloaded_laundry = true;
        if(response.data){
          laundry_list = response.data.days;
          hours = response.data.hours;
          user_floor = response.data.floor;
            self.setState({downloaded_laundry, laundry_list, hours, user_floor});
        }
        else{
            self.setState({downloaded_laundry});
        }
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    axios.get("http://localhost:3000/floors?ds=6")
    .then(function (response) {
      downloaded_floors = true;
        if(response.data){
            floors = response.data["0"].floors;
            floorSelectOptions = []
            floors.forEach((element, index)=>{
              floorSelectOptions.push({ key: element, text: 'Floor '+element, value: element });
            })
            self.setState({downloaded_floors, floorSelectOptions});
        }
        else{
            self.setState({downloaded_floors});
        }
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

  render() {
    let self = this;
    let dropDownElement = null;
    const { activeItem } = this.state;
    if(this.state.downloaded_floors){
      dropDownElement = (
        <Menu color="purple" secondary>
          {self.state.floorSelectOptions.map((element, index)=>{
            return <Menu.Item name={"Floor" + element.value} active={activeItem === 'home'} onClick={this.handleItemClick} basic />
          })
          }
        </Menu>
        )
    }
    return (
      <Grid padded className="padd" textAlign="center"> 
        <Grid.Row key={1}>
          {dropDownElement}
        </Grid.Row>
        <Grid.Row key={2}>
        {this.state.laundry_list.map((day, index)=>{
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
                {day.hours.map((hours, index)=>{
                  var buttonElement = null;
                  let canBook = (!hours.user_id);
                  if(canBook){
                    buttonElement = (
                      <Button basic size='mini' color='green'>Book</Button>
                    )
                  }
                  return (
                    <Segment.Group  key={index}>
                      <Segment textAlign="center">
                        {self.state.hours[index]}
                      </Segment>
                      <Segment  textAlign="center">
                        {hours.user_room}
                        {buttonElement}
                      </Segment>
                    </Segment.Group>)
                })}
                
                </Card.Content>
              </Card>
            </Grid.Column>
            );
        })}
        </Grid.Row>
      </Grid>
      );
  }


}

export default Laundry;
