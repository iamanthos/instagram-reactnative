import React, { Component } from 'react'

import { View, Text } from 'react-native';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
const store = createStore(rootReducer, applyMiddleware(thunk))

import * as firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBW9v8hSBc7KFJHtd6bsjLk34EV-4mER5c",
  authDomain: "instagram-a2f28.firebaseapp.com",
  projectId: "instagram-a2f28",
  storageBucket: "instagram-a2f28.appspot.com",
  messagingSenderId: "568470062961",
  appId: "1:568470062961:web:579400b75542e715ab18d0",
  measurementId: "G-TDSP7N0GT0"
};

if(firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import MainScreen from './components/Main'
import AddScreen from './components/main/Add';

const Stack = createStackNavigator();



export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      loaded: false,
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
      if(!user) {
        this.setState({
          loggedIn: false,
          loaded: true
        })
      }
      else {
        this.setState({
          loggedIn: true,
          loaded: true
        })
      }
    })
  }

  render() {
    const { loggedIn, loaded } = this.state;
    if(!loaded) {
      return(
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text>Loading</Text>
        </View>
      )
    }

    if(!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component ={LandingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component ={RegisterScreen}/>
          </Stack.Navigator>
        </NavigationContainer>    
      );
    }
    
    return(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component ={MainScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Add" component ={AddScreen} />
          </Stack.Navigator>
        </NavigationContainer>
        
      </Provider>
      
    )

  }
}

export default App
