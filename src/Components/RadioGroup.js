import React, { Component } from 'react';
import { Container, Content, ListItem, Text, Radio, Right, Left, List } from 'native-base';
import RadioButton from "./RadioButton";

export default class RadioGroup extends Component {
  constructor() {
    super();
    this.state = {
      itemSelected: "1"
    }
  }

  updateState = (val) => {
    this.setState({
      itemSelected: val
    });
  };

  renderList(initialArr) {
    return initialArr.map((label, index) => {
      return (
        <RadioButton key={index} text={label} updateState={this.updateState} selected={this.state.itemSelected} index={"" + index} />
      );
    });
  }

  render() {
    return (
      <Container>
        <Content>
          <List>
            {this.renderList(this.props.labels)}
          </List>
        </Content>
      </Container>
    );
  }
}
