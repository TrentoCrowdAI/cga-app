import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Title, Text, Card, CardItem, Left, Body } from 'native-base';

export default class SyncCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: this.props.name,
      state: this.props.state,
      last_sync: this.props.last_sync
    };
  }

  render() {
    return (
      <Card>
        <CardItem header>
          <Body style={{ flex: 1,  justifyContent: 'center'}}>
            <Title><Text style={styles.titleText}>{this.state.name}</Text></Title>
          </Body>
        </CardItem>
        <CardItem>
          <Left><Text style={{fontSize: 20}}>State </Text><Text>{this.state.state}</Text></Left>
        </CardItem>
        <CardItem>
          <Left><Text style={{fontSize: 20}}>Last sync </Text><Text>{this.state.last_sync}</Text></Left>
        </CardItem>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  titleText:{
    fontSize: 20,
    fontWeight: 'bold',
  },
});
