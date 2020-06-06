import * as WebBrowser from 'expo-web-browser';
import React, { useState, Component} from 'react';
import { AsyncStorage, Button, Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';


export default class CreateNoteScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {note:props.route.params.note,
                  show:false,
                  };
    console.log(this.state.note);
    this.updateNote = this.updateNote.bind(this);
    this.storeData = this.storeData.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    // console.log(props);
  }
  async storeData (note) {
    console.log(note);
        try {
            this.props.route.params.onChangeNote(note);
        } catch (error) {
            console.log(error);
        }
        this.props.navigation.goBack();

    }
  updateNote(title, body) {
    var note = Object.assign(this.state.note, {noteTitle:title,
    noteText:body, date: this.state.note.date});
    this.setState(note);
  }

  onChangeDate(event, selectedDate) {
    this.setState({show:false});
    var note = Object.assign(this.state.note, {noteTitle:this.state.note.noteTitle,
    noteText:this.state.note.noteText, date: selectedDate});
    this.setState(note);
  };
  render() {
    return (
      <View style={styles.container}>
          <TextInput
            autoFocus
            placeholder="Title"
            style={{ height: 50, padding: 10, marginBottom: 2, backgroundColor: 'white' }}
            value={this.state.note.noteTitle}
            onChangeText={(noteTitle) => this.updateNote(noteTitle, this.state.note.noteText)}
          />
          <TextInput
            multiline
            placeholder="What's on your mind?"
            style={{ height: 200, padding: 10, backgroundColor: 'white' }}
            value={this.state.note.noteText}
            onChangeText={(noteText) => this.updateNote(this.state.note.noteTitle, noteText)}
          />
          <Button onPress={() => this.setState({show:true})} title="Choose a Due to date" />
          {this.state.show && (<DateTimePicker
            testID="dateTimePicker"
            value={this.state.note.date}
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={this.onChangeDate}
          />)}
          <Button
            title="Save Note"
            color="#841584"
            accessibilityLabel="Save Note"
            onPress={() => this.storeData(this.state.note)}
          />
      </View>
    );
  }
}

CreateNoteScreen.navigationOptions = {
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
});
