import React, { Component } from 'react';
import { Container, Text, Card, CardItem, Body, Icon } from 'native-base';

export default class Guide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldProfessionalModeState: props.navigation.state.params.oldProfessionalModeState,
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
      headerLeft:(<Button transparent onPress = {() => (navigation.replace('ProfessionalMode', {oldProfessionalModeState: navigation.state.params.oldProfessionalModeState}))}><Icon name='arrowleft' style={{color:"white"}} /></Button>)
    };
  };

  render() {
    return (
      <Container style={{flex: 1}}>
        <Card>
          <CardItem>
            <Body>
              <Text>Text (Insert the data and press next)</Text>
              <Text>Multiple Choise (Select at most one option and click next)</Text>
              <Text>Single Choise (Select at least one option and click next)</Text>
              <Text>If you need to skip the question tap the 3 dot button on the main bar and tap "skip question" option, after the app will show you an alert, compile it and now you can skip the question.</Text>
              <Text>If you need to pass to handover mode tap the 3 dot button and tap on "handover mode", now you can pass the phone to you patient.</Text>
            </Body>
          </CardItem>
        </Card>
      </Container>
    );
  }
}
