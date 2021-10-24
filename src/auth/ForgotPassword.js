import React, {useContext, useState} from 'react'
import {
  View, Text, StyleSheet, Image, Dimensions
} from 'react-native'
// import { Input, ActionButton } from '../../components'
import { Input, Button, Layout, Divider} from '@ui-kitten/components';
import { AuthContext } from '../contexts/AuthContext';

import { Auth } from 'aws-amplify'

const ForgotPassword = () => {
  const { resetPassword, confirmResetPassword, stage} = useContext(AuthContext);

  const [state, setState] = useState({
    username: '',
    email: '',
    password: '',
    authorizationCode: ''
  })
  

    return (
      <View>
        { stage === Number(0) && (
          <View>
            <Input
              onChangeText={onChangeText}
              type='username'
              placeholder='Username'
            />
            <Button
              title='Get authorization code'
              onPress={() => resetPassword(state.username)}
            >
              Reset Password
              </Button>
          </View>
        )}
        { stage === Number(1) && (
          <View>
            <Input
              onChangeText={onChangeText}
              type='authorizationCode'
              placeholder='Authorization Code'
            />
            <Input
              onChangeText={onChangeText}
              type='password'
              placeholder='New Password'
              secureTextEntry
            />
            <Button
              title='Reset Password'
              onPress={() => confirmResetPassword(state.username, state.password, state.authorizationCode)}
            >
              Reset Password
              </Button>
          </View>
        )}
      </View>
    )
  }


export default ForgotPassword;