import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Title, Text, Card, CardItem, Body } from 'native-base';

export default class SubjectCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      enableSubjectListUpdate: this.props.enableSubjectListUpdate,
      data_collection_id: this.props.data_collection_id,
      subject_id: this.props.subject_id,
      subject: this.props.subject,
      navigation: this.props.navigation
    };
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      data_collection_id: nextProps.data_collection_id,
      subject_id: nextProps.subject_id,
      subject: nextProps.subject,
    });
    this.forceUpdate();
  }

  moveToSubjectPage = () => {
    fetch('https://cga-api.herokuapp.com/dataCollections/'+this.state.data_collection_id+'/subjects/'+this.state.subject_id+'/surveys', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Cookie': "express:sess=" + this.state.navigation.state.params.user.expressSessionCookie + '; express:sess.sig=' + this.state.navigation.state.params.user.expressSessionSignatureCookie + ';',
      },
    }).then((response) => response.json())
    .then((responseJson) => {
      //console.log(responseJson);
      this.props.enableSubjectListUpdate();
      this.state.navigation.navigate("SubjectPage", {subject: this.state.subject, surveys: responseJson, navigation: this.state.navigation, dataCollectionId: this.state.data_collection_id, user: this.state.navigation.state.params.user});
    });
  }

  render() {
    return (
      <Card>
        <TouchableOpacity onPress={() => this.moveToSubjectPage()}>
          <CardItem header>
            <Body style={{ flex: 1,  justifyContent: 'center'}}>
              <Title><Text style={styles.titleText}>{this.state.subject.name}{" "}{this.state.subject.surname}</Text></Title>
            </Body>
          </CardItem>
        </TouchableOpacity>
      </Card>
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
    fontWeight: 'bold',
  },
});
