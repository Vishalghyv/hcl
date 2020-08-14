import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { TouchableOpacity, Text, Image, Platform, StatusBar, StyleSheet, View } from 'react-native';

import useCachedResources from './hooks/useCachedResources';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import CreateNotesScreen from './screens/CreateNote';
import NoteScreen from './screens/Note';
import UserLoginScreen from './screens/UserLogin';
import LinkingConfiguration from './navigation/LinkingConfiguration';
import CreateUserScreen from './screens/CreateUser';

import { createDrawerNavigator } from '@react-navigation/drawer';

import { Ionicons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function LogoTitle({props}) {
  return (
    <TouchableOpacity
            onPress={() => props.navigation.openDrawer()}
            style={{ backgroundColor: '#5c5c8a' }}>
    <Image
        source={require('./assets/images/header.jpg')}
        style={{ width: 30, height: 30 , margin: 10}}
      />
    </TouchableOpacity>
  );
}

export default function App(props) {
  const isLoadingComplete = useCachedResources();
  let userName = '';
  let userPassword = '';

  console.log(userName);
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
        <NavigationContainer linking={LinkingConfiguration}>
          <Stack.Navigator initialRouteName={'Grocery Store'}>
            <Stack.Screen name="Grocery Store" component={BottomTabNavigator} />
            <Stack.Screen name="Create User" component={CreateUserScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
