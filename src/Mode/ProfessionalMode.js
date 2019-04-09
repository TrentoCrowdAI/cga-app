import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import { Container, Text, Button, Left, Right, Icon } from 'native-base';
import Question from "../Components/Question.js";
import MyTimer from "../Components/MyTimer.js";

/*
getdata fetch body
body: JSON.stringify({
  firstParam: 'yourValue',
  secondParam: 'yourOtherValue',
})
*/
export default class ProfessionalMode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      example:   {
            id:	1,
            name:	"Demographics",
            items:	[
                {
                    id:	0,
                    description: "Name Surname question",
                    labels:	[
                        {
                            id:	1,
                            language: "English",
                            content:	"What's your name??"
                        },
                        {
                            id:	2,
                            language: "Italian",
                            content:	"Qual'è il suo nome??"
                        }
                    ],
                    type: "inputText",
                    options:[
                              {
                                  id:	1,
                                  language: "English",
                                  content:	"Name"
                              },
                              {
                                  id:	2,
                                  language: "Italian",
                                  content:	"Nome"
                              }
                    ],
                    rules: [],
                    validators: [],
                    flowConstraints: [
                        {
                          id: 1,
                          typology: "next_question",
                          condition: "",
                          value: 2
                        }
                    ],
                },
                {
                    id:	2,
                    description: "Gender/Sex question",
                    labels:	[
                        {
                          id:	1,
                          language: "English",
                          content:	"What is your Gender/Sex?"
                        },
                        {
                          id:	2,
                          language: "Italian",
                          content:	"Qual'è il suo Genere/Sesso?"
                        }
                    ],
                    type: "SingleChoise",
                    options:[
                        {
                            id:	1,
                            value: "men",
                            labels:	[
                                {
                                    id:	1,
                                    language: "English",
                                    content:	"Men"
                                },
                                {
                                    id:	2,
                                    language: "Italian",
                                    content:	"Uomo"
                                }
                            ],
                            type: "selectItem"
                        },
                        {
                            id:	2,
                            value: "woman",
                            labels:	[
                                {
                                    id:	3,
                                    language: "English",
                                    content:	"Women"
                                },
                                {
                                    id:	4,
                                    language: "Italian",
                                    content:	"Donna"
                                }
                            ],
                            type: "selectItem"
                        },
                        {
                            id:	2,
                            value: "n",
                            labels:	[
                                {
                                    id:	3,
                                    language: "English",
                                    content:	"N"
                                },
                                {
                                    id:	4,
                                    language: "Italian",
                                    content:	"N"
                                }
                            ],
                           type: "selectItem"
                       }
                    ],
                    rules: [],
                    validators: [],
                    flowConstraints: [
                        {
                          id: 1,
                          typology: "next_question",
                          condition: "",
                          value: 3
                        }
                    ]
                },
                {
                    id: 3,
                    description: "Address question",
                    labels:	[
                        {
                            id:	3,
                            language: "English",
                            content:	"What's your home address??"
                        },
                        {
                            id:	2,
                            language: "Italian",
                            content:	"Qual'è il suo indirizzo di casa??"
                        }
                    ],
                    type: "inputText",
                    options:[
                      {
                          id:	1,
                          language: "English",
                          content:	"Address"
                      },
                      {
                          id:	2,
                          language: "Italian",
                          content:	"Indirizzo"
                      }
                    ],
                    rules: [],
                    validators: [],
                    flowConstraints: [
                        {
                          id: 1,
                          typology: "next_question",
                          condition: "",
                          value: 10
                        }
                    ]
                },
                {
                    id:	10,
                    description: "Occupational History - 'Has the interviewed ever work' question",
                    labels:	[
                        {
                          id:	1,
                          language: "English",
                          content:	"Have you ever done any type of work where you were paid in cash or in kind (excluding house work)??"
                        },
                        {
                          id:	2,
                          language: "Italian",
                          content:	"Ha mai svolto un lavoro in cui veniva pagato con soldi o simili??"
                        }
                    ],
                    type: "SingleChoise",
                    options:[
                        {
                            id:	1,
                            value: "have_worked",
                            labels:	[
                                {
                                    id:	1,
                                    language: "English",
                                    content:	"Yes"
                                },
                                {
                                    id:	2,
                                    language: "Italian",
                                    content:	"Si"
                                }
                            ],
                            type: "selectItem"
                        },
                        {
                            id:	2,
                            value: "have_never_worked",
                            labels:	[
                                {
                                    id:	3,
                                    language: "English",
                                    content:	"No"
                                },
                                {
                                    id:	4,
                                    language: "Italian",
                                    content:	"No"
                                }
                            ],
                            type: "selectItem"
                        }
                    ],
                    rules: [],
                    validators: [],
                    flowConstraints: [
                        {
                            id: 1,
                            type: "next_question",
                            condition: "answer == 'have_worked'",
                            value: 12
                        },
                        {
                            id: 2,
                            type: "next_question",
                            condition: "",
                            value: 20
                        }
                    ],
                },
                {
                    id:	11,
                    description: "Occupational History - 'Which work",
                    labels:	[
                        {
                            id:	1,
                            language: "English",
                            content:	"What was your work?"
                        },
                        {
                            id:	2,
                            language: "Italian",
                            content:	"Qual'era il suo lavoro?"
                        }
                    ],
                    type: "MultipleChoise",
                    options:[
                        {
                            id:	1,
                            value: "work_agriculture",
                            labels:	[
                                {
                                    id:	1,
                                    language: "English",
                                    content:	"Agriculture"
                                },
                                {
                                    id:	2,
                                    language: "Italian",
                                    content:	"Agricoltura"
                                }
                            ],
                            type: "selectItem"
                        },
                        {
                            id:	2,
                            value: "work_arts_entratainement",
                            labels:	[
                                {
                                    id:	3,
                                    language: "English",
                                    content:	"Arts/Entratainement"
                                },
                                {
                                    id:	4,
                                    language: "Italian",
                                    content:	"Arte/Intrattenimento"
                                }
                            ],
                            type: "selectItem"
                        },
                        {
                            id:	2,
                            value: "work_computer",
                            labels:	[
                                {
                                    id:	3,
                                    language: "English",
                                    content:	"Computer"
                                },
                                {
                                    id:	4,
                                    language: "Italian",
                                    content:	"Computer"
                                }
                            ],
                           type: "selectItem"
                       }
                    ],
                    rules: [],
                    validators: [],
                    flowConstraints: [
                        {
                            id: 1,
                            type: "next_question",
                            condition: "",
                            value: 13
                        }
                    ]
                },
                {
                    id:	12,
                    description: "'Has the interviewed diabets' question",
                    labels:	[
                        {
                          id:	1,
                          language: "English",
                          content:	"Do you have diabetes?"
                        },
                        {
                          id:	2,
                          language: "Italian",
                          content:	"Ha il diabete??"
                        }
                    ],
                    type: "SingleChoise",
                    options:[
                        {
                            id:	1,
                            value: "have_diabets",
                            labels:	[
                                {
                                    id:	1,
                                    language: "English",
                                    content:	"Yes"
                                },
                                {
                                    id:	2,
                                    language: "Italian",
                                    content:	"Si"
                                }
                            ],
                            type: "selectItem"
                        },
                        {
                            id:	2,
                            value: "havenot_diabet",
                            labels:	[
                                {
                                    id:	3,
                                    language: "English",
                                    content:	"No"
                                },
                                {
                                    id:	4,
                                    language: "Italian",
                                    content:	"No"
                                }
                            ],
                            type: "selectItem"
                        }
                    ],
                    rules: [],
                    validators: [],
                    flowConstraints: [
                        {
                            id: 2,
                            type: "next_question",
                            condition: "",
                            value: 13
                        }
                    ],
                },
                {
                    id:	13,
                    description: "Take any of these medicine",
                    labels:	[
                        {
                            id:	1,
                            language: "English",
                            content:	"Do you take one of these medicines?"
                        },
                        {
                            id:	2,
                            language: "Italian",
                            content:	"Prende una di queste medicine?"
                        }
                    ],
                    type: "MultipleChoise",
                    options:[
                        {
                            id:	1,
                            value: "diabets_1",
                            labels:	[
                                {
                                    id:	1,
                                    language: "English",
                                    content:	"Metformin"
                                },
                                {
                                    id:	2,
                                    language: "Italian",
                                    content:	"Metformin"
                                }
                            ],
                            type: "selectItem"
                        },
                        {
                            id:	2,
                            value: "cholesterol",
                            labels:	[
                                {
                                    id:	3,
                                    language: "English",
                                    content:	"ArmoLipid PLUS"
                                },
                                {
                                    id:	4,
                                    language: "Italian",
                                    content:	"ArmoLipid PLUS"
                                }
                            ],
                            type: "selectItem"
                        },
                        {
                            id:	2,
                            value: "cholesterol",
                            labels:	[
                                {
                                    id:	3,
                                    language: "English",
                                    content:	"Eufortyn"
                                },
                                {
                                    id:	4,
                                    language: "Italian",
                                    content:	"Eufortyn"
                                }
                            ],
                           type: "selectItem"
                       }
                    ],
                    images: [{path:"https://drive.google.com/uc?id=1RWl8fYGRt-zftD3GKAQlnJJV25THyejO", title:"Metformin"}, {path:"https://drive.google.com/uc?id=15FSa83I8GAnkuNenR-G0rRvrEhlwOUUA", title:"ArmoPlus"}, {path:"https://drive.google.com/uc?id=1TJ4p__S1aKADIYitsIFEkj_coapNfn1A", title:"Euforyn"}],
                    rules: [],
                    validators: [],
                    flowConstraints: [
                        {
                            id: 1,
                            type: "next_question",
                            condition: "",
                            value: 13
                        }
                    ]
                },
            ],
        },
      indexQuestion: 0,
      questionObj: {},
      savedData: {}
    };
    this.state.questionObj = this.state.example.items[this.state.indexQuestion];
    this.props.navigation.setParams({ Title: this.state.example.name });
    this.props.navigation.setParams({indexQuestion: this.state.indexQuestion, questionObj: this.state.questionObj, savedData: this.state.savedData}); //setting the first params that will be passed to ModalMenu
  }

  static navigationOptions = ({ navigation }) => { //this function prepare the header of the activity
    const params = navigation.state.params || {};

    return {
      title: navigation.getParam('Title', 'Default Title'),
      //Default Title of ActionBar
      headerStyle: {
        backgroundColor: navigation.getParam('BackgroundColor', '#EF233C'),
        //Background color of ActionBar
      },
      headerTintColor: navigation.getParam('HeaderTintColor', '#fff'),
      //Text color of ActionBar
      headerRight: (
        <Button transparent onPress={() => navigation.navigate('ModalMenu', {indexQuestion: navigation.state.params.indexQuestion, questionObj: navigation.state.params.questionObj, savedData: navigation.state.params.savedData})}><Text /><Icon name='more' style={{color:"white"}} /></Button> //this button prepare the datas that will be passed to ModalMenu
      )
    };
  };

  //this two functions change and save the question datas when the user tap on next/previous
  nextQuestion = () => {
    if(this.state.indexQuestion == (this.state.example.items.length)-1){
      alert("unable to proceed inconsistence found");
    }
    if(this.state.indexQuestion <= (this.state.example.items.length)-2){
      this.setState({
        indexQuestion: this.state.indexQuestion + 1,
        questionObj: this.state.example.items[this.state.indexQuestion + 1],
      });
      this.props.navigation.setParams({indexQuestion: this.state.indexQuestion + 1, questionObj: this.state.example.items[this.state.indexQuestion + 1], savedData: this.state.savedData});//every time that the question change the function set the data for the ModalMenu
    }
  }

  prevQuestion = () => {
    if(this.state.indexQuestion > 0){
      this.setState({
        indexQuestion: this.state.indexQuestion - 1,
        questionObj: this.state.example.items[this.state.indexQuestion - 1]
      });
      this.props.navigation.setParams({indexQuestion: this.state.indexQuestion - 1, questionObj: this.state.example.items[this.state.indexQuestion - 1], savedData: this.state.savedData});//every time that the question change the function set the data for the ModalMenu
    }
  }

  saveValue = (index, value) => { //this function allow the component to update its state
    this.state.savedData[index] = value;
  }

  componentWillReceiveProps(nextProp){ //when the component receive an updated props it update his state
    if(nextProp.navigation.state.params.skipQuestion == true && nextProp.navigation.state.params.savedData != undefined){ //N.B.: Decide on what to do with savedData object returned by the Page SkipQuestion.js
      nextProp.navigation.state.params.skipQuestion = false;
      this.nextQuestion();
    }else if(nextProp.navigation.state.params.handoverMode == true && nextProp.navigation.state.params.savedData != undefined){ //it save the data passed from the HandoverMode.js
      nextProp.navigation.state.params.handoverMode = false;
      this.setState({
        savedData: nextProp.navigation.state.params.savedData,
      });
      this.nextQuestion();
    }
  }

  render() {
    return (
      <Container style={{flex: 1, flexDirection: "column"}}>
        <Container style={{flex: 0.1}}>
          <MyTimer />
        </Container>
        <Container style={{flex: 2}}>
          <Question data={this.state.questionObj} save={this.saveValue} indexQuestion={this.state.indexQuestion} saved={this.state.savedData[this.state.indexQuestion]}/>
        </Container>
        <Container style={{flex: 1}}>
          <Container style={{flexDirection: 'row'}}>
            <Left><Button onPress={() => this.prevQuestion()} style={styles.button}><Icon name='arrow-back'/><Text>Previous</Text></Button></Left>
            <Right><Button onPress={() => this.nextQuestion()} style={styles.button}><Text>Next</Text><Icon name='arrow-forward'/></Button></Right>
          </Container>
        </Container>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    button: {
      width:150,
      backgroundColor: '#2b2d42'
    }
});
