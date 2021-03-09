import React, { Component } from 'react'
import { Text, View, Button, TextInput } from 'react-native'

import firebase from 'firebase';

export class Register extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            name: ''
        }
        
        this.onSignup = this.onSignup.bind(this)
    }

    onSignup() {
        const { email, password, name } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(results => {
            firebase.firestore().collection("users")
            .doc(firebase.auth().currentUser.uid)
            .set({
                name,
                email
            })
            console.log(results)
        })
        .catch(e => console.log(e))
    }

    render() {
        return (
            <View>
                <TextInput 
                    placeholder="Name"
                    onChangeText={(name) => this.setState({ name })}
                />
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
                    title="Sign Up"/>
            </View>
        )
    }
}

export default Register