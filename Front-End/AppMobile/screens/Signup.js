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
import {View, TouchableOpacity, ActivityIndicator} from 'react-native';

//colors
const {brand, darkLight, primary} = Colors;

//DateTimePicker
import DateTimePicker from '@react-native-community/datetimepicker';

// keyboard avoiding view
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

// api client
import axios from 'axios';

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credential context
import { CredentialContext } from './../components/CredentialsContext';

// api route
import { baseAPIUrl } from '../components/shared';


const Signup = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date(2000, 0, 1));

    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    
    //Actual date of birth to be sent
    const [dob, setDob] = useState();

    //context
    const {storedCredentials, setStoredCredentials} = useContext(CredentialContext);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        setDob(currentDate);
    }

    const showDatePicker = () => {
        setShow(true);
    }

    // form handling
    const handleSignup = (credentials, setSubmitting) => {
        handleMessage(null);
        const url = `${ baseAPIUrl }/user/signup`;
        axios
            .post(url, credentials)
            .then((response) => {
                const result = response.data;
                const {message, status, data} = result;

                if(status !== 'PENDING'){
                    handleMessage(message, status);
                }else{
                    navigation.navigate('Verification', { ...data });
                    //persistLogin({ ...data }, message, status);
                }
                setSubmitting(false);
            })
            .catch((error) => {
            console.log(error.JSON());
            setSubmitting(false);
            handleMessage("An error occurred. Check your network and try again");
        })
    }

    // error message
    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    };

    // presist to login
    const persistLogin = (credentials, message, status) => {
        AsyncStorage.setItem('bikeSharingCredentials', JSON.stringify(credentials))
        .then(() => {
            handleMessage(message, status);
            setStoredCredentials(credentials);
        })
        .catch((error) =>{
            console.log(error);
            handleMessage('Persisting login failed')
        })
    }

    // Signup view
    return (

        <KeyboardAvoidingWrapper>
            <StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>
                <PageTitle>Bike Sharing</PageTitle>
                <SubTitle>Registar</SubTitle>

                {show && (
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode='date'
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    />
                )}

                <Formik
                    initialValues={{ name: '', email: '', dateOfBirth:'', password: '', confirmPassword: ''}}
                    onSubmit={(values, {setSubmitting}) => {
                        values = {...values, dateOfBirth: dob};
                        if (
                            values.email == '' || 
                            values.password == '' || 
                            values.name == '' || 
                            values.dateOfBirth == '' || 
                            values.confirmPassword == ''
                        ){
                            handleMessage('Please fill all the fields');
                            setSubmitting(false);
                        } else if (values.password != values.confirmPassword) {
                            handleMessage('Passwords do not match');
                            setSubmitting(false);
                        }
                        else {
                            handleSignup(values, setSubmitting);
                        }
                    }}
                >
                    {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (<StyledFormArea>
                    <MyTextInput
                        label="Nome"
                        icon="person"
                        placeholder="Nome"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name}
                    />
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
                        label="Data de Nascimento"
                        icon="calendar"
                        placeholder="Selecionar data"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange('dateOfBirth')}
                        onBlur={handleBlur('dateOfBirth')}
                        value={dob ? dob.toDateString() : ''}
                        isDate={true}
                        editable={false}
                        showDatePicker={showDatePicker}
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
                    <MyTextInput
                        label="Confirmar Palavra-Passe"
                        icon="lock"
                        placeholder="* * * * * * * * * *"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange('confirmPassword')}
                        onBlur={handleBlur('confirmPassword')}
                        value={values.confirmpassword}
                        secureTextEntry={hidePassword}
                        isPassword={true}
                        hidePassword={hidePassword}
                        setHidePassword={setHidePassword}
                    />
                    <MsgBox type={messageType}>{message}</MsgBox>

                    {!isSubmitting && (
                    <StyledButton onPress={handleSubmit}>
                        <ButtonText>Registar</ButtonText>
                    </StyledButton>
                    )}

                    {isSubmitting && (
                    <StyledButton disabled={true}>
                        <ActivityIndicator size="large" color={primary} />
                    </StyledButton>
                    )}

                    <Line />
                    <ExtraView>
                        <ExtraText>Already have an account?</ExtraText>
                        <TextLink onPress={() => navigation.navigate("Login")} >
                            <TextLinkContent> Login</TextLinkContent>
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

// formik input view
const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, isDate, showDatePicker, ...props}) => {
    return(
    <View>
        <LeftIcon>
          <Octicons name={icon} size={30} color={brand} />
        </LeftIcon>
        <StyledInputLabel>{label}</StyledInputLabel>
        {!isDate && <StyledTextInput {...props} />}
        {isDate && (
            <TouchableOpacity onPress={showDatePicker}>
              <StyledTextInput {...props} />
            </TouchableOpacity>
            )}
        {isPassword && (
            <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
            </RightIcon>
        )}
    </View>
    );
};

export default Signup;