import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Title, Text, Card, CardItem, Body } from 'native-base';

export default class ProjectCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: this.props.title,
      description: this.props.description,
      navigation: this.props.navigation,
    };
  }

  render() {
    return (
      <Card>
        <TouchableOpacity onPress={() => this.state.navigation.navigate("DataCollectionsList")}>
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
