import React from 'react';

import {Colors} from './../components/styles';
const {primary, tertiary} = Colors;

// React navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import Login from './../screens/Login';
import Signup from './../screens/Signup';
import Welcome from './../screens/Welcome';
import Verification from './../screens/LinkVerification';
import VerBicicleta from './../screens/VerBicicleta';
import TerminarAluguer from './../screens/TerminarAluguer';
import ListMap from './../screens/ListMap';
import Fatura from './../screens/Fatura';
import Unavailable from './../screens/Unavailable';

//dados login
import { CredentialContext } from '../components/CredentialsContext';

const Stack = createNativeStackNavigator();

//navigation
const RootStack = () => {
    return(
        <CredentialContext.Consumer>
        {({storedCredentials}) => (
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: 'transparent'
                        },
                        headerTintColor: tertiary,
                        headerTransparent: true,
                        headerTitle: '',
                        headerLeftContainerStyle: {
                            paddingLeft: 20
                        }
                    }}
                    initialRouteName="Login"
                >
                {storedCredentials ? (
                        <Stack.Screen options={{headerTintColor: primary }} 
                        name='Welcome' component={Welcome} />
                       ) : ( 
                       <>
                            <Stack.Screen name='Login' component={Login} />
                            <Stack.Screen name='Signup' component={Signup} />
                            <Stack.Screen name='Verification' component={Verification} />
                            
                       </>
                    )}
                    <Stack.Screen name='VerBicicleta' component={VerBicicleta} />
                    <Stack.Screen name='TerminarAluguer' component={TerminarAluguer} />
                    <Stack.Screen name='Fatura' component={Fatura} />
                    <Stack.Screen name='Unavailable' component={Unavailable} />
                    <Stack.Screen name='ListMap' component={ListMap} />
                    
                </Stack.Navigator>
            </NavigationContainer> 
        )}
        </CredentialContext.Consumer>
    )
}

export default RootStack;