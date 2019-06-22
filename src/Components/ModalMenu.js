import React, { Component } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Container, Button, Text, Icon } from 'native-base';

export default class ModalMenu extends Component {
  constructor(props){
    super(props);
    console.log(props.navigation.state.params.oldProfessionalModeState)
    this.state = {
      oldProfessionalModeState: props.navigation.state.params.oldProfessionalModeState,
      dialogVisible: false,
      surveyComponentResponseId: props.navigation.state.params.surveyComponentResponseId,
      accessToken: props.navigation.state.params.accessToken,
      survey: props.navigation.state.params.survey,
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
      headerLeft:(<Button transparent onPress = {() => (navigation.replace('ProfessionalMode', {oldProfessionalModeState: navigation.state.params.oldProfessionalModeState}))}><Icon name='leftarrow' style={{color:"white"}} /></Button>)
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
        {text: 'Yes', onPress: () => {
          this.props.navigation.replace("SplashScreen", {mode:"upload", savedData: this.state.savedData, survey: this.state.survey, accessToken: this.state.accessToken, surveyComponentResponseId: this.state.surveyComponentResponseId});
        }},
      ],
      {cancelable: false},
    );
  }

  showGuide = () => {
    this.props.navigation.goBack();
    this.props.navigation.navigate("Guide", {oldProfessionalModeState: this.state.oldProfessionalModeState});
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
