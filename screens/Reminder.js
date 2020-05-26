import * as WebBrowser from 'expo-web-browser';
import React, { useState, Component} from 'react';
import {  Button, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { AnimatedCircularProgress } from 'react-native-circular-progress';


export default class ReminderScreen extends Component {
  constructor(props) {
    super(props);
    this.state= {fill: 55};
    console.log("Reminder");
  }
  render(){
    const percentage = 66;
    return (
      <View style={styles.container}>
        <View style={styles.center}>
          <AnimatedCircularProgress
            size={200}
            width={3}
            fill={this.state.fill}
            tintColor="#00e0ff"
            rotation = {0}
            arcSweepAngle = {250}
            backgroundColor="#3d5875">
            {
              (fill) => (
                <TextInput
                  placeholder="Time"
                  style={{ height: 200, padding: 10, backgroundColor: 'white' }}
                  value={this.state.fill}
                  onChangeText={(fill) => this.setState(fill)}
                />
              )
            }
          </AnimatedCircularProgress>
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
