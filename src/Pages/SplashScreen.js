import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { Container, Text, Title } from 'native-base';
var RNFS = require('react-native-fs');
var pathSurveyId = RNFS.DocumentDirectoryPath + '/configFileSurveyComponentId.txt';
var pathExpressSessionToken = RNFS.DocumentDirectoryPath + '/configFileExpressSessionToken.txt';
var pathExpressSessionSignatureToken = RNFS.DocumentDirectoryPath + '/configFileExpressSessionSignatureToken.txt';
var pathSurveyComponentResponseId = RNFS.DocumentDirectoryPath + '/configFileSurveyComponentResponseId.txt';
var pathLanguage = RNFS.DocumentDirectoryPath + '/configLanguage.txt';

export default class SpalshScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: this.props.navigation.state.params.mode,
    }
  }

  static navigationOptions = () => {
    return {
      header: null
    }
  };

  //retrieve the data in order to show the survey
  prepareData = async () => {
    var language; 
    await this.retrieveData(pathLanguage).then((response) => language = response);
    var surveyComponentId; 
    await this.retrieveData(pathSurveyId).then((response) => surveyComponentId = response);
    var expressSessionCookie;
    await this.retrieveData(pathExpressSessionToken).then((response) => expressSessionCookie = response);
    var expressSessionSignatureCookie;
    await this.retrieveData(pathExpressSessionSignatureToken).then((response) => expressSessionSignatureCookie = response);
    var surveyComponentResponseId; 
    await this.retrieveData(pathSurveyComponentResponseId).then((response) => surveyComponentResponseId = response);
    fetch('https://cga-api.herokuapp.com/surveyComponents/'+surveyComponentId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Cookie': "express:sess=" + expressSessionCookie + '; express:sess.sig=' + expressSessionSignatureCookie + ';',
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
          'Cookie': "express:sess=" + expressSessionCookie + '; express:sess.sig=' + expressSessionSignatureCookie + ';',
        },
      }).then((responseData) => {
        return responseData.json();
      })
      .then((responses) => {
        //console.log(responses);
        this.moveToProfessionalMode(survey, responses, expressSessionCookie, expressSessionSignatureCookie, surveyComponentResponseId, language);
      });
    });
  }

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

  moveToProfessionalMode = (items, response, expressSessionCookie, expressSessionSignatureCookie, surveyComponentResponseId, language) => {//put the data inside the navigation component and move the activity to ProfessionalMode
    this.props.navigation.replace("ProfessionalMode", {survey: items, responses: response, expressSessionCookie: expressSessionCookie, expressSessionSignatureCookie:expressSessionSignatureCookie, surveyComponentResponseId: surveyComponentResponseId, language:language});
  }

  //upload the survey_reponses to the server
  uploadSurvey = async () => {
    let vettPromise = []
    for(var i = 0; i < this.props.navigation.state.params.survey.items.length; i++){
      if(this.props.navigation.state.params.savedData[i] != undefined){
        vettPromise.push(this.uploadData(i));
      }
    }
    Promise.all(vettPromise).then((result) => result).then((result) => {
      this.props.navigation.goBack();
    });
  }

  //single upload of survey_response object
  uploadData(i){
    return new Promise((resolve, reject) => {
      fetch('https://cga-api.herokuapp.com/componentResponses/'+this.props.navigation.state.params.surveyComponentResponseId+'/surveyItemResponses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': "express:sess=" + this.props.navigation.state.params.expressSessionCookie + '; express:sess.sig=' + this.props.navigation.state.params.expressSessionSignatureCookie + ';',
        },
        body: JSON.stringify({survey_item_response:{name:this.props.navigation.state.params.survey.items[i].name, value:this.props.navigation.state.params.savedData[i], survey_item_id:this.props.navigation.state.params.survey.items[i].id}})
      }).then((responseData) => {
        console.log(responseData);
      }).then((result) => resolve(result));
    })
  }

  componentDidMount(){//when the component is mounted it get the data from the remote server
    if(this.state.mode == 'download'){
      this.prepareData();
    }else if(this.state.mode == 'upload'){
      this.uploadSurvey();
    }
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
