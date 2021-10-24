import React, { useContext, useState } from 'react'
import { View, TouchableHighlight, StyleSheet } from 'react-native'
import { Input, Button, Layout, Divider, Text } from '@ui-kitten/components';


// import { Input, ActionButton } from '../../components'
import { AuthContext } from '../contexts/AuthContext'

const SignIn = () => {
  const { signIn, showForgotPassword } = useContext(AuthContext);

  const [state, setState] = useState({ username: "", password: "" });
  const { username, password } = state;

  onChangeText = (key, value) => {
    setState({ [key]: value })
  }
  // signIn = async () => {
  //   const { username, password } = this.state
  //   try {
  //     await Auth.signIn(username, password)
  //     console.log('successfully signed in')
  //     this.props.updateAuth('MainNav')
  //   } catch (err) {
  //     console.log('error signing in...', err)
  //   }
  // }
  // showForgotPassword = () => {
  //   toggleAuthType('showForgotPassword')
  // }
  // render() {
  return (
    <View>
      <Input
        onChangeText={val => setState({ ...state, username: val })}
        type='username'
        placeholder='Username'
        name="username"
      />
      <Input
        onChangeText={val => setState({ ...state, password: val })}
        type='password'
        placeholder='Password'
        name="password"
        secureTextEntry
      />
      <Button
        title='Sign In'
        onPress={() => signIn(username, password)}
      >
        Sign In
      </Button>
      <View style={styles.buttonContainer}>
        <TouchableHighlight onPress={() => showForgotPassword()}>
          <Text>Forget your password?</Text>
        </TouchableHighlight>
      </View>
    </View>
  )
  // }
}

const styles = StyleSheet.create({
  buttonContainer: {
    paddingTop: 15,
    justifyContent: 'center',
    flexDirection: 'row'
  }
})

export default SignIn