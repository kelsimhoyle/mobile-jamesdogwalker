import React, {useContext} from 'react'
import {
  View, Text, StyleSheet, Image, Dimensions, KeyboardAvoidingView, Platform
} from 'react-native'

import SignIn from './SignIn'
import SignUp from './SignUp'
import ForgotPassword from './ForgotPassword'

import { AuthContext } from '../contexts/AuthContext'

const { width } = Dimensions.get('window')

const Auth = () => {
  const {formType, setFormType} = useContext(AuthContext);

    const showSignIn = formType === 'showSignIn'
    const showSignUp = formType === 'showSignUp'
    const showForgotPassword = formType === 'showForgotPassword'

    return (
      <KeyboardAvoidingView
      style={styles.container}
        behavior={Platform.Os == "ios" ? "padding" : "height"}
      >
          <Text style={styles.title}>James the Dog Walker</Text>
          <Text style={styles.subtitle}>Tracking and Managing Dog Walks</Text>
          { showSignIn && (
            <SignIn
            // toggleAuthType={setFormType}
              // toggleAuthType={this.toggleAuthType}
              // updateAuth={() => setState({...state, formType: 'mainNav'})}
            />
          ) }
          { showSignUp && <SignUp /> }
          { showForgotPassword && <ForgotPassword /> }
          <View style={{ position: 'absolute', bottom: 40 }}>
            {
              showSignUp || showForgotPassword ? (
                <Text style={styles.bottomMessage}>Already signed up? <Text
                style={styles.bottomMessageHighlight}
                onPress={() => setFormType('showSignIn')}>&nbsp;&nbsp;Sign In</Text></Text>
              ) : (
                <Text style={styles.bottomMessage}>Need an account?
                  <Text
                    onPress={() => setFormType('showSignUp')}
                    style={styles.bottomMessageHighlight}>&nbsp;&nbsp;Sign Up</Text>
                </Text>
              )
            }
          </View>
      </KeyboardAvoidingView>
    )
  // }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40
  },  
  logo: {
    height: width / 2.5
  },
  title: {
    fontSize: 26,
    marginTop: 15,
    // fontFamily: 'SourceSansPro-SemiBold',
    color: '#e19f51'
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
    color: 'rgba(0, 0, 0, .75)',
    // fontFamily: 'SourceSansPro-Regular',
  },
  bottomMessage: {
    // fontFamily: 'SourceSansPro-Regular',
    fontSize: 18
  },
  bottomMessageHighlight: {
    color: '#f4a63b',
    paddingLeft: 10
  }
})

export default Auth