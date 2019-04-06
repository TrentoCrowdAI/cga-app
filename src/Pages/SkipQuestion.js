import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Title, Text, Button, Icon, Right } from 'native-base';
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

  static navigationOptions = ({ navigation }) => { //this function prepare the header of the activity
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

  save = (index, value) => { //this function allow the component to update its state
    this.state.savedData[index] = value;
  }

  returnToProfessionalMode = () => { //this question allow the component to change the activity passing some data to the professionalmode activity
    this.props.navigation.navigate("ProfessionalMode", {skipQuestion: true, savedData: this.state.savedData});
  }

  render() {
    return (
      <Container style={{flex: 1, flexDirection: "column"}}>
        <Container style={{flex: 1}}>
          <Title style={styles.title}><Text>Why you want to skip the question??</Text></Title>
        </Container>
        <Container style={{flex: 1}}>
          <MyPicker save={this.save} labels={this.state.labels} indexQuestion="1"/>
        </Container>
        <Container style={{flex: 1}}>
          <Textbox label="Note" placeholder="Comment your choice" save={this.save}/>
        </Container>
        <Container style={{flex: 1, flexDirection:'row'}}>
          <Right><Button primary onPress={(() => this.returnToProfessionalMode())} style={styles.button}><Text>Next</Text><Icon name='arrow-forward'/></Button></Right>
        </Container>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    button: {
      width: 150,
      backgroundColor: '#2b2d42'
    },
    title: {
      marginTop: 24
    }
});
