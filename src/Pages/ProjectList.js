import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import {Container, Content, Header, Footer, List } from 'native-base';
import ProjectCard from '../Components/ProjectCard.js';

export default class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{name:"CGA Philippines", description:"CGA data collections in the Philippines"},{name:"Cognitive Chatbot study", description:"Data collection for the users studies for the chatbot"},{name:"ex3", description:"descr3"},
              {name:"ex4", description:"descr4"},{name:"ex5", description:"descr5"},{name:"ex6", description:"descr6"}],
    };
  }

  static navigationOptions = ({ navigation }) => { //this function prepare the header of the activity
    return {
      title: "Project List",
      //Default Title of ActionBar
      headerStyle: {
        backgroundColor: navigation.getParam('BackgroundColor', '#EF233C'),
        //Background color of ActionBar
      },
      headerTintColor: navigation.getParam('HeaderTintColor', '#fff'),
      //Text color of ActionBar
    };
  };    

  renderProjectsList = (projects) => {
    return projects.map((project, index) => {
      return (
        <ProjectCard key={index} title={project.name} description={project.description}/>
      );
    });
  }

  render() {
    return (
      <Container>
        <Header androidStatusBarColor="#b70e23"  style={{ backgroundColor: 'white' }} />
        <Content style={{ backgroundColor: 'white' }}>
          <List>
            {this.renderProjectsList(this.state.data)}
          </List>
        </Content>
        <Footer  style={{ backgroundColor: 'white' }} />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  
});
