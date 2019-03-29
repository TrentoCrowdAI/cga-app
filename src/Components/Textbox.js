import React, { Component } from 'react';
import { Container, Input } from 'native-base';

export default class Textbox extends Component {
  render() {
    return (
      <Container>
        <Input placeholder={this.props.label} />
      </Container>
    );
  }
}
