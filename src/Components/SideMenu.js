import React, { Component } from "react";
import { Text, View } from "react-native";
import { Button, Icon } from "native-base";
import Menu, { MenuItem, Position } from "react-native-enhanced-popup-menu";

export default class SideMenu extends Component{
  render(){
    let textRef = React.createRef();
    let menuRef = null;

    const setMenuRef = ref => menuRef = ref;
    const hideMenu = () => menuRef.hide();
    const showMenu = () => menuRef.show(textRef.current, stickTo = Position.TOP_RIGHT);

    const onPress = () => showMenu();

    return (
      <View>
        <Button transparent onPress={onPress}>
          <Text ref={textRef} />
          <Icon name='more' />
        </Button>
        <Menu ref={setMenuRef}>
          <MenuItem onPress={hideMenu}>Handover</MenuItem>
          <MenuItem onPress={hideMenu}>Skip</MenuItem>
          <MenuItem onPress={hideMenu}>Guide</MenuItem>
        </Menu>
      </View>
    );
  }
}
