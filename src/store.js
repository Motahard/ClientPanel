import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import notifyReducer from './reducers/notifyReducer';
import settingReducer from './reducers/settingReducer';
//Reducers
//@to-dododo

const firebaseConfig = {
  apiKey: 'AIzaSyCDeB04EgJAHf6IE0X-vcOw8gWQ-OlWp1k',
  authDomain: 'client-panel-6695a.firebaseapp.com',
  databaseURL: 'https://client-panel-6695a.firebaseio.com',
  projectId: 'client-panel-6695a',
  storageBucket: 'client-panel-6695a.appspot.com',
  messagingSenderId: '212036361645',
  appId: '1:212036361645:web:fdf626be2fcd4418ac5524'
};

//react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
};

//init firebase instance
firebase.initializeApp(firebaseConfig);

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase) // <- needed if using firestore
)(createStore);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer,
  settings: settingReducer // <- needed if using firestore
});

//check for settings in localstorage
if (localStorage.getItem('settings') == null) {
  //default settings
  const defaultSettings = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: false
  };

  //set to localstorage
  localStorage.setItem('settings', JSON.stringify(defaultSettings));
}

//create initial state
const initialState = {
  settings: JSON.parse(localStorage.getItem('settings'))
};

//create store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
