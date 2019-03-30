import React, {Component} from 'react';
import {StyleSheet, View, Header} from 'react-native';
import ProfessionalMode from "./src/Mode/ProfessionalMode.js"

export default class App extends Component {
  render() {
    labels = ["prova 1", "prova 2", "prova 3","prova 4", "prova 5", "prova 6"]
    return (
      <ProfessionalMode />
    );
  }
}
