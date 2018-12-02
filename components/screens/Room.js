import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity, Button } from 'react-native';
import Note from '../note';
import KeyboardSpacer from 'react-native-keyboard-spacer';  //used to slide view up when keyboard appears
import fire from '../database';

export default class Room extends Component {

  constructor(props) {
    super(props);
    this.state = {
      noteArray: [],
      noteText: '',
    }
    //initialize data array from the server and listen for changes
    fire.database().ref('note').on('value', (snapshot) => {
      temp= []
      snapshot.forEach((child) => {
        temp.push({
          id: child.key,
          ...child.val()
        })
      })
      this.setState({ noteArray: temp });
    })
  }

  render() {

    let notes = this.state.noteArray.map((val, key) => {
      return <Note key={key} keyVal={key} val={val}
              deleteMethod={ ()=> this.deleteNote(key, val) } />
    });

    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.headerText}>Voting Room</Text>
        </View>

        <ScrollView style={styles.scrollContainer}>
          {notes}
        </ScrollView>

        <View style={styles.footer}>
            <TextInput
              style={styles.textInput}
              onChangeText={(noteText) => this.setState({noteText})}
              value={this.state.noteText}
              placeholder='Add Song'
              placeholderTextColor='white'
              underlineColorAndroid='transparent'>
            </TextInput>

            <TouchableOpacity onPress={ this.addNote.bind(this) } style={styles.addButton}>
              <Text style={styles.addButtonText}>+</Text>
           </TouchableOpacity>
          <KeyboardSpacer/>
        </View>



      </View>
    );
  }

  addNote() {
    if (this.state.noteText) {
      const note = {
        'note': this.state.noteText,
        'votes': 0
      }
      fire.database().ref('note').push(note)
      this.setState({ noteText: ''});
    }
  }

  deleteNote(key, val) {
    this.state.noteArray.splice(key, 1);
    const id = val.id;

    fire.database().ref(`note/${id}`).remove();

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
      backgroundColor: '#cc0000',
      alignItems: 'center',
      justifyContent:'center',
      borderBottomWidth: 2,
      borderBottomColor: '#cc0000'
  },
  headerText: {
      color: 'white',
      fontSize: 30,
      padding: 35,
      paddingBottom: 10,
      fontFamily: 'Helvetica Neue',
      fontWeight: 'normal'
  },
  scrollContainer: {
      flex: 1,
      marginBottom: 100
  },
  footer: {
      position: 'absolute',
      bottom: -40,
      left: 0,
      right: 0,
      zIndex: 10,
      backgroundColor: '#1a1a1a'
  },
  textInput: {
      alignSelf: 'stretch',
      color: '#fff',
      padding: 20,
      fontFamily: 'Helvetica Neue',
      fontStyle: 'italic'
  },
  addButton: {
      zIndex: 11,
      backgroundColor: '#cc0000',
      width: 40,
      height: 40,
      borderRadius: 10,
      borderColor: '#cc0000',
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 8,
      left: 360,
      bottom: 47
  },
  addButtonText: {
      color: '#e6e6e6',
      fontSize: 24,
      fontWeight: 'bold'
  }
});
