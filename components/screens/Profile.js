import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

export class Profile extends Component {
  render() {
    return (
      <View>
        <Text>This is the Profile</Text>
//        <Button onPress={() => this.props.navigation.navigate('RoomMenuScreen')} title="RoomMenu"/>
      </View>
    )
  }
};

export default Profile;
