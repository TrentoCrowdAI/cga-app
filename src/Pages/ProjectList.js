import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, Footer, List } from 'native-base';
import ProjectCard from '../Components/ProjectCard.js';

export default class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.navigation.state.params.projects
    };
  }

  renderProjectsList = (projects) => {
    return projects.map((project, index) => {
      return (
        <ProjectCard key={index} id={project.id} title={project.name} description={project.description} navigation={this.props.navigation}/>
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
