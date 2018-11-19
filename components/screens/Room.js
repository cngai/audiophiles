// after selecting a room, show the details of the room

import React, {PureComponent} from 'react';
import {View, Text} from 'react-native-ui-lib';

class Room extends PureComponent {

  render() {
    return (
      <View flex center bg-blue70>
        <Text text40>Room Screen</Text>
      </View>
    );
  }
}

export default Room;
