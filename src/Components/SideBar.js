import React, {Component} from 'react';
import { Container, Content, Text, List, ListItem, Button } from "native-base";
const routes = ["ProjectsList", "SyncList", "Logout"];

export default class SideBar extends Component {
  renderListItem = (routes) => {
    return routes.map((route, index) => {
      return (
        <ListItem key={index} onPress={() => {this.props.navigation.navigate(route); this.props.navigation.closeDrawer();}}><Text>{route}</Text></ListItem>
      );
    });
  }
  
  render() {
    return (
      <Container>
        <Content>
          <List>
            {this.renderListItem(routes)}
          </List>
        </Content>
      </Container>
    );
  }
}
