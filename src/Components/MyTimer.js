import React, {Component} from 'react';
import { Container, Text, Icon } from 'native-base'
import moment from 'moment';
import Question from "./Question"

function Timer({ interval }){
  const duration = moment.duration(interval);
  return (
    <Container style={{flexDirection:'row'}}>
      <Container style={{flex:4}}/>
      <Container style={{flex:1}}>
        <Icon name='timer'/>
      </Container>
      <Container style={{flex:1}}>
        <Text>{duration.minutes()}:{duration.seconds()}</Text>
      </Container>
      <Container style={{flex:4}}/>
    </Container>
  );
}

export default class MyTimer extends Component {
  constructor(props){
    super(props);
    const now = new Date().getTime(); //starting the timer when the component is created
    this.state = {
      start: now,
      now: 0
    };
    this.timer = setInterval(() => {
      this.setState({ now : new Date().getTime()});
    }, 100);
  }

  start = () => {
    const now = new Date().getTime();
    this.setState({
      start: now,
      now
    });
    this.timer = setInterval(() => {
      this.setState({ now : new Date().getTime()});
    }, 100);
  }

  stop = () => {
    clearInterval(this.timer);
    const {now, start} = this.state;
    this.setState({
      start: 0,
      now: 0
    });
  }

  render() {
    const {now, start} = this.state;
    const timer = now - start;
    return (
      <Container>
        <Timer interval={timer} />
      </Container>
    );
  }
}
