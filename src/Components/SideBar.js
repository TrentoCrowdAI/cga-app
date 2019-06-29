import React, {Component} from 'react';
import { Container, Content, Text, List, ListItem } from "native-base";
const activities = [{name:"Projects", navigator_name:"ProjectsList"}, /*{name:"Sync", navigator_name:"SyncList"},*/ {name:"Language Settings", navigator_name:"LanguageSelection"},{name:"Logout", navigator_name:"LoginPage"}];

export default class SideBar extends Component {
  renderListItem = (activities) => {
    return activities.map((activity, index) => {
      return (
        <ListItem key={index} onPress={() => {activity.name == "Logout" ? this.props.navigation.navigate(activity.navigator_name, {logout: true}) :  this.props.navigation.navigate(activity.navigator_name); this.props.navigation.closeDrawer();}}><Text>{activity.name}</Text></ListItem>
      );
    });
  }
  
  render() {
    return (
      <Container>
        <Content>
          <List>
            {this.renderListItem(activities)}
          </List>
        </Content>
      </Container>
    );
  }
}
