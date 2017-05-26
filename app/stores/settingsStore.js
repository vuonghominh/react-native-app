import firebase from 'firebase'
import MobxFirebaseStore from 'mobx-firebase-store'
const config = {
    apiKey: "AIzaSyBv_UaOXhnrBFnueV-InyAYL28zJz1d7m0",
    authDomain: "dinner-f821b.firebaseapp.com",
    databaseURL: "https://dinner-f821b.firebaseio.com",
    projectId: "dinner-f821b",
    storageBucket: "dinner-f821b.appspot.com",
    messagingSenderId: "547238604649"
  };

export default class SettingsStore extends MobxFirebaseStore {
  constructor() {
    firebase.initializeApp(config)
    super(firebase.database().ref())

    this.splashTime = 5000
    this.splashImg = require('../../images/splash.jpg')
  }
  get SplashTime() {
    return this.splashTime
  }
  get SplashImg() {
    return this.splashImg
  }
}