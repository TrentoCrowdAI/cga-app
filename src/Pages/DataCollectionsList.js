import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import {Container, Content, Footer, List, Title, Text } from 'native-base';
import DataCollectionCard from '../Components/DataCollectionCard.js';

export default class DataCollectionsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      update: false,
      projectId: props.navigation.state.params.projectId,
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
        <DataCollectionCard key={index} enableDataCollectionUpdate={this.enableDataCollectionUpdate} id={dataCollection.id} title={dataCollection.name} description={dataCollection.description} navigation={this.state.navigation}/>
      );
    });
  }

  enableDataCollectionUpdate = () => {
    this.setState({update:true});
  }

  componentDidMount() {
    this.subs = [
      this.props.navigation.addListener('willFocus', () => {  //when the user return to the page, the app will update the datacollection list
        if(this.state.update == true){
          fetch('https://cga-api.herokuapp.com/projects/'+this.state.projectId+'/dataCollections', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Cookie': "express:sess=" + this.state.navigation.state.params.user.expressSessionCookie + '; express:sess.sig=' + this.state.navigation.state.params.user.expressSessionSignatureCookie + ';',
            },
          }).then((response) => response.json())
          .then((responseJson) => {
            //console.log(responseJson);
            this.setState({update:false, data: responseJson});
            this.forceUpdate();
          });
        }
      })
    ];
  }

  componentWillUnmount() {
    this.subs.forEach((sub) => {
      sub.remove();
    });
  }

  render() {
    if(this.state.data != null && this.state.data.length > 0){
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
    }else{
      return (
        <Container><Title><Text>We're sorry but for this project there aren't any data collection. Try later.</Text></Title></Container>
      );
    }
  }
}

const styles = StyleSheet.create({
  
});
