import React, { Component } from 'react';
import { Container, Input, Button, Text, Left, Right } from 'native-base';
import Question from "./Question.js";

export default class NavigatorQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indexQuestion: 0,
      example: props.example,
      questionObj: {},
      savedData: {}
    }
    this.state.questionObj = this.state.example.items[this.state.indexQuestion];
  }

  nextQuestion = () => {
    if(this.state.indexQuestion < (this.state.example.items.length)-1){
      this.setState({
        indexQuestion: this.state.indexQuestion + 1,
        questionObj: this.state.example.items[this.state.indexQuestion + 1]
      });
    }
  }

  prevQuestion = () => {
    if(this.state.indexQuestion > 0){
      this.setState({
        indexQuestion: this.state.indexQuestion - 1,
        questionObj: this.state.example.items[this.state.indexQuestion - 1]
      });
    }
  }

  saveValue = (index, value) => {
    this.state.savedData[index] = value;
  }

  render() {
    return (
      <Container>
        <Container style={{flex: 1}}>
          <Question data={this.state.questionObj} save={this.saveValue} indexQuestion={this.state.indexQuestion} saved={this.state.savedData[this.state.indexQuestion]}/>
        </Container>
        <Container style={{flexDirection: 'row'}}>
          <Left>
            <Button primary onPress={() => this.prevQuestion()}><Text>Previous</Text></Button>
          </Left>
          <Right>
            <Button primary  onPress={() => this.nextQuestion()}><Text>  Next  </Text></Button>
          </Right>
        </Container>
      </Container>
    );
  }
}
