import React, { Component } from 'react';
import { Container, Content, ListItem, Text, Radio, Right, Left, List, CheckBox} from 'native-base';
import Checkbox from "./Checkbox";

export default class CheckboxGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemSelected: {},
    }
  }

  update = (index, val) => {
    this.state.itemSelected[index] = val;
  };

  renderList(initialArr) {
    return initialArr.map((label, index) => {
      this.state.itemSelected[index] = false;
      return (
        <Checkbox key={index} text={label} updateState={this.update} checked={this.state.itemSelected[index]}/>
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
