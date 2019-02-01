// Import FirebaseAuth and firebase.
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import Fokusz from './Fokusz';

// Configure Firebase.
const config = {
    apiKey: "AIzaSyCv4aHJcd0K-oNE0OknDxBgr1qYhbIGCYM",
    authDomain: "artixa-1fe69.firebaseapp.com",
    databaseURL: "https://artixa-1fe69.firebaseio.com",
    projectId: "artixa-1fe69",
    storageBucket: "artixa-1fe69.appspot.com",
    messagingSenderId: "624275369219"
};
firebase.initializeApp(config);

class SignInScreen extends React.Component {

  // The component's Local state.
  state = {
    isSignedIn: false // Local signed-in state.
  };

  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    'credentialHelper': firebaseui.auth.CredentialHelper.NONE,
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
  };

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
        (user) => this.setState({isSignedIn: !!user})
    );
  }
  
  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  checkEmail(){
    if (firebase.auth().currentUser.email != 'gabor@artixa.hu'){
      firebase.auth().signOut();
    }
  }

  render() {
    if (!this.state.isSignedIn) {
      return (
        <div>
          <h1>My App</h1>
          <p>Please sign-in:</p>
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>    
        </div>
      );
    }
    return (
      this.checkEmail(),
      <Route path ="/Fokusz" component={Fokusz} />,
      <div>
        <h1>My App</h1>
        <p>Welcome {firebase.auth().currentUser.email}! You are now signed-in!</p>
        <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
      </div>
    );
  }
}
export default SignInScreen;