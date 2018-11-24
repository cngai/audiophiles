import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import Swipeout from 'react-native-swipeout'; //used to create swipe delete button
import database from './database';

export default class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      voted: false
    };
  }

  render() {
    let swipeoutBtns = [
      {
        text: 'X',
        backgroundColor: '#002d77',
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
            {this.props.val.voted ? (<Text style={styles.noteDeleteText}>-</Text>) :
            (<Text style={styles.noteDeleteText}>+</Text>)}
          </TouchableOpacity>

        </View>
      </Swipeout>
      
    );
  }

  //either add or delete vote
  updateVote = () => {
    const id = this.props.val.id;

    if (!this.props.val.voted){
      this.props.val.voted = true;
      database.ref(`note/${id}`).update({
        votes: this.props.val.votes + 1,
        voted: this.props.val.voted
      })

      this.setState({
        votes: this.props.val.votes + 1,
        counter: this.state.counter + 1,
        voted: this.props.val.voted
      });

      this.props.val.votes++;
    }
    else if (this.props.val.voted){
      this.props.val.voted = false;
      database.ref(`note/${id}`).update({
        votes: this.props.val.votes - 1,
        voted: this.props.val.voted
      })

      this.setState({
        votes: this.props.val.votes - 1,
        counter: this.state.counter - 1,
        voted: this.props.val.voted
      });

      this.props.val.votes--;
    }

    this.props.sortMethod();
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
      borderLeftColor: '#002d77',
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