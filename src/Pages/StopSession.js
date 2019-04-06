import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Title, Text, Button, Center } from 'native-base';
import MyPicker from '../Components/MyPicker.js';
import Textbox from '../Components/Textbox.js';

export default class StopSession extends Component {
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

  static navigationOptions = ({ navigation }) => { //this function prepare the header of the activity
    return {
      title: "Stop Session",
      //Default Title of ActionBar
      headerStyle: {
        backgroundColor: navigation.getParam('BackgroundColor', '#EF233C'),
        //Background color of ActionBar
      },
      headerTintColor: navigation.getParam('HeaderTintColor', '#fff'),
      //Text color of ActionBar
    };
  };

  save = (index, value) => { //this function allow the component to update its state
    this.state.savedData[index] = value;
  }

  endSession = () => { //this question allow the component to change the activity to the endSession activity
    this.props.navigation.goBack();
    this.props.navigation.navigate("EndSession");
  }

  render() {
    return (
      <Container style={{flex: 1, flexDirection: "column"}}>
        <Container style={{flex: 1}}>
          <Title style={styles.title}><Text>Why you want to stop the session??</Text></Title>
        </Container>
        <Container style={{flex: 1}}>
          <MyPicker save={this.save} labels={this.state.labels} indexQuestion="1"/>
        </Container>
        <Container style={{flex: 1}}>
          <Textbox label="Note"  placeholder="Comment your choice" save={this.save}/>
        </Container>
        <Container style={{flex: 1}}>
          <Button primary onPress={() => this.endSession()} style={styles.button}><Text>Next</Text></Button>
        </Container>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    button: {
      alignSelf: 'center',
      backgroundColor: '#2b2d42'
    },
    title: {
      marginTop: 24
    }
});
