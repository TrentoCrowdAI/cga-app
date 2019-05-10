import React, {Component} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';

export default class SideMenuIcon extends Component { 
  toggleDrawer = () => {
    console.log(this.props.navigationProps);
    this.props.navigationProps.toggleDrawer();
  }
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)} >
          <Image
            source={require('../Images/menu_icon.png')}
            style={{ width: 25, height: 25, marginLeft: 5 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}