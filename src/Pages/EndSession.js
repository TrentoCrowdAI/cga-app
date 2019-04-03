import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Container, Title, Text, Button} from 'native-base';

export default class EndSession extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "End Session",
      //Default Title of ActionBar
      headerStyle: {
        backgroundColor: navigation.getParam('BackgroundColor', '#EF233C'),
        //Background color of ActionBar
      },
      headerTintColor: navigation.getParam('HeaderTintColor', '#fff'),
      //Text color of ActionBar
    };
  };

  render() {
    return (
      <Container style={{flex: 1, flexDirection: "column"}}>
        <Container style={{flex: 1}}>
          <Title><Text>The session is ended!</Text></Title>
        </Container>
      </Container>
    );
  }
}
