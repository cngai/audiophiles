import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import Swipeout from 'react-native-swipeout'; //used to create swipe delete button


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
        onPress: () => { this.props.deleteMethod },
      }
    ]

    return (
      <Swipeout right={swipeoutBtns} backgroundColor='#ffffff'>
        <View key={this.props.keyval} style={styles.note}>

          <View style={styles.noteTextBorder}>
            <Text style={styles.noteTextDate}>{this.props.val.date}</Text>
            <Text style={styles.noteTextNote}>{this.props.val.note}</Text>
            <Text>{this.state.counter}</Text>
          </View>

          <TouchableOpacity onPress={this.updateVote} style={styles.noteVote}>
            {this.state.voted ? (<Text style={styles.noteDeleteText}>-</Text>) :
            (<Text style={styles.noteDeleteText}>+</Text>)}
            }
          </TouchableOpacity>

          <TouchableOpacity onPress={this.props.deleteMethod} style={styles.noteDelete}>
            <Text style={styles.noteDeleteText}>X</Text>
          </TouchableOpacity>

        </View>
      </Swipeout>
      
    );
  }

  //either add or delete vote
  updateVote = () => {
    if (!this.state.voted){
      this.setState({
        counter: this.state.counter + 1,
        voted: true
      });
    }
    else {
      this.setState({
        counter: this.state.counter - 1,
        voted: false
      });
    }
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
  noteVote: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#002d77',
      padding: 10,
      top: 10,
      bottom: 10,
      right: 100
  },
  noteDeleteText: {
      color: 'white',
      fontWeight: 'bold'
  }
});