import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Title, Text, Card, CardItem, Right, Left, Body } from 'native-base';

export default class VisitCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: this.props.title,
      date: this.props.date,
      status: this.props.status,
      navigation: this.props.navigation,
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
    fontWeight: 'bold',
  },
});
