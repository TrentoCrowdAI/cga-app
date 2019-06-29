import React, { Component } from 'react';
import { Input, Item, Label, Form } from 'native-base';

export default class Textbox extends Component {
  constructor(props){
    super(props);
    
    var language = 0;
    var bool = false;
    for(language = 0; language < this.props.labels.length; language++){//searching the language between the proposed
      if(this.props.labels[language].language.toLowerCase() == this.props.language){
        bool = true;
        break;
      }
    }
    if(bool == false){//if the selected language isn't present, using english
      for(language = 0; language < this.props.labels.length; language++){//searching the language between the proposed
        if(this.props.labels[language].language.toLowerCase() == 'english'){
          break;
        }
      }
    }

    this.state = {
      labels: this.props.labels,
      indexQuestion: props.indexQuestion,
      value: "",
      secureTextEntry: this.props.secureTextEntry,
      language: this.props.language,
      label: this.props.labels[language].content
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
      <Form style={{alignSelf: 'stretch'}}>
        <Item regular>
          <Label>{this.state.label}</Label>
          <Input placeholder={this.props.placeholder} value={this.state.value} onChangeText={(text) => { this.update(text); }} secureTextEntry={this.state.secureTextEntry}/>
        </Item>      
      </Form>
    );
  }
}
