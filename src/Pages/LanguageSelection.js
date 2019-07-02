import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Text, List, Content, Title } from 'native-base';
import LanguageCard from "../Components/LanguageCard.js";

var RNFS = require('react-native-fs');
var pathLanguage = RNFS.DocumentDirectoryPath + '/configLanguage.txt';

const languages = ["English", "Italian", "Spanish", "French"]

export default class Guide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languageCards: []
    }
  }

  componentDidMount(){
    this.recoverLanguageSetting();
  }

  recoverLanguageSetting = async () => {
    await this.getLanguage().then((response) => {
      if(response != undefined){
        this.setState({selectedLanguage: response});
        this.setState({languageCards: this.renderLanguageCards(languages, response)});
        this.forceUpdate();
      }
    });
  }

  updateSelection = (language) => {
    this.setState({selectedLanguage:language});
    this.setState({languageCards: this.renderLanguageCards(languages, language)});
    this.forceUpdate();
  }

  static navigationOptions = ({ navigation }) => { //this function prepare the header of the activity
    return {
      title: "Language Settings",
      //Default Title of ActionBar
      headerStyle: {
        backgroundColor: navigation.getParam('BackgroundColor', '#EF233C'),
        //Background color of ActionBar
      },
      //Text color of ActionBar
      headerTintColor: navigation.getParam('HeaderTintColor', '#fff'),
    };
  };

  renderLanguageCards = (languages, selectedLanguage) => {
    if(selectedLanguage == undefined){
      return languages.map((language, index) => {
        return (
          <LanguageCard key={index} language={language} />
        );
      });
    }else{
      return languages.map((language, index) => {
        return (
          <LanguageCard key={index} language={language} updateSelection={this.updateSelection} selected={selectedLanguage.toLowerCase().includes(language.toLowerCase())} />
        );
      });
    }
  }

  //retrieve data from the device
  getLanguage = async () => {
    return await RNFS.readFile(pathLanguage, 'utf8')
    .then((result) => {
      //console.log(result);
      return result;
    })
    .catch((err) => {
      console.log(err.message, err.code);
    });
  }

  render() {
    return (
      <Container style={{flex: 1}}>
        <Title><Text>Select an option in order to select the language</Text></Title>
        <Title><Text>If the option isn't present among those available, then english will be used.</Text></Title>
        <Content>
          <List>
            {this.state.languageCards}
          </List>
        </Content>
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
    fontWeight: 'bold',
  },
});