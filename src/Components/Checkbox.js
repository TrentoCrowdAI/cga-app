import React, { Component } from 'react';
import { ListItem, CheckBox, Text, Left, Right } from 'native-base';

export default class Checkbox extends Component {
  constructor(props){
    super(props);
    this.state = {
      itemSelected: this.props.checked,
      index: this.props.index
    }
  }

  update = () => { //function in order to update this state and the relative state in the main component
    this.setState({
      itemSelected: !this.state.itemSelected
    });
    this.props.updateState(this.state.index, !this.state.itemSelected);
  };

  render() {
    return (
      <ListItem>
        <Left><Text>{this.props.text}</Text></Left>
        <Right><CheckBox onPress={() => this.update()} onLongPress={() => this.update()} checked={this.state.itemSelected}/></Right>
      </ListItem>
    );
  }
}
