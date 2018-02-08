import React from 'react';
import { Image, Menu, Icon, Label,  Header as SemanticHeader } from 'semantic-ui-react';

class Footer extends React.Component {
  constructor() {
    super();
    this.state = { 

     };
  }

  render() {
    return (
      <SemanticHeader  attached='bottom' className="gradient padd">
        <SemanticHeader.Content>
          Copyright © 2018 Authors: Karol Jurczenia, Evgen Belsky, Vlasislav Lysenko, Joanna Sienkiewicz
        </SemanticHeader.Content>
      </SemanticHeader>
    );
  }

}

export default Footer;
