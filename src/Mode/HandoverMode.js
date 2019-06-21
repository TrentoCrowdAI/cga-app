import React, {Component} from 'react';
import { StyleSheet, Alert } from 'react-native';
import {Container, Button, Text, Header, Footer, Body, Content} from 'native-base';
import QuestionCard from "../Components/QuestionCard.js";

export default class HandoverMode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indexQuestion: this.props.navigation.state.params.indexQuestion,
      questionObj: this.props.navigation.state.params.questionObj,
      data: this.props.navigation.state.params.data,
      savedData: undefined,
      language: this.props.navigation.state.params.language
    };
  }

  static navigationOptions = ({ navigation }) => { //this function prepare the header of the activity
    const params = navigation.state.params || {};
    return {
      title: navigation.getParam('Title', 'Handover Mode'),
      //Default Title of ActionBar
      headerStyle: {
        backgroundColor: navigation.getParam('BackgroundColor', '#1c77c3'),
        //Background color of ActionBar
      },
      headerTintColor: navigation.getParam('HeaderTintColor', '#fff'),
    };
  };

  saveValue = (index, value) => { //this function allow the component to update its state
    this.state.savedData = {index:index, obj:{value: 'handover', real_value: value}};
  }

  returnToProfessionalMode = () => { //this question allow the component to change the activity passing some data to the professionalmode activity
    if(this.state.savedData == undefined){
      Alert.alert( //if the user hasn't compiled the question the app won't allow him to proceed
        'Attention',
        'Complete the question before click the save button!',
        [
          {text: 'OK'},
        ],
        {cancelable: false},
      );
    }else{
      this.props.navigation.navigate("ProfessionalMode", {handoverMode: true, savedData: this.state.savedData});
    }
  }

  render() {
    return (
      <Container style={{flex: 1, flexDirection: "column"}}>
        <Header androidStatusBarColor="#115893" style={{ backgroundColor: 'white' }} />
        <Content style={{ backgroundColor: 'white' }}>
          <QuestionCard questionObj={this.state.questionObj} save={this.saveValue} indexQuestion={this.state.indexQuestion} data={this.state.data} handoverMode={true} language={this.state.language}/>
          <Button primary onPress={() => this.returnToProfessionalMode()} style={styles.button}><Text>save</Text></Button>
        </Content>
        <Footer style={{ backgroundColor: 'white' }} />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    button: {
      alignSelf: 'center',
      backgroundColor: '#56cbf9'
    }
});
