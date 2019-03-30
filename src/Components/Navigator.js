import React, { Component } from 'react';
import { Container, Input, Button, Text, Left, Right } from 'native-base';

export default class Navigator extends Component {
  render() {
    return (
      <Container style={{flexDirection: 'row'}}>
        <Left>
          <Button primary onPress={() => this.props.prev()}><Text>Previous</Text></Button>
        </Left>
        <Right>
          <Button primary  onPress={() => this.props.next()}><Text>  Next  </Text></Button>
        </Right>
      </Container>
    );
  }
}
