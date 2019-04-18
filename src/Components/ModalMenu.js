import React, { Component } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Container, Button, Text } from 'native-base';

export default class ModalMenu extends Component {
  constructor(props){
    super(props);
    this.state = {
      dialogVisible: false,
      savedData: props.navigation.state.params.savedData,
    }
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

  //functions in order to change the activity
  endSession = () => {
    Alert.alert(
      'Attention',
      'Are you sure that you want end the session?',
      [
        {
          text: 'No',
        },
        {text: 'Yes', onPress: () => (this.props.navigation.navigate("EndSession", {data: this.state.savedData}))},
      ],
      {cancelable: false},
    );
  }

  showGuide = () => {
    this.props.navigation.goBack();
    this.props.navigation.navigate("Guide");
  }

  render() {
    return (
      <Container>
        <Container style={{flex:0.02}}/>
        <Button block onPress={() => this.endSession()} style={styles.button} ><Text>Stop Session</Text></Button>
        <Container style={{flex:0.02}}/>
        <Button block onPress={() => this.showGuide()} style={styles.button} ><Text>Show Guide</Text></Button>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    button: {
      backgroundColor: '#2b2d42'
    }
});
