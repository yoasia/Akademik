import React from 'react';
import axios from 'axios';
import {  Segment, List, Grid, Button, Header, Icon  } from 'semantic-ui-react';

class Report extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        user:props.user,
        downloaded:false,
        user_reports:[]
     };
     this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData(){
      let self = this;
      var downloaded = false;
      var user_reports = null;
      var hours = null;
    
      axios.get("http://localhost:3000/defects", {
        // params: params
        params: {}
      })
      .then(function (response) {
        downloaded = true;
          if(response.data){
            user_reports = response.data;
              self.setState({downloaded, user_reports});
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
    if(this.state.downloaded)
        return (
        <Grid padded className="padd" textAlign="center"> 
            <Grid.Row key={1}>
                <Header>Your reports</Header>
            </Grid.Row>
            <Grid.Row key={2}>
                <Button basic icon > <Icon color="green" name='plus' />New Report</Button>
            </Grid.Row>
            <Grid.Row key={3}>
                <List divided verticalAlign='middle'>
                {this.state.user_reports.map((element, index)=>{
                    var status = element.status;
                    var iconListElement = null;
                    if(status == "done")
                        iconListElement = (
                            <List.Icon name='checkmark' color="green" size='large' verticalAlign='middle' />
                        )
                    else if(status == "in queue"){
                        iconListElement = (
                            <List.Icon name='hourglass half' color="blue" size='large' verticalAlign='middle' />
                        )
                    }

                    return (
                        <List.Item>
                            <List.Content key={2} floated='right'>
                                <Button basic color="red" icon > <Icon color green name='close' /></Button>
                            </List.Content>
                            {iconListElement}
                            <List.Content key={1}>
                                <List.Header as='a'>{element.title}</List.Header>
                                <List.Description as='a'>{element.date}</List.Description>
                            </List.Content>
                        </List.Item>
                    )
                })}
                </List>
            </Grid.Row>
            
        </Grid>
      );
    else
        return null;
  }

}

export default Report;
