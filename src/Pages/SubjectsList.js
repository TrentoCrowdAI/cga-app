import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import {Container, Content, Footer, List, Button, Text } from 'native-base';
import SubjectCard from '../Components/SubjectCard.js';

export default class SubjectsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      update: false,
      data: this.props.navigation.state.params.subjects,
      data_collection_id: this.props.navigation.state.params.data_collection_id,
      navigation: props.navigation.state.params.navigation
    };
  }

  static navigationOptions = ({ navigation }) => { //this function prepare the header of the activity
    return {
      title: "Patient List",
      //Default Title of ActionBar
      headerStyle: {
        backgroundColor: navigation.getParam('BackgroundColor', '#EF233C'),
        //Background color of ActionBar
      },
      headerTintColor: navigation.getParam('HeaderTintColor', '#fff'),
      //Text color of ActionBar
    };
  };    

  renderSubjectCards = (subjects) => {
    return subjects.map((subject, index) => {
      return (
        <SubjectCard key={index} enableSubjectListUpdate={this.enableSubjectListUpdate} subject_id={subject.id} data_collection_id={this.state.data_collection_id} subject={subject} navigation={this.state.navigation}/>
      );
    });
  }

  enableSubjectListUpdate = () => {
    this.setState({update:true});
  }

  componentDidMount() {
    this.subs = [
      this.props.navigation.addListener('willFocus', () => { //when the user return to the page, the app will update the subject list
        if(this.state.update == true){
          fetch('https://cga-api.herokuapp.com/dataCollections/'+this.state.data_collection_id+'/subjects', { 
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Cookie': 'connect.sid=' + this.state.navigation.state.params.user.accessToken + ";",
            },
          }).then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson);
            this.setState({update:false, data: responseJson});
            this.forceUpdate();
          });
        }
      })
    ];
  }

  componentWillUnmount() {
    this.subs.forEach((sub) => {
      sub.remove();
    });
  }

  render() {
    if(this.state.data != null && this.state.data.length > 0){
      return (
        <Container>
          <Content style={{ backgroundColor: 'white' }}>
            <List>
              {this.renderSubjectCards(this.state.data)}
            </List>
          </Content>
        </Container>
      );
    }else{
      return (
        <Container><Title>We're sorry but for this data collection you have no subject assinged. Try later.</Title></Container>
      );
    }
  }
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    backgroundColor: '#2b2d42'
  }
});
