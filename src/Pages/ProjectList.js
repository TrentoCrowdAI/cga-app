import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import {Container, Content, Header, Footer, List, Button, Icon } from 'native-base';
import ProjectCard from '../Components/ProjectCard.js';

export default class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.navigation.state.params.user,
      data: this.props.navigation.state.params.projects,//[{name:"CGA Philippines", description:"CGA data collections in the Philippines"},{name:"Cognitive Chatbot study", description:"Data collection for the users studies for the chatbot"}],
    };
    console.log(this.props.navigation.state.params.user);
    console.log(this.props.navigation.state.params.data);

    console.log(this.state.user);
    console.log(this.state.user);
  }

  renderProjectsList = (projects) => {
    return projects.map((project, index) => {
      return (
        <ProjectCard key={index} title={project.name} description={project.description} navigation={this.props.navigation}/>
      );
    });
  }

  render() {
    if(this.state.data.length > 0){
      return (
        <Container>
          <Content style={{ backgroundColor: 'white' }}>
            <List>
              {this.renderProjectsList(this.state.data)}
            </List>
          </Content>
          <Footer  style={{ backgroundColor: 'white' }} />
        </Container>
      );
    }else{
      <Container><Title>We're sorry but now your account isn't connected to any projects. Try later.</Title></Container>
    }
  }
}

const styles = StyleSheet.create({
  
});
