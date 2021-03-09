import React, { Component } from 'react'
import { Text, View, Button, TextInput } from 'react-native'

import firebase from 'firebase';

export class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: ''
        }
        
        this.onSignup = this.onSignup.bind(this)
    }

    onSignup() {
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(results => {
            console.log(results)
        })
        .catch(e => console.log(e))
    }

    render() {
        return (
            <View>
                <TextInput 
                    placeholder="Email"
                    onChangeText={(email) => this.setState({ email })}
                />
                <TextInput 
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password })}
                />

                <Button 
                    onPress={() => this.onSignup()}
                    title="Sign In"/>
            </View>
        )
    }
}

export default Login