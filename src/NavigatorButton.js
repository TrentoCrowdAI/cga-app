import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

class NavigatorButton extends Component {
  render() {
    return (
      <View style={styles.rootContainer}>
        <View style={styles.buttonContainer}>
          <Button style={styles.button} title="Previous" />
        </View>
        <View style={styles.buttonContainer}>
          <Button style={styles.button} title="Stop" color="#ff0f0f"/>
        </View>
        <View style={styles.buttonContainer}>
          <Button style={styles.button} title="Next" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  buttonContainer: {
    flex: 1
  }
});


export default NavigatorButton;
