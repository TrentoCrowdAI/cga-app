import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Title, Text, Button } from 'native-base';
import Textbox from "./Textbox";
import CheckboxGroup from "./CheckboxGroup";
import RadioGroup from "./RadioGroup";

export default class Question extends Component {
  constructor(props){
    super(props);
    this.state = {
      indexQuestion: this.props.indexQuestion,
      data: this.props.data,
      question: {}
    };
  }

  //this 3 functions allow the component to create the question basing on the question type
  createTextbox = (label) => {
    return (
      <Container>
        <Textbox label={label} save={this.props.save} indexQuestion={this.state.indexQuestion} saved={this.props.saved}/>
      </Container>
    );
  }

  createRadioGroup = (labels) => {
    return (
      <Container>
        <RadioGroup labels={labels} save={this.props.save} indexQuestion={this.state.indexQuestion} saved={this.props.saved} />
      </Container>
    );
  }

  createCheckboxGroup = (labels, images) => {
    return (
      <Container>
        <CheckboxGroup labels={labels} save={this.props.save} indexQuestion={this.state.indexQuestion} saved={this.props.saved} images={images}/>
      </Container>
    );
  }

  //basing on the question type this method create the question object in order to show it
  renderQuestion = () => {
    if(this.state.data.type == "inputText"){
      this.state.question = this.createTextbox(this.state.data.options[0].content);
    }else if(this.state.data.type == "SingleChoise"){
      this.state.question = this.createRadioGroup(this.state.data.options);
    }
    else if(this.state.data.type == "MultipleChoise"){
      this.state.question = this.createCheckboxGroup(this.state.data.options, this.state.data.images);
    }
  }

  //this function resolve the problem of a title with a lot of characters, if the lenght of the title is bigger than the threshold it split the title in more than one
  renderTitle = () =>{
    maxLen = 40
    if(this.state.data.labels[0].content.length < maxLen) //basi case when the title is smaller than the treshold
      return(<Title style={styles.title}><Text style={styles.titleText}>{this.state.data.labels[0].content}</Text></Title>);
    else{
      vectTitle = []
      i = 0
      while(i < this.state.data.labels[0].content.length){
        if( i == 0 ){//only the first title has the margintop attribute
          vectTitle.push(<Title key={i} style={styles.title}><Text style={styles.titleText}>{this.state.data.labels[0].content.substring(i, (i + maxLen))}</Text></Title>);
          i = i + maxLen;
        }
        else if((i + maxLen) < this.state.data.labels[0].content.length){
          vectTitle.push(<Title key={i}><Text style={styles.titleText}>{this.state.data.labels[0].content.substring(i, (i + maxLen))}</Text></Title>);
          i = i + maxLen;
        } else {//when the characters are minus than the treshold it create a title with the remained characters
          vectTitle.push(<Title key={i}><Text style={styles.titleText}>{this.state.data.labels[0].content.substring(i, this.state.data.labels[0].content.length)}</Text></Title>);
          i = this.state.data.labels[0].content.length;
        }
      }
      return(
        <Container>
          {vectTitle}
        </Container>
      );
    }
  }

  //functions in order to change the activity
  skipQuestion = () => {
    this.props.navigation.navigate("SkipQuestion");
  }

  handoverMode = () => {
    this.props.navigation.navigate("HandoverMode", {indexQuestion: this.props.indexQuestion, questionObj: this.state.question, savedData: this.state.data});
  }

  componentWillReceiveProps(nextProp){ //this question allow the component to update itself when it receive an updated props,
    this.setState({ //when it has updated his state, this function will prepare another question object in order to show the next/previous question
      indexQuestion: nextProp.indexQuestion,
      data: nextProp.data,
      question: null
    });
    this.renderQuestion();
  }

  render() {
    this.renderQuestion();
    return (
      <Container style={styles.container}>
        <Container style={{flex: 1}}>
          {this.renderTitle()}
        </Container>
        <Container style={{flex: 2}}>
          {this.state.question}
        </Container>
        <Container style={{flex: 0.5, flexDirection: "row"}}>
          <Container style={{flex:2}} />
          <Container style={{flex:1}}>
            <Button block onPress={() => this.skipQuestion()} style={styles.button}><Text>Skip Question</Text></Button>
          </Container>
          <Container style={{flex:0.2}} />
          <Container style={{flex:1}}>
            <Button block onPress={() => this.handoverMode()} style={styles.button}><Text>Handover mode</Text></Button>
          </Container>
          <Container style={{flex:2}} />
        </Container>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  title: {
    marginTop: 24,
  },
  titleText:{
    fontSize: 20,
  },
  button: {
    backgroundColor: '#2b2d42'
  }
});
