import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';

import {
    InnerContainer,
    PageTitle,
    SubTitle,
    StyledFormArea,
    StyledButton,
    ButtonText,
    Line,
    WelcomeContainer,
    WelcomeImage,
    Avatar,

} from './../components/styles';

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credential context
import { CredentialContext } from './../components/CredentialsContext';

const Welcome = ({navigation, route}) => {

    //context
    const { storedCredentials, setStoredCredentials } = useContext(CredentialContext);
    const { name, email } = storedCredentials;

    // logout
    const clearLogin = () => {
        AsyncStorage.removeItem('bikeSharingCredentials')
            .then(() => {
                setStoredCredentials("");
            })
            .catch(error => console.log(error))
    }

    // welcome view
    return (
        <>
            <StatusBar style="dark" />
            <InnerContainer>
                <WelcomeImage resizeMode="contain" source={require('./../assets/img/img5.png')} />
                <WelcomeContainer>
                    <PageTitle welcome={true}>Bem-Vindo! </PageTitle>
                    <SubTitle welcome={true}>{name || 'Nome'}</SubTitle>
                    <SubTitle welcome={true}>{email || 'E-mail'}</SubTitle>
                    <StyledFormArea>
                        <Avatar resizeMode="cover" source={require('./../assets/img/img4.png')} />
                        <Line />
                        <StyledButton onPress={clearLogin}>
                            <ButtonText>Logout</ButtonText>
                        </StyledButton>
                        <StyledButton onPress={() => navigation.navigate("ListMap")}>
                            <ButtonText>Procurar Bicicletas</ButtonText>
                        </StyledButton>
                    </StyledFormArea>
                </WelcomeContainer>
            </InnerContainer>
        </>
    );
};

export default Welcome;