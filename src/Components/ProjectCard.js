import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Title, Text, Card, CardItem, Body } from 'native-base';

export default class ProjectCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: this.props.id,
      title: this.props.title,
      description: this.props.description,
      navigation: this.props.navigation
    };
  }

  moveToDataCollection = () => {
    fetch('https://cga-api.herokuapp.com/projects/'+this.state.id+'/dataCollections', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Cookie': 'connect.sid=' + this.state.navigation.state.params.user.accessToken + ";",
      },
    }).then((response) => response.json())
    .then((responseJson) => {
      //console.log(responseJson);
      this.state.navigation.navigate("DataCollectionsList", {dataCollections: responseJson, navigation: this.state.navigation});
    });
  }

  render() {
    return (
      <Card>
        <TouchableOpacity onPress={() => this.moveToDataCollection()}>
          <CardItem header>
            <Body style={{ flex: 1,  justifyContent: 'center'}}>
              <Title><Text style={styles.titleText}>{this.state.title}</Text></Title>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <Text>{this.state.description}</Text>
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
