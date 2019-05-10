import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import {Container, Content, Footer, List, Button, Text } from 'native-base';
import SyncCard from '../Components/SyncCard.js';

export default class SyncList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{name:"CGA Philippines", state:"not sync.", last_sync:"10/04/2019"},{name:"Cognitive Chatbot study", state:"not sync", last_sync:"15/04/2019"}],
    };
  }

  renderSyncList = (list) => {
    return list.map((element, index) => {
      return (
        <SyncCard key={index} name={element.name} state={element.state} last_sync={element.last_sync}/>
      );
    });
  }

  render() {
    return (
      <Container>
        <Content style={{ backgroundColor: 'white' }}>
          <List>
            {this.renderSyncList(this.state.data)}
          </List>
        </Content>
        <Footer style={{ backgroundColor: 'white' }} >
          <Button style={styles.button}><Text>Sync all</Text></Button>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2b2d42'
  }
});
