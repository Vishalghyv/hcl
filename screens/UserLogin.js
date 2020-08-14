import * as WebBrowser from 'expo-web-browser';
import React, { useState, Component} from 'react';
import {  AsyncStorage, Button, Image, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native';
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
	    this.ShowImage = this.ShowImage.bind(this);
	  }
	  
	  async onLogin() {

	    let users = await AsyncStorage.getItem('@Users:buyer');
	    let login = false;
	    users = JSON.parse(users);
	    users.forEach((element,index,array) => {
	    	if(element.userName === this.state.userName) {
	    		if(element.userPassword === this.state.userPassword) {
	    			login = true;
	    			return;
	    		}
	    	}
	    })
	    if(login) {
	    	global.userName = this.state.userName;
	    	global.userPassword = this.state.userPassword;
	    	this.props.navigation.navigate('Home');
	    }

	  }

	  ShowImage() {
	  	var icon = require('../assets/images/who.jpg');
	  	if (global.userName == '' && global.userPassword == '') {
	  		return (
	  			<View style={styles.container}>
	  				<Image source={icon} style={styles.image} /> 
	  			</View>
	  			);
	  	}
	  	return null;
	  }

	  render() {
	    return (
	      <View style={styles.container}>
	      	<View style={styles.showImage}>
	      		<this.ShowImage />
	      	</View>
	        <TextInput
	          value={this.state.userName}
	          onChangeText={(value) => this.setState({userName: value})}
	          placeholder={'Username'}
	          style={styles.input}
	        />
	        <TextInput
	          value={this.state.userPassword}
	          onChangeText={(value) => this.setState({userPassword: value})}
	          placeholder={'Password'}
	          secureTextEntry={true}
	          style={styles.input}
	        />

	       	<TouchableOpacity
	       		onPress={() => this.onLogin()}
	            style={styles.loginButton}>
	              <Text 
	                style={{ fontSize: 20, color: '#e0e0eb' , textAlign: 'center'}}
	              >Login</Text>
          	</TouchableOpacity>
          	<TouchableOpacity
	            onPress={() => this.props.navigation.navigate('Create User')}>
          	<Text style={styles.newUser}>New Here? Create Account</Text>
          	</TouchableOpacity>
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
    width: '70%',
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 15,
    color: 'black',
  },
  loginButton: {
  	backgroundColor: '#944dff',
  	width:'70%',
  	height:'7%',
  	padding: 5,
  },
  showImage: {
  	width: '60%',
  	height: '30%',
  	top: '-5%',
  	margin: 20,
  },
  image: {
  	borderRadius: 100,
  	borderWidth: 1,
  	borderColor: 'black',
  	width: 200,
  	overflow: 'hidden',
  	height: 200,
  },
  newUser: {
  	color: '#737373',
  	textDecorationLine: 'underline',
  	fontSize:12,
  	padding:5,
  },
});