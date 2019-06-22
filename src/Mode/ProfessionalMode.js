import React, {Component} from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Container, Text, Button, Left, Right, Icon, Body, Header, Content, Footer } from 'native-base';
import HandleBack from "../Components/HandleBack.js";
import QuestionCard from "../Components/QuestionCard.js";
import MyTimer from "../Components/MyTimer.js";
import QuestionPlaceholderCard from "../Components/QuestionPlaceholderCard.js";

export default class ProfessionalMode extends Component {
  constructor(props) {
    super(props);
    if(props.navigation.state.params.oldProfessionalModeState != null){
      this.state = props.navigation.state.params.oldProfessionalModeState;
    }else{
      this.state = {
        accessToken: props.navigation.state.params.accessToken,
        surveyComponentResponseId: props.navigation.state.params.surveyComponentResponseId,
        survey: props.navigation.state.params.survey,
        responses: props.navigation.state.params.responses,
        indexQuestion: 0,
        questionObj_0: undefined,
        questionObj_1: undefined,
        savedData: {},
        isLoading: true,
        language: 'english'
      };
    }

    //recover the old questions
    for(var x = 0; x < this.state.survey.items.length; x++){
      for(var i = 0; i < this.state.responses.length; i++){
        if(this.state.responses[i].survey_item_id == this.state.survey.items[x].id){
          this.state.savedData[x] = this.state.responses[i].value;
          break;
        }
      }
    }

    this.state.questionObj_0 = this.state.survey.items[this.state.indexQuestion];
    if(this.calculateSize(this.state.indexQuestion) == true){
      this.state.questionObj_1 = this.state.survey.items[this.state.indexQuestion+1];
    }
    this.props.navigation.setParams({ Title: this.state.survey.name });
    this.props.navigation.setParams({ savedData: this.state.savedData }); //setting the first params that will be passed to ModalMenu
    this.props.navigation.setParams({oldProfessionalModeState: this.state});
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
        <Button transparent onPress={() => navigation.replace('ModalMenu', {savedData: navigation.state.params.savedData, survey: navigation.state.params.survey, accessToken: navigation.state.params.accessToken, indexQuestion: navigation.state.params.indexQuestion, surveyComponentResponseId: navigation.state.params.surveyComponentResponseId, oldProfessionalModeState:navigation.state.params.oldProfessionalModeState})}><Text /><Icon name='more' style={{color:"white"}} /></Button> //this button prepare the datas that will be passed to ModalMenu
      ),
      headerLeft:(<Button transparent />)
    };
  };

  calculateSize = (i) => {//this function calculate if two questions are suitable in order to be shown together in one page in the professionalmode
    retval = false;
    treshold = 100;

    //calculate size question i 
    q1 = 0;
    var language = 0;
    for(language = 0; language < this.state.survey.items[i].labels.length; language++){//searching the language between the proposed
      if(this.state.survey.items[i].labels[language].language == this.state.language){
        break;
      }
    }
    for(x = 0; x < this.state.survey.items[i].labels[language].content.length;){//title
      q1 = q1 + 10;
      x = x+40;
    }
    q1 = q1 + this.state.survey.items[i].options.length * 10; //options
    q1 = q1 + 10; //buttons

    if(q1 <= treshold){
      //calculate size question i+1 
      q2 = 0;
      for(x = 0; x < this.state.survey.items[i+1].labels[language].content.length;){//title
        q2 = q2 + 10;
        x = x+40;
      }
      q2 = q2 + this.state.survey.items[i+1].options.length * 10; //options
      q2 = q2 + 10; //buttons

      if(q2 <= treshold){
        retval = true;
      }
    }

    return retval;
  }

  //this two functions change and save the question datas when the user tap on next/previous
  nextQuestion = () => {
    showedQuestions = 1;
    if(this.state.questionObj_1 != null){
      showedQuestions = 2;
    }
    if(!((showedQuestions == 1 && this.state.savedData[this.state.indexQuestion] != undefined)
        || (showedQuestions == 2 && this.state.savedData[this.state.indexQuestion] != undefined && this.state.savedData[this.state.indexQuestion + 1] != undefined ))){
      Alert.alert( //if the user hasn't compiled the question the app won't allow him to proceed
        'Attention',
        'Complete all the question before proceed!',
        [
          {text: 'OK'},
        ],
        {cancelable: false},
      );
    }else{
      if((this.state.indexQuestion + showedQuestions + 1) < (this.state.survey.items.length)){//check if the app can show two questions
        if(this.calculateSize(this.state.indexQuestion + showedQuestions) == false){ //checking if the two question are suitable in order to be shown togheter
          this.setState({
            indexQuestion: this.state.indexQuestion + showedQuestions,
            questionObj_0: this.state.survey.items[this.state.indexQuestion + showedQuestions],
            questionObj_1: null,
          });
        }else{
          this.setState({
            indexQuestion: this.state.indexQuestion + showedQuestions,
            questionObj_0: this.state.survey.items[this.state.indexQuestion + showedQuestions],
            questionObj_1: this.state.survey.items[this.state.indexQuestion + showedQuestions + 1],
          });
        }
      }else if((this.state.indexQuestion + showedQuestions) < (this.state.survey.items.length)){ //check if the app can show one question
        this.setState({
          indexQuestion: this.state.indexQuestion + showedQuestions,
          questionObj_0: this.state.survey.items[this.state.indexQuestion + showedQuestions],
          questionObj_1: null,
        });
      }
    }
    this.props.navigation.setParams({oldProfessionalModeState: this.state});
  }

  prevQuestion = () => {
    showedQuestions = 1;
    if(this.state.questionObj_1 != null){
      showedQuestions = 2;
    }
    if(!((showedQuestions == 1 && this.state.savedData[this.state.indexQuestion] != undefined)
        || (showedQuestions == 2 && this.state.savedData[this.state.indexQuestion] != undefined && this.state.savedData[this.state.indexQuestion + 1] != undefined ))){
      Alert.alert(//if the user hasn't compiled the question the app won't allow him to go back
        'Attention',
        'Complete all the question before come back!',
        [
          {text: 'OK', onPress: () => console.log('OK pressed')},
        ],
        {cancelable: false},
      );
    }else{
      if((this.state.indexQuestion - 2) >= 0){ //check if the app can show two questions
        if(this.calculateSize(this.state.indexQuestion - 2) == false){//checking if the two question are suitable in order to be shown togheter
          this.setState({
            indexQuestion: this.state.indexQuestion - 1,
            questionObj_0: this.state.survey.items[this.state.indexQuestion - 1],
            questionObj_1: null,
          });
        }else{
          this.setState({
            indexQuestion: this.state.indexQuestion - 2,
            questionObj_0: this.state.survey.items[this.state.indexQuestion - 2],
            questionObj_1: this.state.survey.items[this.state.indexQuestion - 1],
          });
        }
      }else if((this.state.indexQuestion - 1) >= 0){ //check if the app can show one question
        this.setState({
          indexQuestion: this.state.indexQuestion - 1,
          questionObj_0: this.state.survey.items[this.state.indexQuestion - 1],
          questionObj_1: null,
        });
      }
    }
    this.props.navigation.setParams({oldProfessionalModeState: this.state});
  }

  saveValue = (index, value) => { //this function allow the component to update its state
    this.state.savedData[index] = value;
    if(this.state.savedData[index] != value){//setting the data only if they are different from the saved one, otherwise it freeze the UI
      this.props.navigation.setParams({ savedData: this.state.savedData }); //setting the first params that will be passed to ModalMenu
    }
    this.props.navigation.setParams({oldProfessionalModeState: this.state});
  }

  //this function create an alert and if the user press yes the app will show endsession page, the app will also pass the this.state.savedData param
  showEndSessionAlert = () => {
    Alert.alert(
      'Attention',
      'Are you sure that you want end the session?',
      [
        {
          text: 'No',
        },
        {text: 'Yes', onPress: () => {  
          this.props.navigation.replace("SplashScreen", {mode:"upload", savedData: this.state.savedData, survey: this.state.survey, accessToken: this.state.accessToken, surveyComponentResponseId: this.state.surveyComponentResponseId});
        }},
      ],
      {cancelable: false},
    );
  }

  componentWillReceiveProps(nextProp){ //when the component receive an updated props it update his state
    showedQuestions = 1;
    if(this.state.questionObj_1 != null){
      showedQuestions = 2;
    }
    if(nextProp.navigation.state.params.skipQuestion == true && nextProp.navigation.state.params.savedData != undefined){ //N.B.: Decide on what to do with savedData object returned by the Page SkipQuestion.js
      nextProp.navigation.state.params.skipQuestion = false;
      this.state.savedData[nextProp.navigation.state.params.savedData.index] = nextProp.navigation.state.params.savedData.obj;//update the savedData object with the data from skipQuestion
      this.props.navigation.setParams({ savedData: this.state.savedData }); //setting the first params that will be passed to ModalMenu
      if((showedQuestions == 1 && this.state.savedData[this.state.indexQuestion] != undefined)
          || (showedQuestions == 2 && this.state.savedData[this.state.indexQuestion] != undefined && this.state.savedData[this.state.indexQuestion + 1] != undefined )){
        this.nextQuestion();//if all the question are already compiled the component will automatically proceed
      }
    }else if(nextProp.navigation.state.params.handoverMode == true && nextProp.navigation.state.params.savedData != undefined){ //it save the data passed from the HandoverMode.js
      nextProp.navigation.state.params.handoverMode = false;
      this.state.savedData[nextProp.navigation.state.params.savedData.index] = nextProp.navigation.state.params.savedData.obj;//update the savedData object with the data from handoverMode
      this.props.navigation.setParams({ savedData: this.state.savedData }); //setting the first params that will be passed to ModalMenu
      if((showedQuestions == 1 && this.state.savedData[this.state.indexQuestion] != undefined)
          || (showedQuestions == 2 && this.state.savedData[this.state.indexQuestion] != undefined && this.state.savedData[this.state.indexQuestion + 1] != undefined )){
        this.nextQuestion(); //if all the question are already compiled the component will automatically proceed
      }
    }
  } 

  render() {
    if(this.state.questionObj_1 == null){ // data to show if only one question is prepared from the backend
      return (
        <HandleBack onBack={this.onBack} navigation={this.props.navigate}>
          <Container>
            <Header androidStatusBarColor="#b70e23" style={{ backgroundColor: 'white' }}>
              <Body>
                <MyTimer />
              </Body>
            </Header>
            <Content style={{ backgroundColor: 'white' }}>
              {(this.state.savedData != undefined && this.state.savedData[this.state.indexQuestion] != undefined && this.state.savedData[this.state.indexQuestion].real_value != undefined) ? <QuestionPlaceholderCard index={this.state.indexQuestion} type={this.state.savedData[this.state.indexQuestion].value} /> : <QuestionCard data={this.state.questionObj_0} save={this.saveValue} indexQuestion={this.state.indexQuestion} saved={this.state.savedData[this.state.indexQuestion]} navigation={this.props.navigation} language={this.state.language}/>}
            </Content>
            <Footer style={{ backgroundColor: 'white' }}>
              <Left>
                {(this.state.indexQuestion == 0) ? null : <Button onPress={() => this.prevQuestion()} style={styles.button}><Icon name='arrow-back'/><Text>Previous</Text></Button>}
              </Left>
              <Right>
                {(this.state.indexQuestion == (this.state.survey.items.length-1)) ? <Button onPress={() => this.showEndSessionAlert()} style={styles.button} ><Text>End Session</Text></Button> : <Button onPress={() => this.nextQuestion()} style={styles.button}><Text>Next</Text><Icon name='arrow-forward'/></Button>}
              </Right>
            </Footer>
          </Container>
        </HandleBack>
      );
    }else{ // data to show if two questions are prepared from the backend
      return (
        <HandleBack onBack={this.onBack} navigation={this.props.navigate}>
          <Container>
            <Header androidStatusBarColor="#b70e23" style={{ backgroundColor: 'white' }}>
              <Body>
                <MyTimer />
              </Body>
            </Header>
            <Content style={{ backgroundColor: 'white' }}>
              {(this.state.savedData != undefined && this.state.savedData[this.state.indexQuestion] != undefined && this.state.savedData[this.state.indexQuestion].real_value != undefined) ? <QuestionPlaceholderCard index={this.state.indexQuestion} type={this.state.savedData[this.state.indexQuestion].value} /> : <QuestionCard data={this.state.questionObj_0} save={this.saveValue} indexQuestion={this.state.indexQuestion} saved={this.state.savedData[this.state.indexQuestion]} navigation={this.props.navigation} language={this.state.language}/>}
              {(this.state.savedData != undefined && this.state.savedData[this.state.indexQuestion+1] != undefined && this.state.savedData[this.state.indexQuestion+1].real_value != undefined) ? <QuestionPlaceholderCard index={this.state.indexQuestion+1} type={this.state.savedData[this.state.indexQuestion+1].value} /> : <QuestionCard data={this.state.questionObj_1} save={this.saveValue} indexQuestion={this.state.indexQuestion+1} saved={this.state.savedData[this.state.indexQuestion+1]} navigation={this.props.navigation} language={this.state.language} />}
            </Content>
            <Footer style={{ backgroundColor: 'white' }}>
              <Left>
                {(this.state.indexQuestion == 0) ? null : <Button onPress={() => this.prevQuestion()} style={styles.button}><Icon name='arrow-back'/><Text>Previous</Text></Button>}
              </Left>
              <Right>
                {(this.state.indexQuestion == (this.state.survey.items.length-2)) ? <Button onPress={() => this.showEndSessionAlert()} style={styles.button} ><Text>End Session</Text></Button> : <Button onPress={() => this.nextQuestion()} style={styles.button}><Text>Next</Text><Icon name='arrow-forward'/></Button>}
              </Right>
            </Footer>
          </Container>
        </HandleBack>
      );
    }
  }
}

const styles = StyleSheet.create({
    button: {
      width:150,
      backgroundColor: '#2b2d42'
    }
});
