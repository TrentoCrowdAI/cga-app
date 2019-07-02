import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import {Container, Content, Form, List, Label, Input, Item, Title, Text } from 'native-base';
import SubjectCard from '../Components/SubjectCard.js';

export default class SubjectsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      update: false,
      data: this.props.navigation.state.params.subjects,
      dataSearched: this.props.navigation.state.params.subjects,
      data_collection_id: this.props.navigation.state.params.data_collection_id,
      navigation: props.navigation.state.params.navigation,
      textSearched: undefined
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
              'Cookie': "express:sess=" + this.state.navigation.state.params.user.expressSessionCookie + '; express:sess.sig=' + this.state.navigation.state.params.user.expressSessionSignatureCookie + ';',
            },
          }).then((response) => response.json())
          .then((responseJson) => {
            this.setState({update:false, data: responseJson});
            this.forceUpdate();
            if(this.state.textSearched != undefined){
              this.updateSearch(this.state.textSearched);
            }else{
              this.setState({dataSearched:responseJson});
            }
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

  updateSearch = (text) => {
    var newDataSearched = [];
    for(var i = 0; i < this.state.data.length; i++){
      var nameSurname = this.state.data[i].name.toLowerCase().concat(' '.concat(this.state.data[i].surname.toLowerCase()));
      var surnameName = this.state.data[i].surname.toLowerCase().concat(' '.concat(this.state.data[i].name.toLowerCase()));
      if(this.state.data[i].name.toLowerCase().includes(text.toLowerCase()) || this.state.data[i].surname.toLowerCase().includes(text.toLowerCase()) 
          || nameSurname.includes(text.toLowerCase()) || surnameName.includes(text.toLowerCase())){
        newDataSearched.push(this.state.data[i]);
      }
    }
    this.setState({dataSearched: newDataSearched, textSearched: text});
    this.forceUpdate();
  }

  render() {
    if(this.state.data != null && this.state.data.length > 0){
      return (
        <Container>
          <Form style={{alignSelf: 'stretch'}}>
            <Item regular>
              <Label>Search</Label>
              <Input onChangeText={(text) => { this.updateSearch(text); }}/>
            </Item>      
          </Form>
          <Content style={{ backgroundColor: 'white' }}>
            <List>
              {this.renderSubjectCards(this.state.dataSearched)}
            </List>
          </Content>
        </Container>
      );
    }else{
      return (
        <Container><Title><Text>We're sorry but for this data collection you have no subject assinged. Try later.</Text></Title></Container>
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
