import React, { Fragment, useState, useContext } from 'react'
import { View, StyleSheet } from 'react-native'

// import { Input, ActionButton } from '../../components'
import { Input, Button, Layout, Divider, Text } from '@ui-kitten/components';

// import { Auth } from 'aws-amplify'

import { AuthContext } from '../contexts/AuthContext';

const SignUp = () => {
  const { signUp, confirmSignUp, stage } = useContext(AuthContext);
  const [state, setState] = useState({
    username: '',
    password: '',
    email: '',
    phone_number: '',
    authCode: '',
  });

  const { username, authCode, password, email, phone_number } = state


  const onChangeText = ({ key, value }) => {
    setState({ [key]: value })
  }


  return (
    <View style={styles.container}>
      {
        stage === Number(0) && (
          <Fragment>
            <Input
              placeholder='Username'
              type='username'
              onChangeText={onChangeText}
            />
            <Input
              placeholder='Password'
              type='password'
              onChangeText={onChangeText}
              secureTextEntry
            />
            <Input
              placeholder='Email'
              type='email'
              onChangeText={onChangeText}
            />

            <Input
              placeholder='Phone Number'
              type='phone_number'
              onChangeText={onChangeText}
            />
            <Button
              title='Sign Up'
              onPress={() => signUp(username, password, email, phone_number)}
            >
              Sign Up
            </Button>
          </Fragment>
        )
      }
      {
        stage === Number(1) && (
          <Fragment>
            <Input
              placeholder='Confirmation Code'
              type='authCode'
              onChangeText={onChangeText}
            />
            <ActionButton
              title='Confirm Sign Up'
              onPress={() => confirmSignUp(username, password, authCode)}
            />
          </Fragment>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
  },
  input: {
    backgroundColor: '#fcf3db',
    borderRadius: 30,
    height: 45
  }
})

export default SignUp;