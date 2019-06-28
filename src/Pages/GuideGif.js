import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Container, Text, Card, CardItem, Body, List, Content, Title } from 'native-base';

export default class Guide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.navigation.state.params.title,
      text: this.props.navigation.state.params.text,
      path: this.props.navigation.state.params.path
    }
  }

  static navigationOptions = ({ navigation }) => { //this function prepare the header of the activity
    return {
      title: "Guide",
      //Default Title of ActionBar
      headerStyle: {
        backgroundColor: navigation.getParam('BackgroundColor', '#EF233C'),
        //Background color of ActionBar
      },
      //Text color of ActionBar
      headerTintColor: navigation.getParam('HeaderTintColor', '#fff'),
    };
  };

  render() {
    return (
      <Container style={{flex: 1}}>
        <Content>
          <List>   
            <Card>
              <CardItem>
                <Body>
                  <Title><Text style={styles.titleText}>{this.state.title}</Text></Title>
                  <Text>{this.state.text}</Text>
                  <Image source={this.state.path} style={{width: 500, height: 800 }}/>
                </Body>
              </CardItem>
            </Card>
          </List>
        </Content>
      </Container>
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