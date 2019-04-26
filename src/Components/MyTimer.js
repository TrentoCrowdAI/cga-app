import React, {Component} from 'react';
import { Container, Text, Icon } from 'native-base'
import moment from 'moment';
import {StyleSheet, View} from 'react-native';


function Timer({interval}){
    const duration = moment.duration(interval);
    return(
      <View style={styles.container}>
          <View style={styles.box}>
              <Icon name='timer' style={styles.icon} />
              <Text style={{flex:2, textAlign: 'center'}}>{duration.minutes()}:{duration.seconds()}</Text>
          </View>
      </View>
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
    }
  
    componentDidMount(){
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

  const styles = StyleSheet.create({
      container: {
        flex: 1,
        flexDirection: 'row', 
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        // backgroundColor:'green',
      },
      box: {
        height: 48,
        width: 100,
        backgroundColor: '#b0c4de',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        padding: 10, 
        borderRadius: 6,
        marginTop: 15,
        marginRight: 30
      },
      icon: {
        flex: 1,

      }
  })