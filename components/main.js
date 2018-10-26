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



export default class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      noteArray: [],
      noteText: '',
    }
  }

  render() {

    let notes = this.state.noteArray.map((val, key) => {
      return <Note key={key} keyVal={key} val={val}
              deleteMethod={ ()=> this.deleteNote(key) } />
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
          <KeyboardSpacer/>
        </View>        

        <TouchableOpacity onPress={ this.addNote.bind(this) } style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>

      </View>
    );
  }

  addNote() {

    if (this.state.noteText) {
      var d = new Date();
      this.state.noteArray.push({
        'date': (d.getMonth() + 1) +
        "/" + d.getDate() +
        "/" + d.getFullYear(),        
        'note': this.state.noteText
      });
      this.setState({ noteArray: this.state.noteArray });
      this.setState({ noteText: ''});
    }
  }

  deleteNote(key) {
    this.state.noteArray.splice(key, 1);
    this.setState({ noteArray: this.state.noteArray })
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
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 10
  },
  textInput: {
      alignSelf: 'stretch',
      color: '#fff',
      padding: 20,
      backgroundColor: '#252525',
      borderTopWidth:2,
      borderTopColor: '#ededed',
      fontStyle: 'italic'
  },
  addButton: {
      position: 'absolute',
      zIndex: 11,
      right: 15,
      bottom: 70,
      backgroundColor: '#002d77',
      width: 40,
      height: 40,
      borderRadius: 35,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 8
  },
  addButtonText: {
      color: '#fff',
      fontSize: 24,
      fontWeight: 'bold'
  }
});