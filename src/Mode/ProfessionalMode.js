import React, {Component} from 'react';
import {StyleSheet, View, Header } from 'react-native';
import {Container, Content, Picker, Item, Text, Icon, Button, Left, Right} from 'native-base';
import Question from "../Components/Question.js";

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
                    images: ["../Images/Metformin.jpg", "../Images/ArmoPlus.jpg", "../Images/Euforyn.jpg"],
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
    this.props.navigation.setParams({indexQuestion: this.state.indexQuestion, questionObj: this.state.questionObj, savedData: this.state.savedData});
  }

  nextQuestion = () => {
    if(this.state.indexQuestion < (this.state.example.items.length)-1){
      this.setState({
        indexQuestion: this.state.indexQuestion + 1,
        questionObj: this.state.example.items[this.state.indexQuestion + 1],
      });
      this.props.navigation.setParams({indexQuestion: this.state.indexQuestion + 1, questionObj: this.state.example.items[this.state.indexQuestion + 1], savedData: this.state.savedData});
    }
  }

  prevQuestion = () => {
    if(this.state.indexQuestion > 0){
      this.setState({
        indexQuestion: this.state.indexQuestion - 1,
        questionObj: this.state.example.items[this.state.indexQuestion - 1]
      });
      this.props.navigation.setParams({indexQuestion: this.state.indexQuestion - 1, questionObj: this.state.example.items[this.state.indexQuestion - 1], savedData: this.state.savedData});
    }
  }

  saveValue = (index, value) => {
    this.state.savedData[index] = value;
  }

  static navigationOptions = ({ navigation }) => {
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
        <Button transparent onPress={() => navigation.navigate('ModalMenu', {indexQuestion: navigation.state.params.indexQuestion, questionObj: navigation.state.params.questionObj, savedData: navigation.state.params.savedData})}><Text /><Icon name='more' /></Button>
      )
    };
  };

  componentWillReceiveProps(nextProp){
    if(nextProp.navigation.state.params.skipQuestion == true && nextProp.navigation.state.params.savedData != undefined){
      nextProp.navigation.state.params.skipQuestion = false;
      this.nextQuestion();
    }else if(nextProp.navigation.state.params.handoverMode == true && nextProp.navigation.state.params.savedData != undefined){
      nextProp.navigation.state.params.handoverMode = false;
      this.setState({
        savedData: nextProp.navigation.state.params.savedData,
      });
      this.nextQuestion();
    }
  }

  render() {
    return (
      <Container>
        <Container style={{flex: 1}}>
          <Question data={this.state.questionObj} save={this.saveValue} indexQuestion={this.state.indexQuestion} saved={this.state.savedData[this.state.indexQuestion]}/>
        </Container>
        <Container style={{flexDirection: 'row'}}>
          <Left>
            <Button primary onPress={() => this.prevQuestion()}><Text>Previous</Text></Button>
          </Left>
          <Right>
            <Button primary  onPress={() => this.nextQuestion()}><Text>Next</Text></Button>
          </Right>
        </Container>
      </Container>
    );
  }
}
