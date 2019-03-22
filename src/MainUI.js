import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import moment from 'moment';

function Timer({ interval }){
  const duration = moment.duration(interval);
  return (
    <Text style={styles.timer}>
      {duration.minutes()}:{duration.seconds()}
    </Text>
  );
}

export default class MainUI extends Component {
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
      <View style={styles.rootContainer}>
        <View style={styles.timerContainer}>
          <Timer interval={timer} />
        </View>
        <View style={styles.questionContainer}>
        </View>
        <View style={styles.navigatorButtonContainer}>
          <View style={styles.buttonContainer}>
            <Button style={styles.button} title="Previous" />
          </View>
          <View style={styles.buttonContainer}>
            <Button style={styles.button} title="Stop" color="#ff0f0f" onPress={this.stop}/>
          </View>
          <View style={styles.buttonContainer}>
            <Button style={styles.button} title="Next" />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  timerContainer: {
    flex: 1,
    borderBottomWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  timer:{},
  questionContainer: {
    flex: 5
  },
  navigatorButtonContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  buttonContainer: {
    flex: 1
  }
});
