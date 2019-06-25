import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Text, Card, CardItem, Body, List, Content, Title } from 'native-base';

export default class Guide extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
                  <Title><Text>InputText</Text></Title>
                  <Text>Insert the data and press next</Text>
                  <Image source={require('../Images/InputText.gif')} style={{width: 500, height: 500 }} />
                </Body>
              </CardItem>
            </Card>
            <Card>
              <CardItem>
                <Body>
                  <Title><Text>MultipleChoise</Text></Title>
                  <Text>Select at most one option and click next</Text>
                  <Image source={require('../Images/MultipleChoise.gif')} style={{width: 500, height: 500 }} />
                </Body>
              </CardItem>
            </Card>
            <Card>
              <CardItem>
                <Body>
                  <Title><Text>SingleChoise</Text></Title>
                  <Text>Select at least one option and click next</Text>
                  <Image source={require('../Images/SingleChoise.gif')} style={{width: 500, height: 500 }} />
                </Body>
              </CardItem>
            </Card>
            <Card>
              <CardItem>
                <Body>
                  <Title><Text>Skip</Text></Title>  
                  <Text>If you need to skip the question tap ont the "skip question" option, after the app will show you an page, compile it and now you can skip the question.</Text>
                  <Image source={require('../Images/Skip.gif')} style={{width: 500, height: 500 }} />
                </Body>
              </CardItem>
            </Card>
            <Card>
              <CardItem>
                <Body>
                  <Title><Text>HandoverMode</Text></Title>  
                  <Text>If you need to pass to handover mode tap on "handover mode" option, now you can pass the phone to you patient.</Text>
                  <Image source={require('../Images/HandoverMode.gif')} style={{width: 500, height: 500 }}/>
                </Body>
              </CardItem>
            </Card>
            <Card>
              <CardItem>
                <Body>
                  <Title><Text>FlashCards</Text></Title>  
                  <Text>If the question has some flashcard tap on the flashcard button in order to see them.</Text>
                  <Image source={require('../Images/FlashCards.gif')} style={{width: 500, height: 500 }}/>
                </Body>
              </CardItem>
            </Card>
            <Card>
              <CardItem>
                <Body>
                  <Title><Text>StopSession</Text></Title>
                  <Text>If you need to stop the session, tap on the 3 dot button in the right corner and choose the "stop session" option.</Text>
                  <Image source={require('../Images/Stop.gif')} style={{width: 500, height: 500 }}/>
                </Body>
              </CardItem>
            </Card>
          </List>
        </Content>
      </Container>
    );
  }
}
