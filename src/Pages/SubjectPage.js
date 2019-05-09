import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Title, Text, Button, Card, CardItem, Right, Left, Body, Form, Content, Item, Header, List, Footer } from 'native-base';
import VisitCard from '../Components/VisitCard.js';

export default class SubjectPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: "Jonas",//this.props.name,
      surname: "Gonzalez",//this.props.surname,
      status: "rescheduled",//this.props.status,
      date: "08/05/2019",//this.props.date,
      interviewer: "Angely",//this.props.interviewer,
      notes: "The interviewee was tired and requested to rescheduled the rest of the interview",//this.props.notes,
      visits: [{name: "Demographics", date:"08/05/2019", status:"completed"}, {name: "Physical activitied and interaction", date:"08/05/2019", status:"pending"}, {name: "test1", date:"10/10/2019", status:"completed"}, ]
    };
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

  renderVisitCards = (visits) => {
    return visits.map((visit, index) => {
      return (
        <VisitCard key={index} title={visit.name} date={visit.date} status={visit.status}/>
      );
    });
  }

  render() {
    return (
      <Container>
        <Header androidStatusBarColor="#b70e23"  style={{ backgroundColor: 'white' }} />
        <Content style={{ backgroundColor: 'white' }}>
          <Card>
            <CardItem header>
              <Body style={{ flex: 1,  justifyContent: 'center'}}>
                <Title><Text style={styles.titleText}>{this.state.name}{" "}{this.state.surname}</Text></Title>
              </Body>
            </CardItem>
            <CardItem>
              <Left><Text>Date:{this.state.date}</Text></Left>
            </CardItem>
            <CardItem>
              <Left><Text>Interviewer: {this.state.interviewer}</Text></Left>
            </CardItem>
            <CardItem>
              <Left><Text>Status: {this.state.status}</Text></Left>
            </CardItem>
            <CardItem>
              <Left><Text>Notes: {this.state.notes}</Text></Left>
            </CardItem>
            <CardItem>
              <Left><Text>Visits: </Text></Left>
            </CardItem>
            <CardItem>
              <Content>
                <List>
                  {this.renderVisitCards(this.state.visits)}
                </List> 
              </Content>
            </CardItem>
          </Card>
        </Content>
        <Footer style={{ backgroundColor: 'white' }}>
          <Button style={styles.button}><Text>Resume</Text></Button>
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
