import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import Note from './note';
import KeyboardSpacer from 'react-native-keyboard-spacer';	//used to slide view up when keyboard appears
<<<<<<< HEAD
import database from './database';
=======
>>>>>>> 2b8ac2b722802c6be897cfd085f661c029e820a9

export default class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      noteArray: [],
      noteText: '',
    }
<<<<<<< HEAD
    //initialize data array from the server and listen for changes
    database.ref('note').on('value', (snapshot) => {
      temp= []
      snapshot.forEach((child) => {
        temp.push({
          id: child.key,
          ...child.val()
        })
      })
      this.setState({ noteArray: temp });
    })
    
=======
>>>>>>> 2b8ac2b722802c6be897cfd085f661c029e820a9
  }

  render() {

    let notes = this.state.noteArray.map((val, key) => {
      return <Note key={key} keyVal={key} val={val}
<<<<<<< HEAD
              deleteMethod={ ()=> this.deleteNote(key, val) } />
=======
              deleteMethod={ ()=> this.deleteNote(key) } />
>>>>>>> 2b8ac2b722802c6be897cfd085f661c029e820a9
    });

    return (
      <View style={styles.container}>


        <View style={styles.header}>
          <Text style={styles.headerText}>Audiophiles</Text>
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
<<<<<<< HEAD
    if (this.state.noteText) {
      const note = {
        'note': this.state.noteText,
        'votes': 0
      }
      database.ref('note').push(note)
=======

    if (this.state.noteText) {
      var d = new Date();
      this.state.noteArray.push({
        'date': (d.getMonth() + 1) +
        "/" + d.getDate() +
        "/" + d.getFullYear(),        
        'note': this.state.noteText
      });
      this.setState({ noteArray: this.state.noteArray });
>>>>>>> 2b8ac2b722802c6be897cfd085f661c029e820a9
      this.setState({ noteText: ''});
    }
  }

<<<<<<< HEAD
  deleteNote(key, val) {
    this.state.noteArray.splice(key, 1); 
    const id = val.id;

    database.ref(`note/${id}`).remove();

=======
  deleteNote(key) {
    this.state.noteArray.splice(key, 1);
    this.setState({ noteArray: this.state.noteArray })
>>>>>>> 2b8ac2b722802c6be897cfd085f661c029e820a9
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
      backgroundColor: '#002d77',
      alignItems: 'center',
      justifyContent:'center',
      borderBottomWidth: 10,
      borderBottomColor: '#ddd'
  },
  headerText: {
      color: 'white',
      fontSize: 30,
      padding: 20,
      paddingBottom: 10,
      fontFamily: 'Futura'
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
      backgroundColor: '#252525'
  },
  textInput: {
      alignSelf: 'stretch',
      color: '#fff',
      padding: 20,
      // borderTopWidth:2,
      // borderTopColor: '#ededed',
      fontStyle: 'italic'
  },
  addButton: {
      zIndex: 11,
      backgroundColor: '#002d77',
      width: 40,
      height: 40,
      borderRadius: 35,
      borderColor: '#fff',
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 8,
      left: 360,
      bottom: 47
  },
  addButtonText: {
      color: '#fff',
      fontSize: 24,
      fontWeight: 'bold'
  }
});