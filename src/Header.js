import React from 'react';
import { Image, Menu, Icon, Label,  Header as SemanticHeader } from 'semantic-ui-react';
import {  Link } from 'react-router-dom';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      logged: (props.username) ? true:false,
      username: props.username,
      activeItem:'home',
      user:props.user
    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  componentWillMount() {

  }
  componentWillReceiveProps(nextProps) {
    this.setState({logged: (nextProps.username) ? true:false, username: nextProps.username})
  }

  render() {
    const { activeItem } = this.state
    return (
      <div className="">
        <SemanticHeader  as='h1' className="gradient padd ">
          <Image src='../assets/img/logo_pg.png' size='massive' ></Image>
          <SemanticHeader.Content>
            Dormitory {this.state.user.ds}
          </SemanticHeader.Content>
        </SemanticHeader>
        <Menu size='massive' pointing secondary>
            <Menu.Item name='home' as={Link} to='/' active={activeItem === 'home'} onClick={this.handleItemClick}/>
            <Menu.Item name='gym' as={Link} to='gym' active={activeItem === 'gym'} onClick={this.handleItemClick}/>
            <Menu.Item name='laundry' as={Link} to='laundry' active={activeItem === 'laundry'} onClick={this.handleItemClick} />
            <Menu.Item name='study room' as={Link} to='study-room' active={activeItem === 'study room'} onClick={this.handleItemClick} />
            <Menu.Item name='report defect' as={Link} to='report' active={activeItem === 'report defect'} onClick={this.handleItemClick} />
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
