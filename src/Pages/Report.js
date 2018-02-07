import React from 'react';
import axios from 'axios';
import {  Segment, List, Grid, Button, Header, Icon, Image, Form, Modal } from 'semantic-ui-react';

class Report extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        user:props.user,
        downloaded:false,
        user_reports:[],
        open:false,
        currentReportIndex:null,
        currentReport:{
            title:null,
            description:null
        }
     };
     this.getData = this.getData.bind(this);
     this.editReport = this.editReport.bind(this);
     this.removeReport = this.removeReport.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
     this.close = this.close.bind(this);
     this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, { name, value }) {
      var currentReport = this.state.currentReport;
      currentReport[name] = value;
      this.setState({ currentReport })
    }
  handleSubmit() {
    let self = this;
    var sended = false;
    var id = this.state.user_reports[this.state.currentReportIndex].id_defect;
    var title = this.state.currentReport.title;
    var description = this.state.currentReport.description;
    
    var params = new URLSearchParams();
    params.append('id', id);
    params.append('title', title);
    params.append('description', description);

    axios.post("/api/defects/update_defects.php", params
    )
    .then(function (response) {
        if(response.data.status){
            var user_reports = self.state.user_reports;
            user_reports[self.state.currentReportIndex].title = title;
            user_reports[self.state.currentReportIndex].description = description;
            self.setState({user_reports});
        }

        self.close()
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  close (){
      this.setState({ 
          open: false, 
          currentReportIndex:null, 
          currentReport:{
            title:null,
            description:null
        } })
  } 

  componentDidMount() {
    this.getData();
  }

  editReport(event, data){
    this.setState({ 
        open: true, 
        currentReportIndex:data.index, 
        currentReport: Object.assign({}, this.state.user_reports[data.index] )
    });
  }

  removeReport(){

  }

  getData(){
      let self = this;
      var downloaded = false;
      var user_reports = null;
      var hours = null;
    
      axios.get("/api/defects/get_defects.php", {
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
    let self = this;

    if(this.state.downloaded)
        return (
        <Grid padded className="padd" textAlign="center"> 
            <Grid.Row key={1}>
                <Image src='../../assets/img/c4.png' size='small' wrapped />
            </Grid.Row>
            <Grid.Row key={2}>
                <Header>Your reports</Header>
            </Grid.Row>
            <Grid.Row key={3}>
                <Button basic icon > <Icon color="green" name='plus' />New Report</Button>
            </Grid.Row>
            <Grid.Row key={4}>
                <List divided verticalAlign='middle'>
                {this.state.user_reports.map((element, index)=>{
                    var status = element.is_done;
                    var iconListElement = null;
                    var editButtonElement = null;
                    var modalOpened = (self.state.open && (index == self.state.currentReportIndex));
                    if(status == "0"){
                        iconListElement = (
                            <List.Icon 
                            name='hourglass half' 
                            color="blue" 
                            size='large' 
                            verticalAlign='middle' 
                            />
                        );
                        editButtonElement = (
                            <Button 
                            basic 
                            icon 
                            color="blue" 
                            onClick={this.editReport} 
                            index={index}
                            > 
                                <Icon color green name='edit' />
                            </Button>
                        );

                    }
                    else{
                        iconListElement = (
                            <List.Icon 
                            name='checkmark' 
                            color="green" 
                            size='large' 
                            verticalAlign='middle' />
                        )
                    }
                    

                    return (
                        <List.Item>
                            <List.Content key={2} floated='right' >
                                {editButtonElement}
                                <Button basic color="red" icon > 
                                    <Icon color green name='close' />
                                </Button>
                            </List.Content>
                            {iconListElement}
                            <List.Content key={1}>
                                <List.Header as='a'>{element.title}</List.Header>
                                <List.Description as='a'>{element.date}</List.Description>
                            </List.Content>
                            <Modal dimmer="blurring" 
                            open={modalOpened} 
                            onClose={this.close}
                            size="small"
                            >
                                <Modal.Header>Edit defect report</Modal.Header>
                                <Modal.Content>
                                    <Form onSubmit={self.handleSubmit}>
                                        <Form.Input fluid label='Title' placeholder='title' 
                                        value={self.state.currentReport.title} 
                                        onChange={this.handleChange}
                                        name="title"/>
                                        <Form.TextArea label='Description' placeholder='Tell us more...' 
                                        value={self.state.currentReport.description} 
                                        onChange={this.handleChange}
                                        name="description"/>
                                        <Form.Button>Submit</Form.Button>
                                    </Form>
                                </Modal.Content>
                            </Modal>
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
