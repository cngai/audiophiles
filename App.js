import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Profile from './components/screens/Profile';
import Room from './components/screens/Room';
import RoomMenu from './components/screens/RoomMenu'

const AppNavigator = StackNavigator({
  ProfileScreen: { screen: Profile },
  RoomScreen: { screen: Room },
  RoomMenuScreen: { screen: RoomMenu }
});

export default class App extends Component {
  render() {
    return (
      <AppNavigator />
    );
  }
}

// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import Main from './components/main';

// export default class App extends React.Component {
//   render() {
//     return (
//       <Main />
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
