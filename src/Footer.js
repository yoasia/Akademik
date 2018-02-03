import React from 'react';
import { Image, Menu, Icon, Label,  Header as SemanticHeader } from 'semantic-ui-react';

class Footer extends React.Component {
  constructor() {
    super();
    this.state = { someKey: 'Footer' };
  }

  render() {
    return (
      <SemanticHeader  attached='bottom' className="gradient padd ">
        <SemanticHeader.Content>
          {this.state.someKey}
        </SemanticHeader.Content>
      </SemanticHeader>
    );
  }

}

export default Footer;
