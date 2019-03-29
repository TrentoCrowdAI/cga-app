import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

export default class Question extends Component {
  render() {
    return (
      <View style={styles.rootContainer}>
        <View style={styles.questionContainer}>
          <Text></Text>
        </View>
        <View style={styles.answerContainer}>
          <Text></Text>
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
  questionContainer: {
    flex: 1
  },
  answerContainer: {
    flex: 1
  }

});
