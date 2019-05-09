import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import {Container, Content, Header, Footer, List, Button, Text } from 'native-base';
import SubjectCard from '../Components/SubjectCard.js';

export default class SubjectsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{name:"Carl", surname:"Perez", place:"Manila", date:"08/05/2019", status:"complete"},
      {name:"Maria", surname:"Garcia", place:"Manila", date:"08/05/2019", status:"refused"},
      {name:"Jonas", surname:"Gonzalez", place:"Manila", date:"08/05/2019", status:"rescheduled"},{name:"name 1", surname:"surname 1", place:"place 1", date:"10/10/2019", status:"complete"},],
    };
  }

  static navigationOptions = ({ navigation }) => { //this function prepare the header of the activity
    return {
      title: "Data Collection",
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
        <SubjectCard key={index} name={subject.name} surname={subject.surname} date={subject.date} status={subject.status} place={subject.place}/>
      );
    });
  }

  render() {
    return (
      <Container>
        <Header androidStatusBarColor="#b70e23"  style={{ backgroundColor: 'white' }} />
        <Content style={{ backgroundColor: 'white' }}>
          <List>
            {this.renderSubjectCards(this.state.data)}
          </List>
        </Content>
        <Footer style={{ backgroundColor: 'white' }}>
          <Button style={styles.button}><Text>New Interview</Text></Button>
        </Footer>
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
