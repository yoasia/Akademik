import React from 'react';
import { Card, Icon, Button, Grid, Loader, Dimmer, Header, Dropdown, Modal, Menu, Form } from 'semantic-ui-react';
import axios from 'axios';

const options = [
  { key: 'edit', icon: 'edit', text: 'Edit Post', value: 'edit' },
  { key: 'delete', icon: 'delete', text: 'Remove Post', value: 'delete' }
]

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      someKey: 'Home',
      downloaded:false,
      news:[],
      user:props.user,
      modalOpen:false,
      newPost:false,
      currentPost:{
        title:null,
        description:null
      }
    };

    this.editPost = this.openEditModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openEditModal = this.openEditModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getData = this.getData.bind(this);
    this.openNewModal = this.openNewModal.bind(this);
    this.newPost = this.newPost.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }

  handleChange(e, { name, value }) {
    var currentPost = Object.assign({},this.state.currentPost);
    currentPost[name] = value;
    this.setState({ currentPost })
  }

  handleSubmit(event, data) {
      let self = this;
      
      if(data.name == "new")
          this.newPost();
      else if(data.name == "update")
          this.update();
      
  }

  componentWillMount(){
    this.getData();
  }

  newPost(){
    let self = this;
    var title = this.state.currentPost.title;
    var content = this.state.currentPost.content;
    var params = new URLSearchParams();
    params.append('title', title);
    params.append('content', content);

    axios.post("/api/notifications/add_notification.php", params
    )
    .then(function (response) {
        if(response.data.status){
            self.getData();
        }
        else{
            console.log("Something went wrong. Could not publicate new post.")
        }

        self.closeModal()
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
}

  getData(){
    let self = this;
    var url = null;
    var downloaded = null;
    var news = null;
    var randLogin = Math.random();
    url = "/api/notifications/get_notifications.php";

    axios.get(url)
    .then(function (response) {
        downloaded = true;
        if(response.data.length > 0){
            news = response.data;
            self.setState({downloaded, news});
        }
        else{
            self.setState({downloaded, news});
        }
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  openEditModal(event, data){
    var currentPost = this.state.news[data.index];
    this.setState({modalOpen:true, currentPost});
  }
  closeModal(){
    this.setState({
      modalOpen:false, 
      newPost:false, 
      currentPost:{
        title:null,
        description:null
      }
    });
  }

  update(){
    let self = this;
    var id = this.state.currentPost.id_notification;
    var title = this.state.currentPost.title;
    var content = this.state.currentPost.content;
    
    var params = new URLSearchParams();
    params.append('id', id);
    params.append('title', title);
    params.append('content', content);

    axios.post("/api/notifications/update_notifications.php", params
    )
    .then(function (response) {
        if(response.data.status){
          self.getData();
        }

        self.closeModal()
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
}

  openNewModal(event, data){
    this.setState({ 
        open: true, 
        newPost:true        
    });
  }

  deletePost(event, data){
    let self = this;
    var id_notification = data.id_notification;

    var params = new URLSearchParams();
    params.append('id', id_notification);

    axios.post("/api/notifications/remove_notification.php", params
    )
    .then(function (response) {
        if(response.data.status){
            self.getData();
        }
        else{
            console.log("Something went wrong. Could not add new report.")
        }
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
}


  render() {
    let self = this;
    var cardsElements = null;
    var modalElement = null;

    if(this.state.modalOpen){
      modalElement = (
        <Modal dimmer="blurring" 
            open={true} 
            onClose={this.closeModal}
            size="small"
            >
                <Modal.Header>Edit post</Modal.Header>
                <Modal.Content>
                    <Form name="update" onSubmit={self.handleSubmit}>
                        <Form.Input fluid label='Title' placeholder='title' 
                        value={self.state.currentPost.title} 
                        onChange={self.handleChange}
                        name="title"/>
                        <Form.TextArea label='Content' placeholder='Tell us more...' 
                        value={self.state.currentPost.content} 
                        onChange={self.handleChange}
                        name="content"/>
                        <Form.Button>Submit</Form.Button>
                    </Form>
                </Modal.Content>
        </Modal>
      );
    }
    else if(this.state.open && this.state.newPost){
      modalElement = (
          <Modal dimmer="blurring" 
              open={true} 
              onClose={this.closeModal}
              size="small"
              >
                  <Modal.Header>New post</Modal.Header>
                  <Modal.Content>
                      <Form name="new" onSubmit={self.handleSubmit}>
                          <Form.Input fluid label='Title' placeholder='title' 
                          value={self.state.currentPost.title} 
                          onChange={self.handleChange}
                          name="title"/>
                          <Form.TextArea label='Content' placeholder='...' 
                          value={self.state.currentPost.description} 
                          onChange={self.handleChange}
                          name="content"/>
                          <Form.Button>Submit</Form.Button>
                      </Form>
                  </Modal.Content>
          </Modal>
      );
  }

    if(this.state.downloaded && this.state.news){
      return (
        <Grid container columns={1} stackable className="padd">
          <Grid.Row key={0}>
              <Grid.Column floated='left' verticalAlign="middle" mobile={10} tablet={4} computer={2}  key={1}>
                <Header as='h1'>News</Header>
              </Grid.Column>
              <Grid.Column floated='right' mobile={2} tablet={2} computer={1} key={2} relaxed="very" >
                  <Button color="green"  icon onClick={this.openNewModal} > 
                      <Icon  name='plus' />
                  </Button>
              </Grid.Column>
          </Grid.Row>
          {this.state.news.map((element, index)=>{
            var editElement = null;
            if(element.id_user == self.state.user.id){
              editElement = (
                <Menu floated="right">
                  <Dropdown item icon='bars' simple>
                    <Dropdown.Menu>
                      <Dropdown.Item index={index} onClick={this.openEditModal}>Edit post</Dropdown.Item>
                      <Dropdown.Item id_notification={element.id_notification} onClick={this.deletePost}>Delete post</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  </Menu>
              );
            }

            return (
              <Grid.Row key={element.id_notification}>
                {modalElement}
                <Card  fluid>
                  <Card.Content>
                      {editElement}
                    <Card.Header>
                      {element.title}
                    </Card.Header>
                    <Card.Meta>
                      {element.date}{'  '}{element.time}
                      <br/>
                        <Icon name='user' />
                        {element.nickname}
                    </Card.Meta>
                  </Card.Content>
                  <Card.Content>
                    {element.content}
                  </Card.Content>
                </Card>
              </Grid.Row>);
          })}
      </Grid>
    );
  }
  else if (this.state.downloaded){
    return (
      <Grid container columns={1} stackable className="padd">
         <Header>There is no notifications.</Header>
      </Grid>
    );
  }
  else{
    return (
      <Grid container columns={1} stackable className="padd">
         <Dimmer inverted active>
            <Loader inverted size='big'>Loading</Loader> 
         </Dimmer>
      </Grid>
    );
  }
  }
}

export default Home;
