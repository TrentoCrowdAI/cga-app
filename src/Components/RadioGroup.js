import React, { Component } from 'react';
import { List, Form } from 'native-base';
import RadioButton from "./RadioButton";

export default class RadioGroup extends Component {
  constructor(props) {
    super(props);

    var language = 0;
    var bool = false;
    var language = 0;
    for(language = 0; language < this.props.options[0].labels.length; language++){//searching the language between the proposed
      if(this.props.options[0].labels[language].language.toLowerCase() == this.props.language){
        bool = true;
        break;
      }
    }
    if(bool == false){//if the selected language isn't present, using english
      for(language = 0; language < this.props.options[0].labels.length; language++){//searching the language between the proposed
        if(this.props.options[0].labels[language].language.toLowerCase() == 'english'){
          bool = true;
          break;
        }
      }
    }

    

    this.state = {
      options: props.options,
      indexQuestion: props.indexQuestion,
      itemSelected: "0",
      language: this.props.language,
      languageIndex: language
    }
    if(props.saved != undefined){
      this.state.itemSelected = props.saved;
    }
    this.props.save(this.state.indexQuestion, this.state.itemSelected);
  }

  componentWillReceiveProps(nextProp){ //in order to fix an error when this component receive an update of the props param it set the image viewer to invisible
    this.setState({                   //in this particular case this fix the error in which the question isn't updated when the next question has the same typology of the showed question
      indexQuestion: nextProp.indexQuestion,
      itemSelected: "0"
    });
    this.props.save(nextProp.indexQuestion, "0");
    if(nextProp.saved != undefined){
      this.setState({
        itemSelected: nextProp.saved
      });
      this.props.save(nextProp.indexQuestion, nextProp.saved);
    }
  }

  updateState = (val) => { //function in order to update this state and the relative state in the main component
    this.setState({
      itemSelected: val
    });
    this.props.save(this.state.indexQuestion, val);
  };

  renderList(initialArr) { //this function prepare the list of radiobutton in order to add them in one time
    return initialArr.map((options, index) => {
      return (
        <RadioButton key={index} text={options.labels[this.state.languageIndex].content} updateState={this.updateState} selected={this.state.itemSelected} index={"" + index} />
      );
    });
  }

  render() {
    return (
      <Form style={{alignSelf: 'stretch'}}>
        <List>
          {this.renderList(this.state.options)}
        </List>
      </Form>
    );
  }
}
