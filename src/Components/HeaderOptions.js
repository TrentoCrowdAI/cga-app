import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Title } from 'native-base';
import SideMenu from "./SideMenu.js";

export default class HeaderOptions extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Left />
          <Body style={{flex: 3}}>
            <Title>{this.props.title}</Title>
          </Body>
          <Right>
            <SideMenu />
          </Right>
        </Header>
      </Container>
    );
  }
}
