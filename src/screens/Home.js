import React, { useContext } from 'react';
import { Button, Layout, Text } from '@ui-kitten/components';
import { AuthContext } from '../contexts/AuthContext';

export const Home = ({ navigation }) => {
    const { user, signOut } = useContext(AuthContext)

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