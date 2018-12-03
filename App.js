import React, { Component } from 'react';
import fire from './components/database';
import Login from './components/screens/Login.js';
import { Ctnr } from './Navigation.js';
export var uid = undefined;
export var email = undefined;
export default class App extends Component {

  constructor() {
    super();
    this.state = ({
      user: null,
    });
    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      // console.log(user.uid);
      if (user) {
        this.setState({ user });
//        localStorage.setItem('user', user.uid);
        
      } else {
        this.setState({ user: null });
//        localStorage.removeItem('user');
      }
    });
  }

  render() {
    let whichScreen;

    if(this.state.user) {
      uid = this.state.user.uid; 
      email = this.state.user.email;
      whichScreen = <Ctnr />
    }
    else {
      
      whichScreen = <Login />;
    }

    return (
      whichScreen
    );
  }
}
