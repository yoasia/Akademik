import React from 'react';
import { Card, Icon, Button, Segment, Grid, Header, Menu, Label, Image } from 'semantic-ui-react';
import axios from 'axios';
import GridColumn from 'semantic-ui-react/dist/commonjs/collections/Grid/GridColumn';

//My components
import BookingComponent from '../components/BookingComponent'

class Laundry extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      downloaded_floors:false,
      user_floor:null,
      floorSelectOptions:null,
      user:props.user,
      activeItem:(props.user)? props.user.floor: null
    };

    this.getFloors = this.getFloors.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.user)
      this.setState({user:nextProps.user, activeItem:nextProps.user.floor});
  }

  componentWillUpdate(nextProps, nextState){
    if(nextProps.user && !this.state.user){
      this.getFloors(nextProps.user.ds);
    }
  }
  componentDidMount(){
    if(this.state.user){
      this.getFloors(this.state.user.ds);
    }
  }

  getFloors(ds){
    let self = this;
    var downloaded_floors = false;
    var user_floor = null;
    var floors = null;
    var floorSelectOptions = null;

    axios.get("\api\dorm_info.php")
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
  

  handleChange = (e, { name, value }) => this.setState({ [name]: value })
  handleItemClick = (e, { value }) => this.setState({ activeItem: value })


  render() {
    let self = this;
    let dropDownElement = null;
    const { activeItem } = this.state;
    if(this.state.downloaded_floors){
      dropDownElement = (
        <Menu  size='massive'  >
          {self.state.floorSelectOptions.map((element, index)=>{
            return <Menu.Item key={index} value={element.value} name={"Floor" + element.value} active={activeItem === element.value} onClick={this.handleItemClick} basic color="purple"/>
          })
          }
        </Menu>
      )
    }
    if(this.state.user)
      return (
        <Grid padded className="padd" textAlign="center"> 
          <Grid.Row key={1}>
            <Image src='../../assets/img/c3.png' size='small' wrapped />
          </Grid.Row>
          <Grid.Row key={2}>
            <Header as="h1">Laundry Room schedule</Header>
          </Grid.Row>
          <Grid.Row key={3}>
            {dropDownElement}
          </Grid.Row>
          <BookingComponent 
          user={this.state.user} 
          tablename={"laundry"} 
          params={{
            floor:this.state.user.floor, 
            ds_number:this.state.user.ds, 
            id_user:this.state.user.id
            }
          }>
          </BookingComponent>
        </Grid>
      );
    else
      return null;
  }
}

export default Laundry;
