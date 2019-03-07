import React, { Component } from 'react';
import {ToastsContainer, ToastsStore} from 'react-toasts';
import Notifications, {notify} from 'react-notify-toast';
import './App.css';
import SignUp from './SignUp/SignUp';
import SignIn from './SignIn/SignIn'
import Header from './Header/Header';

class App extends Component {
  render() {
    return (
      <div className="App">
      

        <Header></Header>
        <div className="row row---margin">
          <div className="col-md-6 signup-padding">
          <Notifications options={{zIndex: 200, top: '50px'}} />
            <SignUp></SignUp>
          </div>
          <div className="col-md-6 signup-padding">
            { <SignIn></SignIn>}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
