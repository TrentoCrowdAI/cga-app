import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Text, Card, CardItem, Body, List, Content, Title } from 'native-base';

export default class Guide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: this.props.navigation
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

  showGif = (selectedCard) => {
    switch(selectedCard){
      case "InputText":
        this.state.navigation.navigate("GuideGif", { title: "InputText", text: "Insert the data and press next", path: require('../Images/InputText.gif') });
        break;
      case "MultipleChoise":
        this.state.navigation.navigate("GuideGif", { title: "MultipleChoise", text: "Select an one option and click next", path: require('../Images/MultipleChoise.gif') });
        break;
      case "SingleChoise":
        this.state.navigation.navigate("GuideGif", { title: "SingleChoise", text: "Select at least one option and click next", path: require('../Images/SingleChoise.gif') });
        break;
      case "Skip":
        this.state.navigation.navigate("GuideGif", { title: "Skip", text: "If you need to skip the question tap ont the 'skip question' option, after the app will show you an page, compile it and now you can skip the question.", path: require('../Images/Skip.gif') });
        break;
      case "HandoverMode":
        this.state.navigation.navigate("GuideGif", { title: "HandoverMode", text: "If you need to pass to handover mode tap on 'handover mode' option, now you can pass the phone to you patient.", path: require('../Images/HandoverMode.gif') });
        break;
      case "FlashCards":
        this.state.navigation.navigate("GuideGif", { title: "FlashCards", text: "If the question has some flashcard tap on the flashcard button in order to see them.", path: require('../Images/FlashCards.gif') });
        break;
      case "StopSession":
        this.state.navigation.navigate("GuideGif", { title: "StopSession", text: "If you need to stop the session, tap on the 3 dot button in the right corner and choose the 'stop session' option.", path: require('../Images/Stop.gif') });
        break;
    }
  }

  render() {
    return (
      <Container style={{flex: 1}}>
        <Text>Select an option in order to show the gif that explain how the feature works</Text>
        <Content>
          <List>
            <Card>
              <TouchableOpacity onPress={() => this.showGif("InputText")}>
                <CardItem>
                  <Body>
                    <Title><Text>InputText</Text></Title>
                  </Body>
                </CardItem>
              </TouchableOpacity>
            </Card>
            <Card>
              <TouchableOpacity onPress={() => this.showGif("MultipleChoise")}>
                <CardItem>
                  <Body>
                    <Title><Text>MultipleChoise</Text></Title>
                  </Body>
                </CardItem>
              </TouchableOpacity>
            </Card>
            <Card>
              <TouchableOpacity onPress={() => this.showGif("SingleChoise")}>
                <CardItem>
                  <Body>
                    <Title><Text>SingleChoise</Text></Title>
                  </Body>
                </CardItem>
              </TouchableOpacity>
            </Card>
            <Card>
              <TouchableOpacity onPress={() => this.showGif("Skip")}>
                <CardItem>
                  <Body>
                    <Title><Text>Skip</Text></Title>
                  </Body>
                </CardItem>
              </TouchableOpacity>
            </Card>
            <Card>
              <TouchableOpacity onPress={() => this.showGif("HandoverMode")}>
                <CardItem>
                  <Body>
                    <Title><Text>HandoverMode</Text></Title>
                  </Body>
                </CardItem>
              </TouchableOpacity>
            </Card>
            <Card>
              <TouchableOpacity onPress={() => this.showGif("FlashCards")}>
                <CardItem>
                  <Body>
                    <Title><Text>FlashCards</Text></Title>
                  </Body>
                </CardItem>
              </TouchableOpacity>
            </Card>
            <Card>
              <TouchableOpacity onPress={() => this.showGif("Stop")}>
                <CardItem>
                  <Body>
                    <Title><Text>Stop</Text></Title>
                  </Body>
                </CardItem>
              </TouchableOpacity>
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