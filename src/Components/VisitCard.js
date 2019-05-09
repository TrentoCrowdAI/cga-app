import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Title, Text, Button, Card, CardItem, Right, Left, Body, Form, Content, Item } from 'native-base';

export default class VisitCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: this.props.title,
      date: this.props.date,
      status: this.props.status,
    };
  }

  render() {
    return (
      <Card>
        <CardItem header>
          <Body style={{ flex: 1,  justifyContent: 'center'}}>
            <Title><Text style={styles.titleText}>{this.state.title}</Text></Title>
          </Body>
        </CardItem>
        <CardItem>
          <Left><Text>{this.state.date}</Text></Left><Right><Text>{this.state.status}</Text></Right>
        </CardItem>
        <CardItem footer />
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  titleText:{
    fontSize: 20,
  },
});
