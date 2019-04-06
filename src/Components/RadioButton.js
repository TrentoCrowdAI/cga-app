import React, { Component } from 'react';
import { ListItem, Text, Radio, Right, Left } from 'native-base';

export default class RadioButton extends Component {
  constructor(props){
    super(props);
    this.state = {
      itemSelected: props.selected,
      index: props.index
    }
  }

  componentWillReceiveProps(nextProp){ //when this componente receive an update props it update his state
    this.setState({
      itemSelected: nextProp.selected,
    });
  }

  update = () => { //function in order to update this state and the relative state in the main component
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
