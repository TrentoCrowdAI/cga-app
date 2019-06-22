import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Title, Text, Button, Card, CardItem, Left, Content, List, Footer } from 'native-base';
import VisitCard from '../Components/VisitCard.js';
var RNFS = require('react-native-fs');
var pathSurveyComponentId = RNFS.DocumentDirectoryPath + '/configFileSurveyComponentId.txt';
var pathSurveyComponentResponseId = RNFS.DocumentDirectoryPath + '/configFileSurveyComponentResponseId.txt';

export default class SubjectPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: props.navigation.state.params.subject.name,
      surname: props.navigation.state.params.subject.surname,
      location: props.navigation.state.params.subject.location,
      contact: props.navigation.state.params.subject.contact,
      status: props.navigation.state.params.subject.status,
      date: props.navigation.state.params.subject.creation_date,
      surveys: props.navigation.state.params.surveys,
      navigation: props.navigation.state.params.navigation
    };

    var i = 0;
    for (i = 0; i < this.state.surveys.length; i++){//in order to pass the parameter to the splash screen, that isn't in the same stack, the app will set a file in the device
      if(this.state.surveys[i].status == 'incomplete'){
        this.storeData(pathSurveyComponentId, ""+this.state.surveys[i].survey_component_id);
        this.storeData(pathSurveyComponentResponseId, ""+this.state.surveys[i].survey_component_response_id);
        break;
      }
    }
  }

  static navigationOptions = ({ navigation }) => { //this function prepare the header of the activity
    return {
      title: "Subject Page",
      //Default Title of ActionBar
      headerStyle: {
        backgroundColor: navigation.getParam('BackgroundColor', '#EF233C'),
        //Background color of ActionBar
      },
      headerTintColor: navigation.getParam('HeaderTintColor', '#fff'),
      //Text color of ActionBar
    };
  };    

  renderVisitCards = (surveys) => {
    return surveys.map((survey, index) => {
      return (
        <VisitCard key={index} title={survey.name} date={survey.creation_date} status={survey.status}/>
      );
    });
  }

  //store data in the device memory
  storeData = async (path, value) => {
    return await RNFS.writeFile(path, value, 'utf8')
    .then((success) => {
      return success;
    })
    .catch((err) => {
      console.log(err.message);
    });
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps.navigation.state.params);
  }

  render() {
    return (
      <Container>
        <Content style={{ backgroundColor: 'white' }}>
          <Card>
            <CardItem>
              <Left><Text style={styles.titleText}>Patient: </Text><Text>{this.state.name}{" "}{this.state.surname}</Text></Left>
            </CardItem>
            <CardItem>
              <Left><Text style={styles.titleText}>Location: </Text><Text>{this.state.location}</Text></Left>
            </CardItem>
            <CardItem>
              <Left><Text style={styles.titleText}>Contact: </Text><Text>{this.state.contact}</Text></Left>
            </CardItem>
            <CardItem>
              <Left><Text style={styles.titleText}>Created at: </Text><Text>{this.state.date.substring(0, 10)}</Text></Left>
            </CardItem>
            <CardItem>
              <Left><Text style={styles.titleText}>Status: </Text><Text>{this.state.status}</Text></Left>
            </CardItem>
            <CardItem>
              <Left><Text style={styles.titleText}>Visits: </Text></Left>
            </CardItem>
            <CardItem>
              <Content>
                <List>
                  {this.renderVisitCards(this.state.surveys)}
                </List> 
              </Content>
            </CardItem>
          </Card>
        </Content>
        <Footer style={{ backgroundColor: 'white' }}>
          <Button style={styles.button} onPress={() => this.props.navigation.navigate("SplashScreen", {mode:"download"})}><Text>Resume</Text></Button>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  titleText:{
    fontSize: 20,
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#2b2d42'
  }
});
