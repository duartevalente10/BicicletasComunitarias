import React, {useState, useContext} from 'react';
import { StatusBar } from 'expo-status-bar';

//formik
import {Formik} from 'formik';

// icons
import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons';

import { 
    StyledContainer, 
    InnerContainer, 
    PageLogo, 
    PageTitle,
    SubTitle,
    StyledFormArea,
    LeftIcon, 
    StyledInputLabel, 
    StyledTextInput, 
    RightIcon,
    StyledButton,
    ButtonText,
    MsgBox,
    Line,
    ExtraView,
    ExtraText,
    TextLink,
    TextLinkContent,
    Colors
} from './../components/styles';

//colors
const {brand, darkLight, primary} = Colors;

// keyboard avoiing view
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

// API client
import axios from 'axios';

import {View, ActivityIndicator} from 'react-native';

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credential context
import { CredentialContext } from './../components/CredentialsContext';

const Login = ({navigation, route}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    
    //user cardentials
    const {storedCredentials, setStoredCredentials} = useContext(CredentialContext);

    // api post to login
    const handleLogin = (credentials, setSubmitting) => {
        handleMessage(null);
        const url = 'https://server-comunity-bikes.herokuapp.com/user/signin';
        axios
            .post(url, credentials)
            .then((response) => {
                const result = response.data;
                const {message, status, data} = result;

                if(status !== 'SUCCESS'){
                    handleMessage(message, status);
                }else{
                    persistLogin({ ...data[0] }, message, status);
                }
                setSubmitting(false);
            })
            .catch((error) => {
            setSubmitting(false);
            handleMessage("An error occurred. Check your network and try again");
        })
    }

    // error message
    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }

    // continue to try to login
    const persistLogin = (credentials, message, status) => {
        AsyncStorage.setItem('bikeSharingCredentials', JSON.stringify(credentials))
        .then(() => {
            handleMessage(message, status);
            setStoredCredentials(credentials);
        })
        .catch((error) =>{
            console.log(error);
            handleMessage('Persisting login failed');
        })
    }

    // login view
    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>
                <PageLogo resizeMode="cover" source={require('./../assets/img/299235.png')} />
                <PageTitle>Bike Sharing</PageTitle>
                <SubTitle>Login</SubTitle>
                <Formik
                    initialValues={{ email: route?.params?.email, password: '' }}
                    enableReinitialize={true} 
                    onSubmit={(values, {setSubmitting}) => {
                        if (values.email == '' || values.password == ''){
                            handleMessage('Preencha todos os campos');
                            setSubmitting(false);
                        }else {
                            handleLogin(values, setSubmitting);
                        }
                    }}
                >
                    {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (<StyledFormArea>
                    <MyTextInput
                        label="E-mail"
                        icon="mail"
                        placeholder="E-mail"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        keyboardType="email-address"
                    />
                    <MyTextInput
                        label="Palavra-Passe"
                        icon="lock"
                        placeholder="* * * * * * * * * *"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        secureTextEntry={hidePassword}
                        isPassword={true}
                        hidePassword={hidePassword}
                        setHidePassword={setHidePassword}
                    />
                    <MsgBox type={messageType}>{message}</MsgBox>
                    {!isSubmitting && (
                    <StyledButton onPress={handleSubmit}>
                        <ButtonText>Login</ButtonText>
                    </StyledButton>
                    )}

                    {isSubmitting && (
                    <StyledButton disabled={true}>
                        <ActivityIndicator size="large" color={primary} />
                    </StyledButton>
                    )}

                    <Line />
                    
                    <ExtraView>
                        <ExtraText>Ainda não tem conta?</ExtraText>
                        <TextLink onPress={() => navigation.navigate("Signup")}>
                            <TextLinkContent> Registar</TextLinkContent>
                        </TextLink>
                    </ExtraView>
                </StyledFormArea>
                )}
                </Formik>
            </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
};

// vormik input view
const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, ...props}) => {
    return(
    <View>
        <LeftIcon>
          <Octicons name={icon} size={30} color={brand} />
        </LeftIcon>
        <StyledInputLabel>{label}</StyledInputLabel>
        <StyledTextInput {...props} />
        {isPassword && (
            <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
            </RightIcon>
        )}
    </View>
    );
};

export default Login;