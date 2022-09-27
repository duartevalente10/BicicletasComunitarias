import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';

import { StyledContainer, TopHalf, BottomHalf, IconBg, PageTitle, InfoText, EmphasizeText, StyledButton, ButtonText, Colors } from '../components/styles';

//colors
const {brand, primary, green} = Colors;

// icons
import {Octicons, Ionicons} from '@expo/vector-icons';

// resend timer
import ResendTimer from './../components/ResendTimer';

// api client
import axios from 'axios';

// api route
import { baseAPIUrl } from '../components/shared';

//
const Verification = ({navigation, route}) => {

    // resend data 
    const [resendingEmail, setResendingEmail] = useState(false);
    const [resendStatus, setResendStatus] = useState('Resend');

    // resend timer
    const [timeLeft, setTimeLeft] = useState(null);
    const [targetTime, setTargetTime] = useState(null);

    // resend needed
    const [activeResend, setActiveResend] = useState(false);
    let resendTimerInterval;

    //user params
    const {email, userId} = route?.params;

    // time to resend email
    const calculateTimeLeft = (finalTime) => {
        const difference = finalTime - +new Date();
        if (difference >= 0) {   
            setTimeLeft(Math.round(difference / 1000));
        } else {
            setTimeLeft(null);
            clearInterval(resendTimerInterval);
            setActiveResend(true);

        }
    };

    // resend trigger
    const triggerTimer = (targetTimeInSeconds = 30) => {
        setTargetTime(targetTimeInSeconds);
        setActiveResend(false);
        const finalTime = +new Date() + targetTimeInSeconds * 1000;
        resendTimerInterval = setInterval(() => (
            calculateTimeLeft(finalTime), 1000
        ));
    };

    //refresh view
    useEffect(() => {
        triggerTimer();

        return () => {
            clearInterval(resendTimerInterval); 
        };
    }, []);

    // api post
    const resendEmail = async () => {
        setResendingEmail(true); 
        //make request
        const url = `${ baseAPIUrl }/user/resendVerificationLink`;
        try {
            await axios.post(url, {email, userId});
            setResendStatus('Sent!');
        } catch (error) {
            setResendStatus('Failed!');
            alert(`Resending email failed! ${ error.message }`);
        }
        setResendingEmail(false); 
        // hold on message
        setTimeout(() =>{
            setResendStatus('Resend');
            setActiveResend(false);
            triggerTimer();
        }, 5000);
    };

        //Verification View
        return <StyledContainer
                style={{
                    alignItems: 'center',
                }}
            > 
                <TopHalf>
                    <IconBg>
                        <StatusBar style="dark" />
                        <Octicons name="mail" size={125} color={brand} />
                    </IconBg>
                </TopHalf>
                <BottomHalf>
                    <PageTitle style={{fontSize: 25}} color> Bem-Vindo! </PageTitle>
                    <InfoText>
                        Por favor verifique o seu email através do link enviado para 
                        <EmphasizeText>{`${email}`}</EmphasizeText>
                    </InfoText>
                    <StyledButton
                        onPress={() => {navigation.navigate('Login', {email: email})}}
                        style={{backgroundColor: green, flexDirection: 'row'}}
                    >
                        <ButtonText>Continuar </ButtonText>
                        <Ionicons name="arrow-forward-circle" size={25} color={primary}/>
                    </StyledButton>
                    <ResendTimer
                        activeResend={activeResend}
                        resendingEmail={resendingEmail}
                        resendStatus={resendStatus}   
                        timeLeft={timeLeft}
                        targetTime={targetTime} 
                        resendEmail={resendEmail}   
                    />
                </BottomHalf>   
            </StyledContainer>;
};

export default Verification;