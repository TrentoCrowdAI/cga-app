import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Button, Text } from 'native-base';
import YesNoDialog from './YesNoDialog.js';

export default class ModalMenu extends Component {
  constructor(props){
    super(props);
    this.state = {
      dialogVisible: false,
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
    this.setState({
      dialogVisible: true,
    });
    /*this.props.navigation.goBack();
    this.props.navigation.navigate("StopSession");*/
  }

  showGuide = () => {
    this.props.navigation.goBack();
    this.props.navigation.navigate("Guide");
  }

  render() {
    return (
      <Container>
        <Button block onPress={() => this.endSession()} style={styles.button} ><Text>Stop Session</Text></Button>
        <Container style={{flex:0.02}}/>
        <Button block onPress={() => this.showGuide()} style={styles.button} ><Text>Show Guide</Text></Button>
        <YesNoDialog title="Warning" visible={this.state.dialogVisible} text="Are you sure to end the session?" navigation={this.props.navigation}/>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    button: {
      backgroundColor: '#2b2d42'
    }
});
