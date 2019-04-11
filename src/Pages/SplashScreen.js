import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { Container, Text, Title } from 'native-base';

export default class SpalshScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      survey: {},
    }
  }

  static navigationOptions = () => {
    return {
      header: null
    }
  };

  moveToProfessionalMode = (data) => {//put the data inside the navigation component and move the activity to ProfessionalMode
    this.setState({survey: data[0]});
    this.props.navigation.replace("ProfessionalMode", {survey: data[0]});
  }

  componentDidMount(){//when the component is mounted it get the data from the remote server
    fetch('https://cga-mock-server.herokuapp.com/v1/surveyItems', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((responseData) => {
      return responseData.json();
    })
    .then((survey) => {
       this.moveToProfessionalMode(survey);
    });
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
