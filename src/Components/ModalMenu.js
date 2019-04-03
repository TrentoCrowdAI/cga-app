import React, { Component } from 'react';
import { Container, Button, Text } from 'native-base';

export default class ModalMenu extends Component {
  constructor(props){
    super(props);
  }

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      title: navigation.getParam('Title', 'Options'),
      //Default Title of ActionBar
      headerStyle: {
        backgroundColor: navigation.getParam('BackgroundColor', '#EF233C'),
        //Background color of ActionBar
      },
      headerTintColor: navigation.getParam('HeaderTintColor', '#fff'),
    };
  };

  skipQuestion = () => {
    this.props.navigation.goBack();
    this.props.navigation.navigate("SkipQuestion");
  }

  handoverMode = () => {
    this.props.navigation.goBack();
    this.props.navigation.navigate("HandoverMode", {indexQuestion: this.props.navigation.state.params.indexQuestion, questionObj: this.props.navigation.state.params.questionObj, savedData: this.props.navigation.state.params.savedData});
  }

  endSession = () => {
    this.props.navigation.goBack();
    this.props.navigation.navigate("StopSession");
  }

  showGuide = () => {
    this.props.navigation.goBack();
    this.props.navigation.navigate("Guide");
  }

  render() {
    return (
      <Container>
        <Button block primary onPress={() => this.skipQuestion()}><Text>Skip Question</Text></Button>
        <Button block primary onPress={() => this.handoverMode()}><Text>Handover mode</Text></Button>
        <Button block primary onPress={() => this.endSession()}><Text>Stop Session</Text></Button>
        <Button block primary onPress={() => this.showGuide()}><Text>Show Guide</Text></Button>
      </Container>
    );
  }
}
