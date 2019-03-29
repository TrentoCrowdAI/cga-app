import React from 'react';
import { StyleSheet, Text, View  } from 'react-native';

function loadData(){
  return fetch("https://cga-mock-server.herokuapp.com/v1/surveys", {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  });
}

export default class RetrieveData extends React.Component {
  render(){
    return(
      <View style={styles.rootContainer}>
        <Text>{JSON.stringify(loadData())}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1
  }
});
