import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Title, Text, Card, CardItem, Body } from 'native-base';

export default class SubjectCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      data_collection_id: this.props.data_collection_id,
      subject_id: this.props.subject_id,
      name: this.props.name,
      surname: this.props.surname,
      navigation: this.props.navigation
    };
  }

  moveToSubjectPage = () => {
    fetch('https://cga-api.herokuapp.com/dataCollections/'+this.state.data_collection_id+'/subjects/'+this.state.subject_id+'/surveys', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Cookie': 'connect.sid=' + this.state.navigation.state.params.user.accessToken + ";",
      },
    }).then((response) => response.json())
    .then((responseJson) => {
      //console.log(responseJson);
      this.state.navigation.navigate("SubjectPage", {name: this.state.name, surname: this.state.surname, surveys: responseJson, navigation: this.state.navigation});
    });
  }

  render() {
    return (
      <Card>
        <TouchableOpacity onPress={() => this.moveToSubjectPage()}>
          <CardItem header>
            <Body style={{ flex: 1,  justifyContent: 'center'}}>
              <Title><Text style={styles.titleText}>{this.state.name}{" "}{this.state.surname}</Text></Title>
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
