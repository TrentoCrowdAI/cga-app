import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, Footer, List, Title, Text } from 'native-base';
import ProjectCard from '../Components/ProjectCard.js';

export default class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      update: false,
      data: props.navigation.state.params.projects,
      navigation: this.props.navigation
    };
  }

  renderProjectsList = (projects) => {
    return projects.map((project, index) => {
      return (
        <ProjectCard key={index} enableProjectUpdate={this.enableProjectUpdate} id={project.id} title={project.name} description={project.description} navigation={this.props.navigation}/>
      );
    });
  }

  enableProjectUpdate = () => {
    this.setState({update:true});
  }

  componentDidMount() {
    this.subs = [
      this.props.navigation.addListener('willFocus', () => { //when the user return to the page, the app will update the project list
        if(this.state.update == true){
          fetch('https://cga-api.herokuapp.com/projects', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Cookie': 'connect.sid=' + this.state.navigation.state.params.user.accessToken + ";",
            },
          }).then((response) => response.json())
          .then((responseJson) => {
            //console.log(responseJson);
            this.setState({update:false, data: responseJson});
            this.forceUpdate();
          });
        }
      })
    ];
  }

  componentWillUnmount() {
    this.subs.forEach((sub) => {
      sub.remove();
    });
  }

  render() {
    if(this.state.data != null && this.state.data.length > 0){
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
      return (
        <Container><Title><Text>We're sorry but now your account isn't connected to any projects. Try later.</Text></Title></Container>
      );
    }
  }
}

const styles = StyleSheet.create({
  
});
