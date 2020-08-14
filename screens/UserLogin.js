import * as WebBrowser from 'expo-web-browser';
import React, { useState, Component} from 'react';
import {  Alert, Button, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import '../global.js';
import { ScrollView } from 'react-native-gesture-handler';

export default class UserLoginScreen extends Component {

	constructor(props) {
	    super(props);
	    
	    this.state = {
	      userName: global.userName,
	      userPassword: global.userPassword,
	    };
	    this.onLogin = this.onLogin.bind(this);
	  }
	  
	  onLogin() {
	    const { username, password } = this.state;

	    Alert.alert('Credentials', `${username} + ${password}`);
	  }

	  render() {
	    return (
	      <View style={styles.container}>
	        <TextInput
	          value={this.state.username}
	          onChangeText={(username) => this.setState({ username })}
	          placeholder={'Username'}
	          style={styles.input}
	        />
	        <TextInput
	          value={this.state.password}
	          onChangeText={(password) => this.setState({ password })}
	          placeholder={'Password'}
	          secureTextEntry={true}
	          style={styles.input}
	        />
	        
	        <Button
	          title={'Login'}
	          style={styles.input}
	          onPress={this.onLogin.bind(this)}
	        />
	      </View>
	    );
	  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});