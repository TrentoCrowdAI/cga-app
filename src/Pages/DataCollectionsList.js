import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import {Container, Content, Header, Footer, List } from 'native-base';
import DataCollectionCard from '../Components/DataCollectionCard.js';

export default class DataCollectionsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{name:"Manila field data collection", description:"On the field data collection in Manila"},{name:"Data collection in hospital", description:"Ambulatory data collection"},{name:"ex data collection 3", description:"descr3"},
              {name:"ex data collection 4", description:"descr4"},{name:"ex data collection 5", description:"descr5"},{name:"ex data collection 6", description:"descr6"}],
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
        <DataCollectionCard key={index} title={dataCollection.name} description={dataCollection.description}/>
      );
    });
  }

  render() {
    return (
      <Container>
        <Header androidStatusBarColor="#b70e23"  style={{ backgroundColor: 'white' }} />
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
