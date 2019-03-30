import React, {Component} from 'react';
import {StyleSheet, View, Header} from 'react-native';
import {Container, Content} from 'native-base';
import HeaderOptions from "../Components/HeaderOptions.js";
import NavigatorQuestion from "../Components/NavigatorQuestion.js";

export default class App extends Component {
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
                    id:	12,
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
                    id:	13,
                    description: "Occupational History - 'Main reason for working",
                    labels:	[
                        {
                            id:	1,
                            language: "English",
                            content:	"What would be the main reason you are currently working?"
                        },
                        {
                            id:	2,
                            language: "Italian",
                            content:	"Per quale ragione sta ancora lavorando?"
                        }
                    ],
                    type :  "MultipleChoise",
                    options:[
                        {
                            id:	1,
                            value: "need_money",
                            labels:	[
                                {
                                    id:	1,
                                    language: "English",
                                    content:	"Need the money"
                                },
                                {
                                    id:	2,
                                    language: "Italian",
                                    content:	"Bisogno del denaro"
                                }
                            ],
                            type: "selectItem"
                        },
                        {
                            id:	2,
                            value: "more_active",
                            labels:	[
                                {
                                    id:	3,
                                    language: "English",
                                    content:	"Want to be more active"
                                },
                                {
                                    id:	4,
                                    language: "Italian",
                                    content:	"Bisonogo di essere in attivita"
                                }
                            ],
                            type: "selectItem"
                        },
                        {
                            id:	2,
                            value: "other",
                            labels:	[
                                {
                                    id:	3,
                                    language: "English",
                                    content:	"Other activity"
                                },
                                {
                                    id:	4,
                                    language: "Italian",
                                    content:	"Un’altra attivita"
                                }
                            ],
                            type: "selectItemOther"
                        }
                    ],
                    rules: [],
                    flowConstraints:
                    [
                        {
                            id: 1,
                            type: "next_question",
                            condition: "",
                            value: 20
                        }
                    ],
                }
            ],
        }
    }
  }

  render() {
    return (
      <Container style={{flexDirection: 'column'}}>
        <Container style={{flex: 1}}>
          <HeaderOptions title={this.state.example.name}/>
        </Container>
        <Container style={{flex: 2}}>
          <NavigatorQuestion example={this.state.example} />
        </Container>
      </Container>
    );
  }
}
