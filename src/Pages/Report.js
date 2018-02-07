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
            newReport:false,
            currentReportIndex:null,
            currentReport:{
                title:null,
                description:null
            }
        };
        this.getData = this.getData.bind(this);
        this.openEditModal = this.openEditModal.bind(this);
        this.openNewModal = this.openNewModal.bind(this);
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
    handleSubmit(event, data) {
        let self = this;
        
        if(data.name == "new")
            this.addReport();
        else if(data.name == "update")
            this.update();
        
    }

    addReport(){
        let self = this;
        var title = this.state.currentReport.title;
        var description = this.state.currentReport.description;
        var params = new URLSearchParams();
        params.append('title', title);
        params.append('description', description);

        axios.post("/api/defects/add_defects.php", params
        )
        .then(function (response) {
            if(response.data.status){
                self.getData();
            }
            else{
                console.log("Something went wrong. Could not add new report.")
            }

            self.close()
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    removeReport(event, data){
        let self = this;
        var id_defect = data.id_defect;
    
        var params = new URLSearchParams();
        params.append('id', id_defect);

        axios.post("/api/defects/remove_defects.php", params
        )
        .then(function (response) {
            if(response.data.status){
                self.getData();
            }
            else{
                console.log("Something went wrong. Could not add new report.")
            }

            self.close()
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    update(){
        let self = this;
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
            },
            newReport:false })
    } 

    componentDidMount() {
        this.getData();
    }

    openEditModal(event, data){
        this.setState({ 
            open: true, 
            currentReportIndex:data.index, 
            currentReport: Object.assign({}, this.state.user_reports[data.index] )
        });
    }

    openNewModal(event, data){
        this.setState({ 
            open: true, 
            newReport:true        
        });
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
        var modalElement = null;
        var modalOpened = (self.state.open && self.state.currentReportIndex != null);
        modalOpened = (modalOpened || (self.state.open &&  self.state.newReport));
        
        if(this.state.open && this.state.currentReportIndex){
            modalElement = (
                <Modal dimmer="blurring" 
                    open={modalOpened} 
                    onClose={this.close}
                    size="small"
                    >
                        <Modal.Header>Edit defect report</Modal.Header>
                        <Modal.Content>
                            <Form name="update" onSubmit={self.handleSubmit}>
                                <Form.Input fluid label='Title' placeholder='title' 
                                value={self.state.currentReport.title} 
                                onChange={self.handleChange}
                                name="title"/>
                                <Form.TextArea label='Description' placeholder='Tell us more...' 
                                value={self.state.currentReport.description} 
                                onChange={self.handleChange}
                                name="description"/>
                                <Form.Button>Submit</Form.Button>
                            </Form>
                        </Modal.Content>
                </Modal>
            );
        }
        else if(this.state.open && this.state.newReport){
            modalElement = (
                <Modal dimmer="blurring" 
                    open={modalOpened} 
                    onClose={this.close}
                    size="small"
                    >
                        <Modal.Header>New defect report</Modal.Header>
                        <Modal.Content>
                            <Form name="new" onSubmit={self.handleSubmit}>
                                <Form.Input fluid label='Title' placeholder='title' 
                                value={self.state.currentReport.title} 
                                onChange={self.handleChange}
                                name="title"/>
                                <Form.TextArea label='Description' placeholder='Tell us more...' 
                                value={self.state.currentReport.description} 
                                onChange={self.handleChange}
                                name="description"/>
                                <Form.Button>Submit</Form.Button>
                            </Form>
                        </Modal.Content>
                </Modal>
            );
        }

        if(this.state.downloaded)
        return (
            <Grid padded="horizontally" className="padd" textAlign="center"> 
                {modalElement}
                <Grid.Row key={1}>
                    <Image src='../../assets/img/c4.png' size='small' wrapped />
                </Grid.Row>
                <Grid.Row key={2}>
                    <Grid.Column verticalAlign="middle" mobile={13} tablet={4} computer={2}  key={1}>
                        <Header>
                            Your reports 
                        </Header>
                    </Grid.Column>
                    <Grid.Column verticalAlign="middle" mobile={3} tablet={2} computer={1} key={2}>
                        <Button icon onClick={this.openNewModal}> 
                            <Icon color="green" name='plus' />
                            New
                        </Button>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row key={4}>
                    <List divided verticalAlign='middle'>
                    {this.state.user_reports.map((element, index)=>{
                        var status = element.is_done;
                        var iconListElement = null;
                        var editButtonElement = null;
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
                                onClick={this.openEditModal} 
                                index={index}
                                > 
                                    <Icon color="blue" name='edit' />
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
                            <List.Item key={index}>
                                <List.Content key={2} floated='right' >
                                    {editButtonElement}
                                    <Button id_defect={element.id_defect} basic color="red" icon onClick={self.removeReport}> 
                                        <Icon name='close' />
                                    </Button>
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
