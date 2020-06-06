import * as WebBrowser from 'expo-web-browser';
import React, { useState, Component} from 'react';
import { AsyncStorage, Button, FlatList, Image, Platform, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { MonoText } from '../components/StyledText';

export default class NoteScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
                Notes: {}
              };
    this.Item = this.Item.bind(this);
    this.retrieveData = this.retrieveData.bind(this);
    this.saveData = this.saveData.bind(this);
    this.deleteData = this.deleteData.bind(this);
    this.Create = this.Create.bind(this);
    this.retrieveData();
    console.log("Notes");
  }
  async saveData(note) {;
    let newNotes = Object.assign( {},this.state.Notes);
    newNotes[note.id] = note;
    this.setState({Notes:newNotes});
    await AsyncStorage.setItem(
            '@Scheduler:note',
            JSON.stringify(newNotes)
          );
  }
  async retrieveData() {
    try {
      const value = await AsyncStorage.getItem('@Scheduler:note');
      if (value !== null) {
        var obj = JSON.parse(value);
        this.setState({Notes:obj});
      }
    } catch (error) {
      console.log(error);
    }
  };

  async deleteData(note) {
    var newNotes = Object.assign({}, this.state.Notes);
    delete newNotes[note.id];
    this.setState({Notes:newNotes});
    await AsyncStorage.setItem(
            '@Scheduler:note',
            JSON.stringify(newNotes)
          );
  }

  Item( item, onPress ) {
      var d = new Date(item.date);
      return (
        <TouchableHighlight 
          onPress={onPress}
        >
          <View style={styles.item}>
              <Text style={styles.title}>{item.noteTitle}</Text>
              <Text> {item.noteText} </Text>
              <Text> {'Due Date:'+d.toDateString()} </Text>
              <Button
                title="Delete Note"
                color="#841584"
                accessibilityLabel="Delete a Note"
                onPress = {() => this.deleteData(item)}
              />
          </View>
        </TouchableHighlight>
      );
  };

  Create(length) {
    if (!length) {    return (
        <View style={styles.container}>
          <Text  style={{ fontSize: 10, color:'lightgrey' }}>You Haven't Created any Notes</Text>
          <Button
            title="Create Note"
            color="#841584"
            accessibilityLabel="Create a New Note"
          />
        </View>
      );  
    }
  }
  render(){
    let button;
    if (!Object.keys(this.state.Notes).length) {
        button = <View style={styles.container}>
          <Text  style={{ fontSize: 10, color:'lightgrey' }}>You Haven't Created any Notes</Text>
          <Button
            title="Create Note"
            color="#841584"
            accessibilityLabel="Create a New Note"
          />
        </View>;
    } else {      
      button = null;
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={Object.values(this.state.Notes).reverse()}
          initialScrollIndex = {0}
          renderItem={({ item }) => this.Item(item,() => this.props.navigation.navigate('CreateNote',{onChangeNote:(note) => {console.log("note changed",note);this.saveData(note);},note:{
          noteTitle:item.noteTitle,
          noteText:item.noteText,
          id: item.id,
        }}))}
          keyExtractor={item => item.id}
        />
        {button}
        <TouchableOpacity onPress={ () => this.props.navigation.push('CreateNote',{onChangeNote:(note) => {console.log("note changed",note);this.saveData(note);},note:{
          noteTitle:'',
          noteText:'',
          id: new Date().getTime(),
          date: new Date(),
        },})} style={styles.newNote}>
          <Text style={styles.addNewNote}>+</Text>
        </TouchableOpacity>
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
  }
});
