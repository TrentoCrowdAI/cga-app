import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Title, Text } from 'native-base';

export default class QuestionPlaceholder extends Component {
  constructor(props){
    super(props);
    this.state = {
      index: this.props.index,
      type: this.props.type
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <Title><Text>Question {this.state.index+1} placeholder</Text></Title>
        <Title><Text>{this.state.type}</Text></Title>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
});
