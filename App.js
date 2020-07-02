import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';

import useCachedResources from './hooks/useCachedResources';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import CreateNotesScreen from './screens/CreateNote';
import NoteScreen from './screens/Note';
import LinkingConfiguration from './navigation/LinkingConfiguration';

import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function App(props) {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
        <NavigationContainer linking={LinkingConfiguration}>
          
          <Drawer.Navigator>
          	<Drawer.Screen name="Root" component={BottomTabNavigator} />
          	<Drawer.Screen name="Clean" component={BottomTabNavigator} />
          	<Drawer.Screen name="sdf" component={BottomTabNavigator} />
          	<Drawer.Screen name="sdffdsdf" component={BottomTabNavigator} />
      	  </Drawer.Navigator>
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
