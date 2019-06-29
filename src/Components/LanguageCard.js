import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Title, Text, Card, CardItem, Body } from 'native-base';
var RNFS = require('react-native-fs');
var pathLanguage = RNFS.DocumentDirectoryPath + '/configLanguage.txt';

export default class LanguageCard extends Component {
  constructor(props){
    super(props);
    if(this.props.selected == undefined){
      this.state = {
        language: this.props.language,
        selected: false,
        updateSelection: this.props.updateSelection
      };
    }else{
      this.state = {
        language: this.props.language,
        selected: this.props.selected,
        updateSelection: this.props.updateSelection
      };
    }    
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      language: nextProps.language,
      selected: nextProps.selected,
    });
    this.forceUpdate();
  }

  setLanguage = async (language) => {
    await RNFS.writeFile(pathLanguage, language, 'utf8')
    .then((success) => {
      console.log('FILE WRITTEN ' + pathLanguage);
      this.setState({selected:true});
      this.state.updateSelection(language);
      this.forceUpdate();
    })
    .catch((err) => {
      console.log(err.message);
    });
  }

  render() {
    if(this.state.selected){
      return (
        <Card>
          <TouchableOpacity onPress={() => this.setLanguage(this.state.language.toLowerCase())}>
            <CardItem>
              <Body>
                <Title><Text style={styles.titleText}>{this.state.language}</Text></Title>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Text>Selected</Text>
              </Body>
            </CardItem>
          </TouchableOpacity>
        </Card>
      );
    } else {
      return (
        <Card>
          <TouchableOpacity onPress={() => this.setLanguage(this.state.language.toLowerCase())}>
            <CardItem>
              <Body>
                <Title><Text style={styles.titleText}>{this.state.language}</Text></Title>
              </Body>
            </CardItem>
          </TouchableOpacity>
        </Card>
      );
    }
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
