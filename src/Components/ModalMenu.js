import React, { Component } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Container, Button, Text } from 'native-base';

export default class ModalMenu extends Component {
  constructor(props){
    super(props);
    this.state = {
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
          let vettPromise = []
          for(var i = 0; i < this.state.survey.items.length; i++){
            if(this.state.savedData[i] != undefined){
              vettPromise.push(this.uploadData(i));
            }
          }
          Promise.all(vettPromise).then((result) => result).then((result) => {  
            this.props.navigation.navigate("SubjectPage");
          });
        }},
      ],
      {cancelable: false},
    );
  }

  uploadData(i){
    return new Promise((resolve, reject) => {
      fetch('https://cga-api.herokuapp.com/componentResponses/'+this.state.surveyComponentResponseId+'/surveyItemResponses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': 'connect.sid='+this.state.accessToken+';'
        },
        body: JSON.stringify({survey_item_response:{name:this.state.survey.items[i].name, value:this.state.savedData[i], survey_item_id:this.state.survey.items[i].id}})
      }).then((responseData) => {
        console.log(responseData);
      }).then((result) => resolve(result));
    })
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
