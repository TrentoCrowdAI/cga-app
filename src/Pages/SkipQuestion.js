import React, { Component } from 'react';
import { Container, Title, Text, Button } from 'native-base';
import MyPicker from '../Components/MyPicker.js';
import Textbox from '../Components/Textbox.js';

export default class SkipQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: [
          {
            label:	"The patient refuse to answer",
            key: "tired"
          },
          {
            label:	"The patient doesn't know the answer",
            key: "know"
          }
      ],
      savedData: {}
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Skip Question",
      //Default Title of ActionBar
      headerStyle: {
        backgroundColor: navigation.getParam('BackgroundColor', '#EF233C'),
        //Background color of ActionBar
      },
      headerTintColor: navigation.getParam('HeaderTintColor', '#fff'),
      //Text color of ActionBar
    };
  };

  save = (index, value) =>{
    this.state.savedData[index] = value;
  }

  returnToProfessionalMode = () => {
    this.props.navigation.navigate("ProfessionalMode", {skipQuestion: true, savedData: this.state.savedData});
  }

  render() {
    return (
      <Container style={{flex: 1, flexDirection: "column"}}>
        <Container style={{flex: 1}}>
          <Title><Text>Why you want to skip the question??</Text></Title>
        </Container>
        <Container style={{flex: 1}}>
          <MyPicker save={this.save} labels={this.state.labels} indexQuestion="1"/>
        </Container>
        <Container style={{flex: 1}}>
          <Textbox label="Note" save={this.save} indexQuestion="1"/>
        </Container>
        <Container style={{flex: 1}}>
          <Button primary onPress={(() => this.returnToProfessionalMode())} ><Text>Next</Text></Button>
        </Container>
      </Container>
    );
  }
}
