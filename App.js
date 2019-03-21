import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import NavigatorButton from "./src/NavigatorButton";
import MyTimer from "./src/MyTimer";
import Question from "./src/Question"

export default class App extends Component {
  render() {
    return (
      <View style={styles.rootContainer}>
        <View style={styles.timerContainer}>
          <MyTimer />
        </View>
        <View style={styles.questionContainer}>
          <Question />
        </View>
        <View style={styles.navigatorButtonContainer}>
          <NavigatorButton />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  timerContainer: {
    flex: 1,
  },
  questionContainer: {
    flex: 5
  },
  navigatorButtonContainer: {
    flex: 1
  }
});
