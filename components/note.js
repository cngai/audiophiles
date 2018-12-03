import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import Swipeout from 'react-native-swipeout'; //used to create swipe delete button
import fire from './database';
const database = fire.database();
import { uid } from '../App';

export default class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      voted: false,
      votes: 0,
      isDisabled: undefined
    };

  }
  componentDidMount() {
    database.ref(`note/${this.props.val.id}/users`).on('value', (snapshot) => {
      temp= []
      snapshot.forEach((child) => {
        if (JSON.stringify(uid) == JSON.stringify(child)) {
          this.setState({
            voted: true
          })
        }
      })
      // console.log(this.state.voted);
    })
  }
  componentWillUnmount() {
    database.ref().off('value');
  }
  render() {
    let swipeoutBtns = [
      {
        text: 'X',
        backgroundColor: 'red',
        onPress: () => this.props.deleteMethod()
      }
    ]

    return (
      <Swipeout right={swipeoutBtns} backgroundColor='#ffffff'>
        <View key={this.props.keyval} style={styles.note}>

          <View style={styles.noteTextBorder}>
            <Text style={styles.noteTextNote}>{this.props.val.note}</Text>
          </View>

          <View>
            <Text style={styles.noteTextCounter}>{this.props.val.votes}</Text>
          </View>

          <TouchableOpacity onPress={this.updateVote} style={styles.noteVote}>
            {this.state.voted ? (<Text style={styles.noteDeleteText}>-</Text>) :
            (<Text style={styles.noteDeleteText}>+</Text>)}
          </TouchableOpacity>

        </View>
      </Swipeout>

    );
  }

  //either add or delete vote
  updateVote = () => {
    this.setState({ isDisabled: true })
    setTimeout(() => this.setState({ isDisabled: false }), 500);

    const id = this.props.val.id;
    if (!this.state.voted){
      database.ref(`note/${id}/users`).push(uid);
      database.ref(`note/${id}`).update({
        votes: this.props.val.votes + 1,
      }).then(() => {
        this.setState({
          votes: this.props.val.votes + 1,
          counter: this.state.counter + 1,
        });
      })
      
      

    }
    else {
      database.ref(`note/${id}`).update({
        votes: this.props.val.votes - 1
      }).then(() => {
        database.ref(`note/${id}/users`).once('value', (snapshot) => {
          temp= []
          snapshot.forEach((childs) => {
            if (JSON.stringify(uid) == JSON.stringify(childs)) {
              childs.ref.remove();
            }
          })
        })
      }).then(() => {
        this.setState({
          voted: false,
          votes: this.props.val.votes - 1,
          counter: this.state.counter - 1,
        })
      })
    }
  }
}

const styles = StyleSheet.create({
  note: {
      position: 'relative',
      padding: 20,
      paddingRight: 100,
      borderBottomWidth:2,
      borderBottomColor: '#ededed',
      flexDirection: 'row'
  },
  noteTextBorder: {
      borderLeftWidth: 10,
      borderLeftColor: '#3498db',
      justifyContent: 'center',
      width: 270
  },
  noteTextDate: {
      paddingLeft: 10,
      fontSize: 10
  },
  noteTextNote: {
      paddingLeft: 10,
      fontSize: 20
  },
  noteTextCounter: {
      paddingLeft: 10,
      fontSize: 20,
  },
  noteVote: {
      borderRadius: 5,
      width: 30,
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#3498db',
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

