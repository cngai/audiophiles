import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fire from '../database';
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity, Button , Image, ImageBackground, Alert } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';  //used to slide view up when keyboard appears

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.state = {
      email: '',
      password: '',
    };
  }

  login(e) {
    console.log(this.state.email);
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email.trim(), this.state.password).then((u) => {
    }).catch((error) => {
      console.log(error.code);
      switch(error.code) {
        case "auth/invalid-email":
          Alert.alert("Please enter a valid email address.");
          break;
        case "auth/wrong-password":
          Alert.alert("The password you entered is incorrect, or this user does not exist.");
          break;
        default:
          break;
      }
    });
  }

  signup(e){
    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(this.state.email.trim(), this.state.password).then((u)=>{
    }).then((u)=>{console.log(u)})
    .catch((error) => {
        console.log(error.code);
        switch(error.code) {
          case "auth/invalid-email":
            Alert.alert("Please enter a valid email address.");
            break;
          case "auth/email-already-in-use":
            Alert.alert("The email address you entered is already in use.");
            break;
          case "auth/weak-password":
            Alert.alert("Your password must consist of at least 6 characters.")
            break;
          default:
            break;
        }
      })
  }

  render() {
    return (
        <View style={styles.container}>
            <View style={styles.signedOutBackground}>
              <ImageBackground style={styles.backgroundImage}
              source={{ uri: "http://www.designbolts.com/wp-content/uploads/2018/09/national_park_sunset_iPhone-Xs-Background-1.jpg" }}>
                <Text style={styles.signedOutDescription}>Please sign in to your Audiophile account</Text>

                <TextInput style={styles.signInInput}
                  onChangeText={email => this.setState({ email })}
                  value={this.state.email}
                  type="email"
                  name="email"
                  class="form-control"
                  placeholder='username'
                  autoCapitalize='none'
                  returnKeyType='next'
                  placeholderTextColor='#333333'
                  underlineColorAndroid='transparent'>
                </TextInput>

                <TextInput style={styles.signInInput}
                  onChangeText={password => this.setState({ password })}
                  onChange={this.handleChange}
                  value={this.state.password}
                  type="password"
                  placeholder='password'
                  class="form-control"
                  autoCapitalize='none'
                  returnKeyType='go'
                  secureTextEntry
                  placeholderTextColor='#333333'
                  underlineColorAndroid='transparent'>
                </TextInput>
                <View style={styles.signedOutButtonContainer}>
                  <View style={styles.button}>
                    <Button title="SIGN IN" type="submit" onPress={this.login} color="#d9d9d9"/>
                  </View>
                  <View style={styles.button}>
                    <Button title="SIGN UP" type="submit" onPress={this.signup} color="#d9d9d9"/>
                  </View>
                </View>
              </ImageBackground>
            </View>
        </View>
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
