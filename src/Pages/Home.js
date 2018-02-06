import React from 'react';
import { Card, Icon, Button, Grid, Loader, Dimmer } from 'semantic-ui-react';
import axios from 'axios';

class Home extends React.Component {
  constructor() {
    super();
    this.state = { 
      someKey: 'Home',
      downloaded:false,
      news:[]
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
    if(this.state.downloaded){
      return (
        <Grid container columns={1} stackable className="padd">
          {this.state.news.map((element, index)=>{
            return (
              <Grid.Column key={element.id}>
                <Card  fluid>
                  <Card.Content>
                    <Card.Header>
                      {element.title}
                    </Card.Header>
                    <Card.Meta>
                      {element.data}
                      <div className='float-right'>
                        <Icon name='user' />
                        {element.username}
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
