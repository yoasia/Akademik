import React from 'react';
import { Card, Icon, Button, Grid, Loader, Dimmer, Header } from 'semantic-ui-react';
import axios from 'axios';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      someKey: 'Home',
      downloaded:false,
      news:[],
      user:props.user
    };
  }

  componentWillMount(){
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


  render() {

    var cardsElements = null;
    if(this.state.downloaded && this.state.news){
      return (
        <Grid container columns={1} stackable className="padd">
        <Grid.Column key={0}>
          <Header as='h1'>News</Header>
        </Grid.Column>
          {this.state.news.map((element, index)=>{
            return (
              <Grid.Column key={element.id_notification}>
                <Card  fluid>
                  <Card.Content>
                    <Card.Header>
                      {element.title}
                    </Card.Header>
                    <Card.Meta>
                      {element.date}
                      <div className='float-right'>
                        <Icon name='user' />
                        {element.nickname}
                      </div>
                    </Card.Meta>
                  </Card.Content>
                  <Card.Content extra>
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
