import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import {Container, Content, Header, Footer, Text, Button } from 'native-base';
import Textbox from '../Components/Textbox';

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  
  save = (index, value) => {
    this.state.data[index] = value;
  }

  login = () => {
    username = this.state.data[0];
    password = this.state.data[1];
    this.props.navigation.navigate("ProjectsList");
  }

  render() {
    return (
      <Container>
        <Header androidStatusBarColor="#b70e23"  style={{ backgroundColor: 'white' }} />
        <Content style={{ backgroundColor: 'white' }}>
          <Textbox label={"Username"} save={this.save} indexQuestion={0}/>
          <Textbox label={"Password"} save={this.save} indexQuestion={1} secureTextEntry={true}/>
          <Button onPress={() => this.login()} style={styles.button}><Text>Login</Text></Button>
        </Content>
        <Footer style={{ backgroundColor: 'white' }} />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    backgroundColor: '#2b2d42'
  }
});
