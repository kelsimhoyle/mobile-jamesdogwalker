import React, { useContext, useState} from 'react';
import { Input, Button, Layout, Divider, Text } from '@ui-kitten/components';
import {Context as AuthContext} from "../contexts/AuthContext";
import SignIn
 from '../auth/SignIn';
export const Login = ({ navigation }) => {

    // const [value, setValue] = useState({ username: "", password: "" });
    // const {state, signin} = useContext(AuthContext);


    // const singIn = () => {
    //     const {username, password} = value;
    //     console.log(username, password)

    //     if (!username || !password) return;

    //     signin({username, password})
    //    setTimeout(() => {
    //        console.log(state)
    //    }, 1000)

    // };
    return (
        <Layout style={{ alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
            <SignIn />
            {/* <Input
                label='Username'
                placeholder='Username'
                value={value.username}
                onChangeText={nextValue => setValue({ ...value, username: nextValue })}
                style={{ width: '80%', alignSelf: 'center', marginVertical: 20 }}
            />
            <Input
                label='Password'
                placeholder='Password'
                value={value.password}
                onChangeText={nextValue => setValue({ ...value, password: nextValue })}
                style={{ width: '80%', alignSelf: 'center', marginVertical: 20 }}
            />

            <Button
            onPress={() => singIn()}
            >
                Sign In
            </Button>

            <Divider
            style={{}}
             />
            <Text appearance='hint'>
                Don't have an account?
            </Text>
            <Button
                title="Sign Up"
                onPress={() => navigation.navigate('Sign Up')}
            >
                Sign Up
            </Button> */}
        </Layout>
    );
};
export default Login;