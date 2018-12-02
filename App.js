import React, { Component } from 'react';
import fire from './components/database';
import Login from './components/screens/Login.js';
import { Ctnr } from './Navigation.js';

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
      console.log(user);
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
