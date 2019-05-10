import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Title, Text, Button, Card, CardItem, Right, Left, Body, Form, Content, Item } from 'native-base';

export default class SubjectCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: this.props.name,
      surname: this.props.surname,
      status: this.props.status,
      date: this.props.date,
      place: this.props.place,
      navigation: this.props.navigation
    };
  }

  render() {
    return (
      <Card>
        <TouchableOpacity onPress={() => this.state.navigation.navigate("SubjectPage")}>
          <CardItem header>
            <Body style={{ flex: 1,  justifyContent: 'center'}}>
              <Title><Text style={styles.titleText}>{this.state.name}{" "}{this.state.surname}</Text></Title>
            </Body>
          </CardItem>
          <CardItem>
            <Left><Text>{this.state.date}</Text></Left><Right><Text>{this.state.status}</Text></Right>
          </CardItem>
          <CardItem>
            <Left><Text>{this.state.place}</Text></Left>
          </CardItem>
        </TouchableOpacity>
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
