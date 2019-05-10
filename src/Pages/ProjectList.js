import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import {Container, Content, Header, Footer, List, Button, Icon } from 'native-base';
import ProjectCard from '../Components/ProjectCard.js';

export default class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{name:"CGA Philippines", description:"CGA data collections in the Philippines"},{name:"Cognitive Chatbot study", description:"Data collection for the users studies for the chatbot"}],
    };
  }

  renderProjectsList = (projects) => {
    return projects.map((project, index) => {
      return (
        <ProjectCard key={index} title={project.name} description={project.description} navigation={this.props.navigation}/>
      );
    });
  }

  render() {
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
  }
}

const styles = StyleSheet.create({
  
});
