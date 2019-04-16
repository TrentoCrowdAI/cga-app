import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import { Container, Text, Button, Left, Right, Icon } from 'native-base';
import Question from "../Components/Question.js";
import MyTimer from "../Components/MyTimer.js";

export default class ProfessionalMode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      survey: props.navigation.state.params.survey,
      indexQuestion: 0,
      questionObj_0: {},
      questionObj_1: {},
      savedData: {},
      isLoading: true
    };
    this.state.questionObj_0 = this.state.survey.items[this.state.indexQuestion];
    if(this.calculateSizeNext(this.state.indexQuestion) == true){
      this.state.questionObj_1 = this.state.survey.items[this.state.indexQuestion+1];
    }
    this.props.navigation.setParams({ Title: this.state.survey.name });
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

  calculateSizeNext = (i) => {
    treshold = 5;
    retval = false;
    if((i+1) <= (this.state.survey.items.length - 1)){
      if(this.state.survey.items[i].type == "inputText" && this.state.survey.items[i+1].type == "inputText"){//check if the first type is a input text
        retval = true;
      }else if(this.state.survey.items[i].type == "inputText" && this.state.survey.items[i+1].type != "inputText"){
        if(this.state.survey.items[i+1].options != null && this.state.survey.items[i+1].options.length < treshold){
          retval = true;
        }
      }else if(this.state.survey.items[i].type != "inputText" && this.state.survey.items[i+1].type == "inputText"){
        if(this.state.survey.items[i+1].options != null && this.state.survey.items[i+1].options.length < treshold){
          retval = true;
        }
      }else if(this.state.survey.items[i].type != "inputText" && this.state.survey.items[i+1].type != "inputText"){
        if(this.state.survey.items[i].options != null && this.state.survey.items[i].options.length < treshold){
          if(this.state.survey.items[i+1].options != null && this.state.survey.items[i+1].options.length < treshold){
            retval = true;
          }
        }
      }
    }
    console.log(retval);
    return retval;
  }

  calculateSizePrev = (i) => {
    treshold = 5;
    retval = false;
    if((i-1) >= 0){
      if(this.state.survey.items[i].type == "inputText" && this.state.survey.items[i-1].type == "inputText"){//check if the first type is a input text
        retval = true;
      }else if(this.state.survey.items[i].type == "inputText" && this.state.survey.items[i-1].type != "inputText"){
        if(this.state.survey.items[i-1].options != null && this.state.survey.items[i-1].options.length < treshold){
          retval = true;
        }
      }else if(this.state.survey.items[i].type != "inputText" && this.state.survey.items[i-1].type == "inputText"){
        if(this.state.survey.items[i-1].options != null && this.state.survey.items[i-1].options.length < treshold){
          retval = true;
        }
      }else if(this.state.survey.items[i].type != "inputText" && this.state.survey.items[i-1].type != "inputText"){
        if(this.state.survey.items[i].options != null && this.state.survey.items[i].options.length < treshold){
          if(this.state.survey.items[i-1].options != null && this.state.survey.items[i-1].options.length < treshold){
            retval = true;
          }
        }
      }
    }
    console.log(retval);
    return retval;
  }

  //this two functions change and save the question datas when the user tap on next/previous
  nextQuestion = () => {
    if(this.state.questionObj_1 == null){
      if((this.state.indexQuestion + 1) <= (this.state.survey.items.length-1)){
        this.setState({
          indexQuestion: this.state.indexQuestion + 1
        });
        if((this.state.indexQuestion + 3) <= (this.state.survey.items.length-1)){
          if(this.calculateSizeNext(this.state.indexQuestion + 1) == false){
            this.setState({
              questionObj_0: this.state.survey.items[this.state.indexQuestion + 2],
              questionObj_1: null,
            });
          }else{
            this.setState({
              questionObj_0: this.state.survey.items[this.state.indexQuestion + 2],
              questionObj_1: this.state.survey.items[this.state.indexQuestion + 3],
            });
          }
        }else if ((this.state.indexQuestion + 2) <= (this.state.survey.items.length-1)){
          this.setState({
            questionObj_0: this.state.survey.items[this.state.indexQuestion + 2],
            questionObj_1: null,
          });
        }
      }
    }else{
      if((this.state.indexQuestion + 2) <= (this.state.survey.items.length-1)){
        this.setState({
          indexQuestion: this.state.indexQuestion + 2
        });
        if((this.state.indexQuestion + 3) <= (this.state.survey.items.length-1)){
          if(this.calculateSizeNext(this.state.indexQuestion + 1) == false){
            this.setState({
              questionObj_0: this.state.survey.items[this.state.indexQuestion + 2],
              questionObj_1: null,
            });
          }else{
            this.setState({
              questionObj_0: this.state.survey.items[this.state.indexQuestion + 2],
              questionObj_1: this.state.survey.items[this.state.indexQuestion + 3],
            });
          }
        }else if ((this.state.indexQuestion + 2) <= (this.state.survey.items.length-1)){
          this.setState({
            questionObj_0: this.state.survey.items[this.state.indexQuestion + 2],
            questionObj_1: null,
          });
        }
      }
    }
  }

  prevQuestion = () => {
    if(this.state.questionObj_1 == null){
      if(this.state.indexQuestion > 1){
        this.setState({
          indexQuestion: this.state.indexQuestion - 1
        });
        if((this.state.indexQuestion - 2) >= 0){
          if(this.calculateSizePrev(this.state.indexQuestion - 1) == false){
            this.setState({
              questionObj_0: this.state.survey.items[this.state.indexQuestion - 1],
              questionObj_1: null,
            });
          }else{
            this.setState({
              questionObj_0: this.state.survey.items[this.state.indexQuestion - 2],
              questionObj_1: this.state.survey.items[this.state.indexQuestion - 1],
            });
          }
        }else if((this.state.indexQuestion - 1) >= 0){
          this.setState({
            questionObj_0: this.state.survey.items[this.state.indexQuestion - 1],
            questionObj_1: null,
          });
        }
      }
    }else{
      if(this.state.indexQuestion > 1){
        this.setState({
          indexQuestion: this.state.indexQuestion - 2
        });
        if((this.state.indexQuestion - 2) >= 0){
          if(this.calculateSizePrev(this.state.indexQuestion - 1) == false){
            this.setState({
              questionObj_0: this.state.survey.items[this.state.indexQuestion - 1],
              questionObj_1: null,
            });
          }else{
            this.setState({
              questionObj_0: this.state.survey.items[this.state.indexQuestion - 2],
              questionObj_1: this.state.survey.items[this.state.indexQuestion - 1],
            });
          }
        }else if((this.state.indexQuestion - 1) >= 0){
          this.setState({
            questionObj_0: this.state.survey.items[this.state.indexQuestion - 1],
            questionObj_1: null,
          });
        }
      }
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
    if(this.state.questionObj_1 == null){
      return (
        <Container style={{flex: 1, flexDirection: "column"}}>
          <Container style={{flex: 0.1}}>
            <MyTimer />
          </Container>
          <Container style={{flex: 2}}>
            <Question data={this.state.questionObj_0} save={this.saveValue} indexQuestion={this.state.indexQuestion} saved={this.state.savedData[this.state.indexQuestion]}/>
          </Container>
          <Container style={{flex: 1}}>
            <Container style={{flexDirection: 'row'}}>
              <Left><Button onPress={() => this.prevQuestion()} style={styles.button}><Icon name='arrow-back'/><Text>Previous</Text></Button></Left>
              <Right><Button onPress={() => this.nextQuestion()} style={styles.button}><Text>Next</Text><Icon name='arrow-forward'/></Button></Right>
            </Container>
          </Container>
        </Container>
      );
    }else{
      return (
        <Container style={{flex: 1, flexDirection: "column"}}>
          <Container style={{flex: 0.1}}>
            <MyTimer />
          </Container>
          <Container style={{flex: 2}}>
            <Question data={this.state.questionObj_0} save={this.saveValue} indexQuestion={this.state.indexQuestion} saved={this.state.savedData[this.state.indexQuestion]}/>
            <Question data={this.state.questionObj_1} save={this.saveValue} indexQuestion={this.state.indexQuestion+1} saved={this.state.savedData[this.state.indexQuestion+1]}/>
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
}

const styles = StyleSheet.create({
    button: {
      width:150,
      backgroundColor: '#2b2d42'
    }
});
