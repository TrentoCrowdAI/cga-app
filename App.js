import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import MainUI from "./src/MainUI";

export default class App extends Component {
  render() {
    return (
      <View style={styles.rootContainer}>
        <MainUI />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    flexDirection: 'column'
  }
});
