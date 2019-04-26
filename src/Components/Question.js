import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Title, Text, Button, Card, CardItem, Right, Left, Body, Form, Content, Item } from 'native-base';
import Textbox from "./Textbox";
import CheckboxGroup from "./CheckboxGroup";
import RadioGroup from "./RadioGroup";

export default class Question extends Component {
  constructor(props){
    super(props);
    this.state = {
      indexQuestion: this.props.indexQuestion,
      data: this.props.data,
      question: {},
      save: this.props.save,
      handoverMode: this.props.handoverMode,
    };
  }

  //this 3 functions allow the component to create the question basing on the question type
  createTextbox = (label) => {
    return (
      <Textbox label={label} save={this.props.save} indexQuestion={this.state.indexQuestion} saved={this.props.saved}/>     
    );
  }

  createRadioGroup = (labels) => {
    return (
      <RadioGroup labels={labels} save={this.props.save} indexQuestion={this.state.indexQuestion} saved={this.props.saved} />
    );
  }

  createCheckboxGroup = (labels, images) => {
    return (
      <CheckboxGroup labels={labels} save={this.props.save} indexQuestion={this.state.indexQuestion} saved={this.props.saved} images={images}/>
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
    maxLen = 40;
    if(this.state.data.labels[0].content.length < maxLen) //basi case when the title is smaller than the treshold
      return(<Form><Title style={styles.title}><Text style={styles.titleText}>{this.state.data.labels[0].content}</Text></Title></Form>);
    else{
      vectTitle = []
      i = 0
      while(i < this.state.data.labels[0].content.length){
        if( i == 0 ){//only the first title has the margintop attribute
          for(x = 0; x < this.state.data.labels[0].content.length; x++){//searching fot the first space in order to separate the sentence correctly
            if(this.state.data.labels[0].content[i+maxLen+x] == ' '){
              break;
            }
          }
          vectTitle.push(<Title key={i} style={styles.title}><Text style={styles.titleText}>{this.state.data.labels[0].content.substring(i, (i + x + maxLen))}</Text></Title>);
          i = i + x + maxLen;
        }
        else if((i + maxLen) < this.state.data.labels[0].content.length){
          for(x = 0; x < this.state.data.labels[0].content.length; x++){//searching fot the first space in order to separate the sentence correctly
            if(this.state.data.labels[0].content[i+maxLen+x] == ' '){
              break;
            }
          }
          vectTitle.push(<Title key={i}><Text style={styles.titleText}>{this.state.data.labels[0].content.substring(i, (i + x + maxLen))}</Text></Title>);
          i = i + x + maxLen;
        } else {//when the characters are minus than the treshold it create a title with the remained characters
          vectTitle.push(<Title key={i}><Text style={styles.titleText}>{this.state.data.labels[0].content.substring(i, this.state.data.labels[0].content.length)}</Text></Title>);
          i = this.state.data.labels[0].content.length;
        }
      }
      return(
        <Form>
          {vectTitle}
        </Form>
      );
    }
  }

  //functions in order to change the activity
  skipQuestion = () => {
    this.props.navigation.navigate("SkipQuestion", {indexQuestion: this.state.indexQuestion});
  }

  handoverMode = () => {
    this.props.navigation.navigate("HandoverMode", {indexQuestion: this.state.indexQuestion, questionObj: this.state.question, data: this.state.data});
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
    if(this.state.handoverMode == undefined){//professionalMode rendering
      this.renderQuestion();
      return (
        <Card>
          <CardItem header>
            <Body style={{ flex: 1,  justifyContent: 'center', alignItems: 'center' }}>
              {this.renderTitle()}
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              {this.state.question}
            </Body>
          </CardItem>
          <CardItem footer>
            <Left>
              <Button onPress={() => this.skipQuestion()} style={styles.button}><Text>Skip Question</Text></Button>
            </Left>
            <Right>
              <Button onPress={() => this.handoverMode()} style={styles.button}><Text>Handover mode</Text></Button>
            </Right>
          </CardItem>
        </Card>
      );
    }else{//handoverMode rendering
      this.renderQuestion();
      return (
        <Card>
          <CardItem header>
            <Body style={{ flex: 1,  justifyContent: 'center', alignItems: 'center' }}>
              {this.renderTitle()}
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              {this.state.question}
            </Body>
          </CardItem>
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
