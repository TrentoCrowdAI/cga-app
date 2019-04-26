import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Title, Text, Button, Icon, Right, Card, CardItem, Body, Form, Item } from 'native-base';
import MyPicker from '../Components/MyPicker.js';
import Textbox from '../Components/Textbox.js';

export default class SkipQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: [
          {
            label:	"The patient refuse to answer",
            key: "tired"
          },
          {
            label:	"The patient doesn't know the answer",
            key: "know"
          }
      ],
      savedData: {},
      indexQuestion: this.props.navigation.state.params.indexQuestion
    }
  }

  static navigationOptions = ({ navigation }) => { //this function prepare the header of the activity
    return {
      title: "Skip Question",
      //Default Title of ActionBar
      headerStyle: {
        backgroundColor: navigation.getParam('BackgroundColor', '#EF233C'),
        //Background color of ActionBar
      },
      headerTintColor: navigation.getParam('HeaderTintColor', '#fff'),
      //Text color of ActionBar
    };
  };

  saveValue = (index, value) => { //this function allow the component to update its state
    this.state.savedData[index] = value;
  }

  returnToProfessionalMode = () => { //this question allow the component to change the activity passing some data to the professionalmode activity
    this.props.navigation.navigate("ProfessionalMode", {skipQuestion: true, savedData: {index:this.state.indexQuestion, obj:{value: 'skipped', note: this.state.savedData[0], real_value: this.state.savedData[1]}}});
  }

  render() {
    return (
      <Card>
        <CardItem header>
          <Body style={{ flex: 1,  justifyContent: 'center', alignItems: 'center' }}>
            <Form>
              <Title style={styles.title}><Text style={styles.titleText}>Why you want to skip the question??</Text></Title>
            </Form>
          </Body>
        </CardItem>
        <CardItem>
          <Body>
            <MyPicker save={this.saveValue} labels={this.state.labels} indexQuestion="1"/>
          </Body>
        </CardItem>
        <CardItem>
          <Body>
            <Textbox label="Note" placeholder="Comment your choice" save={this.saveValue} indexQuestion="0"/>
          </Body>
        </CardItem>
        <CardItem footer>
          <Right>
            <Button primary onPress={(() => this.returnToProfessionalMode())} style={styles.button}><Text>Next</Text><Icon name='arrow-forward'/></Button>
          </Right>
        </CardItem>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
    button: {
      width: 150,
      backgroundColor: '#2b2d42'
    },
    title: {
      marginTop: 24
    },
    titleText:{
      fontSize: 20,
    }
});
