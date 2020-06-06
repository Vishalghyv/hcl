import * as WebBrowser from 'expo-web-browser';
import React, { useState, Component} from 'react';
import {  Button, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { AnimatedCircularProgress } from 'react-native-circular-progress';
import DateTimePicker from '@react-native-community/datetimepicker';


export default class ReminderScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {fill: 50,timeHeading:'Time',time:new Date(0,0,0,0,0).getTime(),show:false,hour:0,minutes:0};
    console.log(this.state.time);
    this.timer = 0;
    this.time = 0;
    this.newTime = 0;
    this.updateTime = this.updateTime.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    console.log("Reminder");
  }

  updateTime(event, time) {
    console.log(time.getTime());
    this.stopTimer();
    this.setState({time:time.getTime()});
    this.setState({hours:time.getHours()});
    this.setState({minutes:time.getMinutes()});
    this.setState({timeHeading:''+this.state.hours+'h-'+this.state.minutes+'m'});
    this.setState({show:false});
    this.setState({fill:100});
  };

  startTimer() {
    console.log("dsf");
    this.timer = setInterval(this.countDown, 1000);
    this.setState({timer:this.timer});
  }

  countDown() {
    if(this.state.hours > 0) {
      if(this.state.minutes > 0) {
        this.time = new Date(this.state.time).getHours()*60 + new Date(this.state.time).getMinutes();
        this.newTime = this.state.hours*60 + this.state.minutes;
        this.setState({fill:Math.floor(100*(this.newTime/this.time))});
        this.setState({minutes:this.state.minutes-1});
        this.setState({timeHeading:''+this.state.hours+'h-'+this.state.minutes+'m'});
      } else {
        this.setState({minutes:60});
        this.setState({hours:this.state.hours-1});
        this.setState({timeHeading:''+this.state.hours+'h-'+this.state.minutes+'m'});
      }
    }
    else {
      if(this.state.minutes > 0) {
        this.time = new Date(this.state.time).getHours()*60 + new Date(this.state.time).getMinutes();
        this.newTime = this.state.hours*60 + this.state.minutes;
        this.setState({fill:Math.floor(100*(this.newTime/this.time))});
        this.setState({minutes:this.state.minutes-1});
        this.setState({timeHeading:''+this.state.hours+'h-'+this.state.minutes+'m'});
      } else {
        this.time = new Date(this.state.time).getHours()*60 + new Date(this.state.time).getMinutes();
        this.newTime = this.state.hours*60 + this.state.minutes;
        this.setState({fill:Math.floor(100*(this.newTime/this.time))});
        clearInterval(this.state.timer);
      }
    }
  }

  stopTimer() {
    console.log(this.state);
    clearInterval(this.state.timer);
  }
  chooseTime() {

    if(this.state.show){
      this.setState({show:false});
    return <DateTimePicker
            testID="dateTimePicker"
            value={this.state.time}
            mode={'time'}
            display="spinner"
            onChange={this.updateTime}
          />;
        }
  }
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.center}>
          <AnimatedCircularProgress
            size={200}
            width={3}
            fill={this.state.fill}
            tintColor="#00e0ff"
            rotation = {0}
            arcSweepAngle = {360}
            backgroundColor="#3d5875"
            >
            { 
              (fill) => (
                <View>
                  <Button onPress={() => this.setState({show:true})} title={this.state.timeHeading} />
                  {this.chooseTime()}
                </View>
              )
            }
          </AnimatedCircularProgress>
          <View>
            <Button
                  title="Start"
                  color="#841584"
                  accessibilityLabel="Start the timer"
                  onPress = {() => this.startTimer()}
                />
            <Button
                  title="Stop"
                  color="#841584"
                  accessibilityLabel="Stop the timer"
                  onPress = {() => this.stopTimer()}
                />
          </View>
        </View>
      </View>
    );
  } 
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  newNote: {
    position:'absolute',
    zIndex: 11,
    right:20,
    bottom:20,
    backgroundColor:'orangered',
    width:50,
    height:50,
    borderRadius:50,
    alignItems:'center',
    justifyContent:'center',
    elevation:8,
  },
  addNewNote: {
    color:'white',
    fontSize: 24,
  },
  center: {
    flex:1,
    alignItems:'center',
    justifyContent:'center',

  }
});
