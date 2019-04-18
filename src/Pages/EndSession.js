import React, {Component} from 'react';
import {Container, Title, Text } from 'native-base';

export default class EndSession extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savedData: props.navigation.state.params.savedData,
    };
  }

  static navigationOptions = ({ navigation }) => { //this function prepare the header of the activity
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
    console.log(this.state.savedData);
    return (
      <Container style={{flex: 1, flexDirection: "column"}}>
        <Container style={{flex: 1}}>
          <Title><Text>The session is ended!</Text></Title>
        </Container>
      </Container>
    );
  }
}
