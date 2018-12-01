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
import database from './database';


export default class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      noteArray: [],
      noteText: '',
      id: []
    }
    //initialize data array from the server and listen for changes
    
  }
  componentDidMount() {
    database.ref('note').on('value', (snapshot) => {
      // console.log(snapshot);
      temp= []
      snapshot.forEach((child) => {
        temp.push({
          id: child.key,
          ...child.val()
        })
      })
      // const sortedNotes = this.sortNotes(temp);
      setTimeout(() => {this.setState({ noteArray: this.sortNotes(temp) })}, 150);
      // this.setState({ noteArray: this.sortNotes(temp) });
    })
  }
  render() {

    let notes = this.state.noteArray.map((val, key) => {
      return <Note key={val.id} keyVal={key} val={val}
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
              placeholderTextColor='grey'
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
        'votes': 0,
        'users': []
      }
      for (var i = 0; i < this.state.noteArray.length; i++){
        if (this.state.noteArray[i].note == this.state.noteText) {
          alert('Candidate is already in the list');
          this.setState({ noteText: ''});
          return 
        }
      }
      database.ref('note').push(note);
      // console.log(Expo.Constants.installationId);
      this.setState({ noteText: ''});
    }
  }

  deleteNote(key, val) {
    this.state.noteArray.splice(key, 1);
    const id = val.id;

    database.ref(`note/${id}`).remove();

  }
  sortNotes(newArray) {    
    // let newArray = this.state.noteArray;
    
    for (var i = 1; i < newArray.length; i++){
      if (i !== 0 && (newArray[i].votes > newArray[i-1].votes)){
        var temp = newArray[i];
        newArray[i] = newArray[i-1];
        newArray[i-1] = temp;
        i = i-2;
        // this.setState({ noteArray: newArray });
      }
    }
    // console.log(newArray);
    return newArray;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 145,
  },
  header: {
      paddingTop: 15,
      backgroundColor: '#3498db',
      alignItems: 'center',
      justifyContent:'center',
      borderBottomWidth: 10,
      borderBottomColor: 'white'
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
      // marginBottom: 100
  },
  footer: {
      position: 'absolute',
      // height: 90,
      marginBottom: -40,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 10,
      backgroundColor: 'white'
  },
  textInput: {
      alignSelf: 'stretch',
      backgroundColor: 'white',
      color: "black",
      padding: 20,
      paddingBottom: 30,
      paddingTop: 30,
      // marginBottom: -10,
      borderTopWidth:2,
      borderTopColor: '#ededed',
      borderRadius: 2,
      fontStyle: 'italic',
      fontSize: 18
  },
  addButton: {
      zIndex: 11,
      backgroundColor: '#3498db',
      width: 50,
      height: 50,
      borderRadius: 15,
      // borderColor: '#fff',
      // borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 8,
      left: 300,
      bottom: 62
  },
  addButtonText: {
      color: '#fff',
      fontSize: 24,
      fontWeight: 'bold'
  }
});

