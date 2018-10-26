import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

export default class Note extends Component {
  render() {
    return (

      <View key={this.props.keyval} style={styles.note}>
        <View style={styles.noteTextBorder}>
          <Text style={styles.noteTextDate}>{this.props.val.date}</Text>
          <Text style={styles.noteTextNote}>{this.props.val.note}</Text>
        </View>
        <TouchableOpacity onPress={this.props.deleteMethod} style={styles.noteDelete}>
          <Text style={styles.noteDeleteText}>X</Text>
        </TouchableOpacity>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  note: {
      position: 'relative',
      padding: 20,
      paddingRight: 100,
      borderBottomWidth:2,
      borderBottomColor: '#ededed'
  },
  noteTextBorder: {
      borderLeftWidth: 10,
      borderLeftColor: '#002d77'
  },
  noteTextDate: {
      paddingLeft: 10,
      fontSize: 10
  },
  noteTextNote: {
      paddingLeft: 10,
      fontSize: 20
  },
  noteDelete: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#002d77',
      padding: 10,
      top: 10,
      bottom: 10,
      right: 10
  },
  noteDeleteText: {
      color: 'white',
      fontWeight: 'bold'
  }
});