import React, { Component } from 'react';
import { Container, Content, Input, Button, Title, Text, Left, Right } from 'native-base';
import Textbox from "./Textbox";
import CheckboxGroup from "./CheckboxGroup";
import RadioGroup from "./RadioGroup";

export default class Question extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: this.props.data,
      question: ""
    };
  }

  createTextbox = (label) => {
    return (
      <Container>
        <Textbox label={label}/>
      </Container>
    );
  }

  createRadioGroup = (labels) => {
    return (
      <Container>
        <RadioGroup labels={labels} />
      </Container>
    );
  }

  createCheckboxGroup = (labels) => {
    return (
      <Container>
        <CheckboxGroup labels={labels} />
      </Container>
    );
  }

  renderQuestion = () => {
    if(this.state.data.type == "inputText"){
      this.state.question = this.createTextbox(this.state.data.options[0].content);
    }else if(this.state.data.type == "SingleChoise"){
      this.state.question = this.createRadioGroup(this.state.data.options);
    }
    else if(this.state.data.type == "MultipleChoise"){
      this.state.question = this.createCheckboxGroup(this.state.data.options);
    }
  }

  componentWillReceiveProps(nextProp){
    this.setState({
      data: nextProp.data
    });
    this.renderQuestion();
  }

  render() {
    this.renderQuestion();
    return (
      <Container>
        <Title><Text>{this.state.data.labels[0].content}</Text></Title>
        {this.state.question}
      </Container>
    );
  }
}
