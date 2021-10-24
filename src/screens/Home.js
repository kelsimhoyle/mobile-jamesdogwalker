import React, { useContext, useState} from 'react';
import { Input, Button, Layout, Divider, Text } from '@ui-kitten/components';
import { AuthContext } from '../contexts/AuthContext';
import SignIn
 from '../auth/SignIn';
export const Home = ({ navigation }) => {
    const {user, signOut} = useContext(AuthContext)

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
           <Text>
               Home
           </Text>
           <Text>
               {user.username}
           </Text>

           <Button
           onPress={() => signOut()}
           >
               Sign Out
           </Button>
        </Layout>
    );
};
export default Home;