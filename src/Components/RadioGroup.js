import React, { Component } from 'react';
import { Container, List } from 'native-base';
import RadioButton from "./RadioButton";

export default class RadioGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indexQuestion: props.indexQuestion,
      itemSelected: "0"
    }
    if(props.saved != undefined){
      this.state.itemSelected = props.saved;
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
        <RadioButton key={index} text={options.labels[0].content} updateState={this.updateState} selected={this.state.itemSelected} index={"" + index} />
      );
    });
  }

  render() {
    return (
      <Container>
        <List>
          {this.renderList(this.props.labels)}
        </List>
      </Container>
    );
  }
}
