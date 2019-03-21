import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

class Timer extends Component {
  render() {
    return (
      <View style={styles.rootContainer}>
        <Text>00:00</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    borderBottomWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center'
  }
});


export default Timer;
