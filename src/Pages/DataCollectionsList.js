import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import {Container, Content, Header, Footer, List } from 'native-base';
import DataCollectionCard from '../Components/DataCollectionCard.js';

export default class DataCollectionsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      update: true,
      data: props.navigation.state.params.dataCollections,
      navigation: props.navigation.state.params.navigation
    };
  }

  static navigationOptions = ({ navigation }) => { //this function prepare the header of the activity
    return {
      title: "Data Collection",
      //Default Title of ActionBar
      headerStyle: {
        backgroundColor: navigation.getParam('BackgroundColor', '#EF233C'),
        //Background color of ActionBar
      },
      headerTintColor: navigation.getParam('HeaderTintColor', '#fff'),
      //Text color of ActionBar
    };
  };    

  renderDataCollections = (dataCollections) => {
    return dataCollections.map((dataCollection, index) => {
      return (
        <DataCollectionCard key={index} id={dataCollection.id} title={dataCollection.name} description={dataCollection.description} navigation={this.state.navigation}/>
      );
    });
  }

  render() {
    return (
      <Container>
        <Content style={{ backgroundColor: 'white' }}>
          <List>
            {this.renderDataCollections(this.state.data)}
          </List>
        </Content>
        <Footer  style={{ backgroundColor: 'white' }} />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  
});
