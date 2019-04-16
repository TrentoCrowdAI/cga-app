import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import { Container, Text, Button, Left, Right, Icon } from 'native-base';
import Question from "../Components/Question.js";
import MyTimer from "../Components/MyTimer";

export default class ProfessionalMode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      survey: props.navigation.state.params.survey,
      indexQuestion: 0,
      questionObj: {},
      savedData: {},
      isLoading: true
    };
    this.state.questionObj = this.state.survey.items[this.state.indexQuestion];
    this.props.navigation.setParams({ Title: this.state.survey.name });
    this.props.navigation.setParams({indexQuestion: this.state.indexQuestion, questionObj: this.state.questionObj, savedData: this.state.savedData}); //setting the first params that will be passed to ModalMenu
  }

  static navigationOptions = ({ navigation }) => { //this function prepare the header of the activity
    const params = navigation.state.params || {};

    return {
      title: navigation.getParam('Title', 'Default Title'),
      //Default Title of ActionBar
      headerStyle: {
        backgroundColor: navigation.getParam('BackgroundColor', '#EF233C'),
        //Background color of ActionBar
      },
      headerTintColor: navigation.getParam('HeaderTintColor', '#fff'),
      //Text color of ActionBar
      headerRight: (
        <Button transparent onPress={() => navigation.navigate('ModalMenu', {indexQuestion: navigation.state.params.indexQuestion, questionObj: navigation.state.params.questionObj, savedData: navigation.state.params.savedData})}><Text /><Icon name='more' style={{color:"white"}} /></Button> //this button prepare the datas that will be passed to ModalMenu
      )
    };
  };

  //this two functions change and save the question datas when the user tap on next/previous
  nextQuestion = () => {
    if(this.state.indexQuestion == (this.state.survey.items.length)-1){
      alert("Unable to proceed! \nInconsistence found");
    }
    if(this.state.indexQuestion <= (this.state.survey.items.length)-2){
      this.setState({
        indexQuestion: this.state.indexQuestion + 1,
        questionObj: this.state.survey.items[this.state.indexQuestion + 1],
      });
      this.props.navigation.setParams({indexQuestion: this.state.indexQuestion + 1, questionObj: this.state.survey.items[this.state.indexQuestion + 1], savedData: this.state.savedData});//every time that the question change the function set the data for the ModalMenu
    }
  }

  prevQuestion = () => {
    if(this.state.indexQuestion > 0){
      this.setState({
        indexQuestion: this.state.indexQuestion - 1,
        questionObj: this.state.survey.items[this.state.indexQuestion - 1]
      });
      this.props.navigation.setParams({indexQuestion: this.state.indexQuestion - 1, questionObj: this.state.survey.items[this.state.indexQuestion - 1], savedData: this.state.savedData});//every time that the question change the function set the data for the ModalMenu
    }
  }

  saveValue = (index, value) => { //this function allow the component to update its state
    this.state.savedData[index] = value;
  }

  componentWillReceiveProps(nextProp){ //when the component receive an updated props it update his state
    if(nextProp.navigation.state.params.skipQuestion == true && nextProp.navigation.state.params.savedData != undefined){ //N.B.: Decide on what to do with savedData object returned by the Page SkipQuestion.js
      nextProp.navigation.state.params.skipQuestion = false;
      this.nextQuestion();
    }else if(nextProp.navigation.state.params.handoverMode == true && nextProp.navigation.state.params.savedData != undefined){ //it save the data passed from the HandoverMode.js
      nextProp.navigation.state.params.handoverMode = false;
      this.setState({
        savedData: nextProp.navigation.state.params.savedData,
      });
      this.nextQuestion();
    }
  }

  render() {
    return (
      <Container style={{flex: 1, flexDirection: "column"}}>
        <Container style={{flex: 0.22}}>
          <MyTimer />
        </Container>
        <Container style={{flex: 2}}>
          <Question data={this.state.questionObj} save={this.saveValue} indexQuestion={this.state.indexQuestion} saved={this.state.savedData[this.state.indexQuestion]}/>
        </Container>
        <Container style={{flex: 1}}>
          <Container style={{flexDirection: 'row'}}>
            <Left><Button onPress={() => this.prevQuestion()} style={styles.button}><Icon name='arrow-back'/><Text>Previous</Text></Button></Left>
            <Right><Button onPress={() => this.nextQuestion()} style={styles.button}><Text>Next</Text><Icon name='arrow-forward'/></Button></Right>
          </Container>
        </Container>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    button: {
      width:150,
      backgroundColor: '#2b2d42'
    }
});
