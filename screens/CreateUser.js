import * as WebBrowser from 'expo-web-browser';
import React, { useState, Component} from 'react';
import { AsyncStorage, Button, Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';


export default class CreateUserScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.state.userName = '';
    this.state.userEmail = '';
    this.state.userAddress = '';
    this.state.userPassword = '';
    this.createUser = this.createUser.bind(this);
    this.saveData = this.saveData.bind(this);
  }

  async saveData() {
    console.log('begin');
    let users = await AsyncStorage.getItem('@Users:buyer');
    console.log(users);
    let OldUsers = JSON.parse(users);
    let userList = [];
    if( !OldUsers ){
      userList = [];
    } else {
        userList.push(Object({},OldUsers));
    }
    let newUser = {};
    newUser['userName'] = this.state.userName;
    newUser['userAddress'] = this.state.userAddress;
    newUser['userEmail'] = this.state.userEmail;
    newUser['userPassword'] = this.state.userPassword;
    newUser['userName'] = this.state.userName;
    newUser['userName'] = this.state.userName;
    OldUsers.push(newUser);

    const filteredArr = OldUsers.reduce((acc, current) => {
      const x = acc.find(item => item.userName === current.userName);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);

    await AsyncStorage.setItem(
            '@Users:buyer',
            JSON.stringify(filteredArr)
          );
    console.log('end');
  }

  createUser() {
    this.saveData();
  }
  render() {
    return (
      <View style={styles.container}>
          <TextInput
            autoFocus
            placeholder="User Name"
            style={{ height: 50, marginVertical: 8, padding: 10, backgroundColor: 'white' }}
            value={this.state.userName}
            onChangeText={(name) => this.setState({userName: name})}
          />
          <TextInput
            autoFocus
            placeholder="Address"
            style={{ height: 50, marginBottom: 8, padding: 10, backgroundColor: 'white' }}
            value={this.state.userAddress}
            onChangeText={(address) => this.setState({userAddress: address})}
          />
          <TextInput
            autoFocus
            placeholder="Email"
            style={{ height: 50, marginBottom: 8, padding: 10, backgroundColor: 'white' }}
            value={this.state.userEmail}
            onChangeText={(email) => this.setState({userEmail: email})}
          />
          <TextInput
            autoFocus
            placeholder="Password"
            style={{ height: 50, marginBottom: 8, padding: 10, backgroundColor: 'white' }}
            value={this.state.userPassword}
            onChangeText={(password) => this.setState({userPassword: password})}
          />
          <View style={{ height: '100%',alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => this.createUser()}
            style={styles.loginButton}>
              <Text 
                style={{ fontSize: 20, color: '#e0e0eb' , textAlign: 'center'}}
              >Create Account</Text>
          </TouchableOpacity>
          </View>
      </View>
    );
  }
}

CreateUserScreen.navigationOptions = {
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',

  },
  input: {
    width: '70%',
    height: '8%',
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 15,
    fontSize: 20,
  },
  loginButton: {
    backgroundColor: '#944dff',
    width:'70%',
    height:'7%',
    padding: 5,
    margin: 15,

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