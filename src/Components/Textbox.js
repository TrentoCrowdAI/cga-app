import React, { Component } from 'react';
import { Container, Input, Item, Label } from 'native-base';

export default class Textbox extends Component {
  constructor(props){
    super(props);
    this.state = {
      indexQuestion: props.indexQuestion,
      value: ""
    }
    if(props.saved != undefined){
      this.state.value = props.saved;
    }
  }

  update = (text) =>{
    this.setState({
      value:text
    });
    this.props.save(this.state.indexQuestion, text);
  }

  render() {
    return (
      <Container>
        <Item floatingLabel>
          <Label>{this.props.label}</Label>
          <Input style={{flex:1}} value={this.state.value} onChangeText={(text) => { this.update(text); }}/>
        </Item>
      </Container>
    );
  }
}
