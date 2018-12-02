import React, { Component } from 'react';
import fire from '../database';
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity, Button , Image, ImageBackground } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';  //used to slide view up when keyboard appears

export default class Profile extends Component {

  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
       fire.auth().signOut();
   }

  render() {
      return (
        <ScrollView style={styles.container}>
            <View style={styles.header}></View>
            <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
            <View style={styles.signInbody}>
              <View style={styles.bodyContent}>
                <Text style={styles.name}>Random User</Text>
                <Text style={styles.info}>UCLA Student</Text>
                <Text style={styles.description}>Class of 2020</Text>
                <View style={styles.signedInButtonContainer}>
                    <Button title="SIGN OUT" onPress={this.logout} color="white"/>
                </View>
              </View>
          </View>
        </ScrollView>
      );
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#cc0000",
    height:200,
  },
  signedOutBackground:{
    height:1000,
  },
  backgroundImage:{
    flex: 1,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  name:{
    flex:1,
    fontSize:22,
    color:"#000000",
    fontWeight:'600',
  },
  signInbody:{
    flex: 1,
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  signedOutDescription:{
    fontSize:16,
    color: "#FFFFFF",
    marginTop:100,
    marginBottom:50,
    textAlign: 'center'
  },
  description:{
    flex: 1,
    fontSize:16,
    color: "#696969",
    marginTop:10,
    marginBottom: 10,
    textAlign: 'center',
  },
  signedInButtonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:125,
    borderRadius:10,
    backgroundColor: "#cc0000",
  },
  signedOutButtonContainer: {
    marginTop:50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    height:45,
    width:125,
    backgroundColor: "#1a1a1a",
    marginBottom:10,
    borderRadius:10,
  },
  signInInput: {
      alignSelf: 'stretch',
      backgroundColor: '#e6e6e6',
      color: '#333333',
      marginHorizontal: 40,
      marginTop:10,
      marginBottom:10,
      borderRadius: 10,
      padding: 10,
      fontFamily: 'Helvetica Neue',
  },
});
