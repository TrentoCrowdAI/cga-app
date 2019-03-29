import React, {Component} from 'react';
import {StyleSheet, View, Header} from 'react-native';
import RadioGroup from "./src/Components/RadioGroup.js";
import CheckboxGroup from "./src/Components/CheckboxGroup.js"
import Textbox from "./src/Components/Textbox.js";

export default class App extends Component {
  render() {
    labels = ["prova 1", "prova 2", "prova 3","prova 4", "prova 5", "prova 6"]
    return (
      <View style={styles.rootContainer}>
        <CheckboxGroup labels={labels} />
        <RadioGroup labels={labels} />
        <Textbox label="Name"/>
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
