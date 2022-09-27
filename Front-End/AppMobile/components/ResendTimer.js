import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {  InfoText, EmphasizeText, InLineGroup, TextLink, TextLinkContent, Colors } from '../components/styles';

//colors
const {brand} = Colors;

const ResendTimer = ({  activeResend, resendEmail, resendingEmail, resendStatus, timeLeft, targetTime }) => {
    return (
        <View>
            <InLineGroup>
                <InfoText>Não recebeu o email? </InfoText>

                {!resendingEmail && (
                    <TextLink 
                        style={{opacity: !activeResend && 0.5}}
                        disable={!activeResend} 
                        onPress={resendEmail}>
                    <TextLinkContent 
                        resendStatus={resendStatus}
                        style={{textDecorationLine: 'underline' }}
                        >
                     {resendStatus}
                    </TextLinkContent>
                    </TextLink>
                )}

                {resendingEmail && (
                    <TextLink 
                        disable
                    >
                    <TextLinkContent>
                            <ActivityIndicator color={brand}/>
                    </TextLinkContent>
                    </TextLink>
                )}
            </InLineGroup>
            {!activeResend && (
                <InfoText>
                 em <EmphasizeText>{timeLeft || targetTime}</EmphasizeText> segundo(s)
                </InfoText>
            )}
        </View>
    );
};

export default ResendTimer;