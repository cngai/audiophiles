import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Ctnr } from './Navigation';

// idea is to render main through the room screen
export default class App extends Component {
  render() {
    return (
      <Ctnr />
    );
  }
}
