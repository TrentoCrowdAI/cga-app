import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { Container, Text, Title } from 'native-base';
var RNFS = require('react-native-fs');
var pathSurveyId = RNFS.DocumentDirectoryPath + '/configFileSurveyComponentId.txt';
var pathAccessToken = RNFS.DocumentDirectoryPath + '/configFileAccessToken.txt';
var pathSurveyComponentResponseId = RNFS.DocumentDirectoryPath + '/configFileSurveyComponentResponseId.txt';

export default class SpalshScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  static navigationOptions = () => {
    return {
      header: null
    }
  };

  //retrieve data from the device
  retrieveData = async (path) => {
    return await RNFS.readFile(path, 'utf8')
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err.message, err.code);
    });
  }

  moveToProfessionalMode = (items, response) => {//put the data inside the navigation component and move the activity to ProfessionalMode
    this.props.navigation.replace("ProfessionalMode", {survey: items, responses: response});
  }

  prepareData = async () => {
    var surveyComponentId; 
    await this.retrieveData(pathSurveyId).then((response) => surveyComponentId = response);
    var accessToken; 
    await this.retrieveData(pathAccessToken).then((response) => accessToken = response);
    var surveyComponentResponseId; 
    await this.retrieveData(pathSurveyComponentResponseId).then((response) => surveyComponentResponseId = response);
    fetch('https://cga-api.herokuapp.com/surveyComponents/'+surveyComponentId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Cookie': 'connect.sid='+accessToken+';'
      },
    }).then((responseData) => {
      return responseData.json();
    })
    .then((survey) => {
      //console.log(survey);
      fetch('https://cga-api.herokuapp.com/componentResponses/'+surveyComponentResponseId+'/surveyItemResponses', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Cookie': 'connect.sid='+accessToken+';'
        },
      }).then((responseData) => {
        return responseData.json();
      })
      .then((responses) => {
        //console.log(responses);
        this.moveToProfessionalMode(survey, responses);
      });
    });
  }

  componentDidMount(){//when the component is mounted it get the data from the remote server
    this.prepareData();
  }

  render() {
    return (
      <Container style={{flexDirection: 'column'}}>
        <Container style={{flex: 3}}/>
        <Container style={{flex: 1}}>
          <ActivityIndicator size="large" color="#0000ff"/>
          <Title><Text>Loading</Text></Title>
        </Container>
        <Container style={{flex: 3}}/>
      </Container>
    );
  }
}
