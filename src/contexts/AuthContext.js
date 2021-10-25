import React, { createContext, useState } from 'react';
import { Auth } from 'aws-amplify'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentView, setCurrentView] = useState("initializing");
  const [formType, setFormType] = useState("showSignIn");
  const [user, setUser] = useState({});
  const [stage, setStage] = useState(0);

  const values = {
    currentView,
    formType,
    user,
    stage,
    setFormType,
    toggleAuthType: newFormType => setFormType(newFormType),
    updateAuth: newView => setCurrentView(newView),
    signIn: async (username, password) => {
      console.log(username, password)
      try {
        await Auth.signIn(username, password)
        console.log('successfully signed in')
        const currentUser = await Auth.currentAuthenticatedUser()
        setUser(currentUser.attributes)
        setCurrentView("MainNav")
      } catch (err) {
        console.log('error signing in...', err)
      }
    },
    showForgotPassword: () => {
      setFormType('showForgotPassword')
    },
    checkAuth: async () => {
      try {
        const currentUser = await Auth.currentAuthenticatedUser()
        console.log('user is signed in')
        setUser(currentUser)
        setCurrentView('MainNav')
      } catch (err) {
        console.log('user is not signed in')
        setCurrentView("auth")
      }
    },
    resetPassword: async (username) => {
      Auth.forgotPassword(username)
        .then(() => {
          setStage(1)
        })
        .catch(err => {
          console.log('error: ', err)
        })
    },
    confirmResetPassword: async (username, password, authorizationCode) => {
      Auth.forgotPasswordSubmit(username, authorizationCode, password)
        .then(() => {
          setFormType('showSignIn')
        })
        .catch(err => console.log('error resetting password:', err))
    },
    signUp: async (username, password, email, phone_number) => {
      try {
        await Auth.signUp({ username, password, attributes: { email, phone_number } })
        console.log('successful sign up..')
        setStage(1)
      } catch (err) {
        console.log('error signing up...', err)
      }
    },
    confirmSignUp: async (username, authCode) => {
      try {
        await Auth.confirmSignUp(username, authCode)
        setFormType('showSignIn')
      } catch (err) {
        console.log('error signing up...', err)
      }
    },
    signOut: async () => {
      try {
        await Auth.signOut()
        console.log('signed out')
        setCurrentView('auth')
        setUser({})
      } catch (err) {
        console.log('error signing out...', err)
      }
    }
  }


  return (
    <AuthContext.Provider
      value={values}
    >
      {children}
    </AuthContext.Provider>)
}

