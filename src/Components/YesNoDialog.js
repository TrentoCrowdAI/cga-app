import React, { Component } from 'react';
import { Text } from 'react-native';
import { MaterialDialog } from 'react-native-material-dialog';

export default class YesNoDialog extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible: props.visible
    }
  }

  move = () => {
    this.setState({ visible: false });
    this.props.navigation.navigate('EndSession');
  }

  render() {
    return (
      <MaterialDialog
        title={this.props.title}
        visible={this.state.visible}
        onOk={() => this.move()}
        onCancel={() => this.setState({ visible: false })}>
        <Text>{this.props.text}</Text>
      </MaterialDialog>
    );
  }
}
