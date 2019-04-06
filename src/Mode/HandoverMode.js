import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import {Container, Button, Text, Icon, Right} from 'native-base';
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

  static navigationOptions = ({ navigation }) => { //this function prepare the header of the activity
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

  saveValue = (index, value) => { //this function allow the component to update its state
    this.state.savedData[index] = value;
  }

  returnToProfessionalMode = () => { //this question allow the component to change the activity passing some data to the professionalmode activity
    this.props.navigation.navigate("ProfessionalMode", {handoverMode: true, savedData: this.state.savedData});
  }

  render() {
    return (
      <Container style={{flex: 1, flexDirection: "column"}}>

        <Container style={{flex: 2}}>
          <Question data={this.state.questionObj} save={this.saveValue} indexQuestion={this.state.indexQuestion} saved={this.state.savedData[this.state.indexQuestion]}/>
        </Container>
        <Container style={{flex: 1}}>
          <Button primary onPress={() => this.returnToProfessionalMode()} style={styles.button}><Text>save</Text></Button>
        </Container>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    button: {
      alignSelf: 'center',
      backgroundColor: '#2b2d42'
    }
});
