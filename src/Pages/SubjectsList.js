import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import {Container, Content, Footer, List, Button, Text } from 'native-base';
import SubjectCard from '../Components/SubjectCard.js';

export default class SubjectsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
        <SubjectCard key={index} subject_id={subject.id} data_collection_id={this.state.data_collection_id} subject={subject} navigation={this.state.navigation}/>
      );
    });
  }

  render() {
    return (
      <Container>
        <Content style={{ backgroundColor: 'white' }}>
          <List>
            {this.renderSubjectCards(this.state.data)}
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    backgroundColor: '#2b2d42'
  }
});
