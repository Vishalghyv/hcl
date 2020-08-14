import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as React from 'react';
import { createStackNavigator} from '@react-navigation/stack';
import { Button, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import '../global.js';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import NoteScreen from '../screens/Note';
import ReminderScreen from '../screens/Reminder';
import StoreScreen from '../screens/Store';
import UserLoginScreen from '../screens/UserLogin';
import CreateNoteScreen from '../screens/CreateNote';
import { NavigationContainer } from '@react-navigation/native';

import { createDrawerNavigator, DrawerContentScrollView,  DrawerItemList } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();
const BottomTab = createBottomTabNavigator();
const Tab = createMaterialTopTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

const Stack = createStackNavigator();
function TabAScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TabA Home" component={TabADetailsScreen} />
      <Stack.Screen name="CreateNote" component={CreateNoteScreen} />
      <Stack.Screen name="TabA Details" component={Details} />
    </Stack.Navigator>
  );
}
function TabADetailsScreen({navigation}) {
  return (
    <Tab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Search',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
        }}
      />
      <Tab.Screen
        name="Notes"
        component={NoteScreen}
        options={{
          title: 'Products',
        }}
      />
      <Tab.Screen
        name="Store"
        component={StoreScreen}
        options={{
          title: 'Stores',
        }}
      />
    </Tab.Navigator>
  );
}
function Details() {
  return (
    <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center' }}>
      <Text>
        TabA Details here!
      </Text>
    </View>
  );
}


export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  let name = '';
  let screeName = "User Login";

  if(global.userName != '') {
    name = global.userName;
    screeName = 'Account';
  }

  return (
     <Drawer.Navigator initialRouteName={'Home'} >        
      <Drawer.Screen name="Home" component={TabADetailsScreen} />
      <Drawer.Screen name={screeName} component={UserLoginScreen} />
      <Drawer.Screen name={'Settings'} component={Details} />
    </Drawer.Navigator>
   
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'Home';
    case 'Notes':
      return 'Notes';
    case 'Reminder':
      return 'Reminder';
    case 'CreateNote':
      return 'CreateNote';
  }
}

