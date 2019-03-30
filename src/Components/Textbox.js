import React, { Component } from 'react';
import {Container, Input, Title } from 'native-base';

export default class Textbox extends Component {
  render() {
    return (
      <Container style={{flexDirection:"column"}}>
        <Input style={{flex:1}} placeholder={this.props.label} />
      </Container>
    );
  }
}
