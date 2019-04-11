import React, { Component } from 'react';
import { Text } from 'native-base';
import { MaterialDialog } from 'react-native-material-dialog';

export default class YesNoDialog extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible: props.visible,
    }
  }

  componentWillReceiveProps(nextProp){//the dialog it's instanced but not visible when the user click on the action the props will be updated and the dialog will be show
    this.setState({ visible: nextProp.visible });
  }

  moveToEndSession = () => { //this function allow the dialog to open a new activity
    this.setState({ visible: false });
    this.props.navigation.goBack();
    this.props.navigation.navigate('StopSession');
  }

  render() {
    return (
      <MaterialDialog
        title={this.props.title}
        visible={this.state.visible}
        colorAccent="#2b2d42"
        onOk={() => this.moveToEndSession()}
        onCancel={() => this.setState({ visible: false })}>
        <Text>{this.props.text}</Text>
      </MaterialDialog>
    );
  }
}
