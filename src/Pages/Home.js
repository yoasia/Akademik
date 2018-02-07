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
      currentPost:{
        title:null,
        description:null
      }
    };

    this.editPost = this.openEditModal.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openEditModal = this.openEditModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getData = this.getData.bind(this);
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
    this.setState({modalOpen:false});
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

  deletePost(event, data){

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

    if(this.state.downloaded && this.state.news){
      return (
        <Grid container columns={1} stackable className="padd">
        <Grid.Column key={0}>
          <Header as='h1'>News</Header>
        </Grid.Column>
          {this.state.news.map((element, index)=>{
            var editElement = null;
            if(element.id_user == self.state.user.id){
              editElement = (
                <Menu floated="right">
                  <Dropdown item icon='bars' simple>
                    <Dropdown.Menu>
                      <Dropdown.Item index={index} onClick={this.openEditModal}>Edit post</Dropdown.Item>
                      <Dropdown.Item id_post={element.id_notification} onClick={this.deletePost}>Delete post</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  </Menu>
              );
            }

            return (
              <Grid.Column key={element.id_notification}>
                {modalElement}
                <Card  fluid>
                  <Card.Content>
                      {editElement}
                    <Card.Header>
                      {element.title}
                    </Card.Header>
                    <Card.Meta>
                      {element.date}{'  '}{element.time}
                      <div className='float-right'>
                        <Icon name='user' />
                        {element.nickname}
                      </div>
                    </Card.Meta>
                  </Card.Content>
                  <Card.Content>
                    {element.content}
                  </Card.Content>
                </Card>
              </Grid.Column>);
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
