import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Container, Title, Text, Button} from 'native-base';
import MyPicker from '../Components/MyPicker.js';
import Textbox from '../Components/Textbox.js';

export default class EndSession extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: [
          {
              label:	"The patient is tired",
              key: "tired"
          },
          {
            label:	"The patient haven't other time",
            key: "time"
          }
      ],
      savedData: {}
    }
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

  save = (index, value) =>{
    this.state.savedData[index] = value;
  }

  render() {
    return (
      <Container style={{flex: 1, flexDirection: "column"}}>
        <Container style={{flex: 1}}>
          <Title><Text>Why you want to stop the session??</Text></Title>
        </Container>
        <Container style={{flex: 1}}>
          <MyPicker save={this.save} labels={this.state.labels} indexQuestion="1"/>
        </Container>
        <Container style={{flex: 1}}>
          <Textbox label="Note" save={this.save} indexQuestion="1"/>
        </Container>
        <Container style={{flex: 1}}>
          <Button primary onPress={(() => alert("pressed"))} ><Text>Next</Text></Button>
        </Container>
      </Container>
    );
  }
}
