import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';

import useCachedResources from './hooks/useCachedResources';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import CreateNotesScreen from './screens/CreateNote';
import NoteScreen from './screens/Note';
import UserLoginScreen from './screens/UserLogin';
import LinkingConfiguration from './navigation/LinkingConfiguration';

import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

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
