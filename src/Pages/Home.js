import React from 'react';
import { Card, Icon, Button } from 'semantic-ui-react';
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
    url = "http://localhost:3000/news";

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
      cardsElements;
    }

    return (
      <div className='padd'>
        <Card.Group itemsPerRow={3}>
          {this.state.news.map((element, index)=>{
            return (
              <Card key={element.id}>
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
              </Card>);
          })}
        </Card.Group>
      </div>
    );
  }
}

export default Home;
