import React, { Component } from 'react';
import { Container, Content, ListItem, Text, Radio, Right, Left, List } from 'native-base';

export default class RadioButton extends Component {
  constructor(props){
    super(props);
    this.state = {
      itemSelected: props.selected,
      index: props.index
    }
  }

  componentWillReceiveProps(nextProp){
    this.setState({
      itemSelected: nextProp.selected,
    });
  }

  update = () => {
    this.state.itemSelected = this.state.index;
    this.props.updateState(this.state.index);
  };

  render() {
    return (
      <ListItem>
        <Left><Text>{this.props.text}</Text></Left>
        <Right><Radio onPress={() => this.update()} onLongPress={() => this.update()} selected={this.state.itemSelected == this.state.index}/></Right>
      </ListItem>
    );
  }
}
