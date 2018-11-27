import React from 'react';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Profile from './components/screens/Profile';
import Room from './components/screens/Room';
import RoomMenu from './components/screens/RoomMenu';
// import Icon from 'react-native-vector-icons/FontAwesome5';

export const AppNavigator = createBottomTabNavigator({
  Profile: {
    screen: Profile
    // navigationOptions: {
    //   tabBarLabel:"Home",
    //   tabBarIcon: ({ tintColor }) => (
    //     <Icon name="ios-bookmarks" size={20}/>
    //   )
    // },
  },
  Room: {
    screen: Room
  },
  RoomMenu: {
    screen: RoomMenu,
    navigationOptions: {
      tabBarLabel: "Room Menu",
    },
  }
});

export const Ctnr = createAppContainer(AppNavigator);
