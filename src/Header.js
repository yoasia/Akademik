import React from 'react';
import { Image, Menu, Icon, Label,  Header as SemanticHeader } from 'semantic-ui-react';
import {  Link } from 'react-router-dom';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      logged: (props.username) ? true:false,
      username: props.username
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({logged: (nextProps.username) ? true:false, username: nextProps.username})
  }

  render() {
    return (
      <div className="">
        <SemanticHeader as='h1' className="gradient padd ">
          <Image src='../assets/img/ds.png' size='massive' circular></Image>
          <SemanticHeader.Content>
            Dom Studencki
          </SemanticHeader.Content>
        </SemanticHeader>
        <Menu size='massive' pointing secondary>
            <Menu.Item name='home' as={Link} to='/' />
            <Menu.Item name='gym' as={Link} to='gym' />
            <Menu.Item name='laundry' as={Link} to='laundry'  />
            <Menu.Item name='report defect' as={Link} to='report'  />
            <Menu.Menu position='right'>
                <Menu.Item name='logout' as={Link} to='logout'>
                  {this.state.username}
                    <Icon name='power' />
                </Menu.Item>
            </Menu.Menu>
        </Menu>
      </div>
    );
  }

}

export default Header;
