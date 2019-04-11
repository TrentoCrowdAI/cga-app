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

  componentWillReceiveProps(nextProp){ //in order to fix an error when this component receive an update of the props param it set the image viewer to invisible
    this.setState({                   //in this particular case this fix the error in which the question isn't updated when the next question has the same typology of the showed question
      indexQuestion: nextProp.indexQuestion,
      value: ""
    });
    if(nextProp.saved != undefined){
      this.setState({
        value: nextProp.saved
      });
    }
  }

  update = (text) =>{//function in order to update this state and the relative state in the main component
    this.setState({
      value:text
    });
    this.props.save(this.state.indexQuestion, text);
  }

  render() {
    return (
      <Container>
        <Item regular>
          <Label>{this.props.label}</Label>
          <Input style={{flex:1}} placeholder={this.props.placeholder} value={this.state.value} onChangeText={(text) => { this.update(text); }}/>
        </Item>
      </Container>
    );
  }
}
