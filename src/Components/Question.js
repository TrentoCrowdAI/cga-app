import React, { Component } from 'react';
import { Container, Content, Input, Button, Title, Text, Left, Right } from 'native-base';
import Textbox from "./Textbox";
import CheckboxGroup from "./CheckboxGroup";
import RadioGroup from "./RadioGroup";

export default class Question extends Component {
  constructor(props){
    super(props);
    this.state = {
      indexQuestion: this.props.indexQuestion,
      data: this.props.data,
      question: ""
    };
  }

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

  createCheckboxGroup = (labels) => {
    return (
      <Container>
        <CheckboxGroup labels={labels} save={this.props.save} indexQuestion={this.state.indexQuestion} saved={this.props.saved} />
      </Container>
    );
  }

  createCheckboxGroupWithImages = (labels, images) => {
    return (
      <Container>
        <CheckboxGroup labels={labels} save={this.props.save} indexQuestion={this.state.indexQuestion} saved={this.props.saved} images={this.props.images} />
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
      indexQuestion: nextProp.indexQuestion,
      data: nextProp.data,
      question: {}
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
