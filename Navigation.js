import React from 'react';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Profile from './components/screens/Profile';
import Room from './components/screens/Room';
import RoomMenu from './components/screens/RoomMenu';
import Ionicons from 'react-native-vector-icons/Ionicons'
// import Icon from 'react-native-vector-icons/FontAwesome5';

export const AppNavigator = createBottomTabNavigator(
  {
    Profile: {
      screen: Profile
    },
    Room: {
      screen: Room
    },
//    RoomMenu: {
//      screen: RoomMenu,
//      navigationOptions: {
//        tabBarLabel: "Room Menu",
//      },
//    }
  },
  {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Profile') {
        iconName = `ios-contact${focused ? '' : '-outline'}`;
      } else if (routeName === 'Room') {
        iconName = `ios-list${focused ? '' : '-outline'}`;
      }
      return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: 'red',
    inactiveTintColor: 'gray',
  },
}
);

export const Ctnr = createAppContainer(AppNavigator);
