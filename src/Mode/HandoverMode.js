import React, {Component} from 'react';
import {Container, Button, Text} from 'native-base';
import Question from "../Components/Question.js";

export default class HandoverMode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indexQuestion: this.props.navigation.state.params.indexQuestion,
      questionObj: this.props.navigation.state.params.questionObj,
      savedData: this.props.navigation.state.params.savedData,
    };
  }

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      title: navigation.getParam('Title', 'Handover Mode'),
      //Default Title of ActionBar
      headerStyle: {
        backgroundColor: navigation.getParam('BackgroundColor', '#EF233C'),
        //Background color of ActionBar
      },
      headerTintColor: navigation.getParam('HeaderTintColor', '#fff'),
    };
  };

  saveValue = (index, value) => {
    this.state.savedData[index] = value;
  }

  returnToProfessionalMode = () => {
    this.props.navigation.navigate("ProfessionalMode", {handoverMode: true, savedData: this.state.savedData});
  }

  render() {
    return (
      <Container style={{flex: 1, flexDirection: 'column'}}>
        <Container style={{flex: 1}}>
          <Question data={this.state.questionObj} save={this.saveValue} indexQuestion={this.state.indexQuestion} saved={this.state.savedData[this.state.indexQuestion]}/>
          <Button primary onPress={() => this.returnToProfessionalMode()}><Text>Save</Text></Button>
        </Container>
      </Container>
    );
  }
}
