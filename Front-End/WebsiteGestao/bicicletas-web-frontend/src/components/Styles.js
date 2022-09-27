import styled from 'styled-components';

//background
import backgound from './../assets/bg.png'

import {Link} from 'react-router-dom';

export const colors ={
    primary: "#fff",
    theme: "#86B049",
    light1: "#F3F4F6",
    light2: "#E5E7EB",
    dark1: "#1F2937",
    dark2: "#4B5563",
    dark3: "#9CA3AF",
    red: "#DC2626"
}

//Styled Container
export const StyledContainer = styled.div`
    margin: 0;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(0deg, rgba(134,176,73,0), rgba(134,176,73,0.2)), url(${backgound});
    background-size: cover;
    background-attachment: fixed;
`;

//Home
export const StyledTitle = styled.h2`
    font-size: ${(props) => props.size}px;
    text-align: center;
    color: #86b049;
    padding: 5px;
    margin-bottom: 20px;
`;

export const StyledSubTitle = styled.p`
    font-size: ${(props) => props.size}px;
    text-align: center;
    color: dark-grey;
    padding: 5px;
    margin-bottom: 25px;
`;

export const Avatar = styled.div`
    width: 155px;
    height: 130px;
    background-image: url(${props => props.image});
    background-size: cover;
    background-position: center;
    margin: auto;
    resizeMode: 'contain';
`;

export const AvatarLogo = styled.div`
    width: 100px;
    height: 130px;
    background-image: url(${props => props.image});
    background-size: cover;
    background-position: center;
    margin: auto;
    resizeMode: 'contain';
`;

export const StyledButton = styled(Link)`
    padding: 10px;
    width: 150px;
    background-color: transparent;
    font-size: 20px;
    border: 3px solid ${colors.theme};
    border-radius: 25px;
    color: ${colors.dark1};
    text-decoration: none;
    text-align: center;
    transition: ease-in-out 0.3s;
    outline: 0;

    &:hover{
        background-color: ${colors.theme};
        color: ${colors.primary};
        cursor: pointer; 
    }
`;

export const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    margin-top: 25px;
`;

export const StyledTextInput = styled.input`
    width: 280px;
    padding: 15px;
    padding-left: 50px;
    font-size: 17px;
    letter-spacing: 1px;
    border: 0;
    outline: 0;
    display: block;
    margin: 5px auto 10px auto;
    transition: ease-in-out 0.3s;

    ${(props) => props.invalid && 
        `background-color: #FF8888; color: ${colors.primary};`}

    &:focus {
        background-color: #e6efda;
        color: ${colors.dark1};
    }
`;

export const StyledLabel = styled.p`
    text-align: left;
    font-size: 13px;
    font-wight: bold;
`;

export const StyledFormArea = styled.div`
    background-color: ${props => props.bg || 
    colors.light1};
    text-align: center;
    padding: 45px 55px;
    resizeMode: 'cover';
    border-radius: 25px;
    box-shadow: 15px 10px 10px #86B049;
`;

export const StyledFormAreaUser = styled.div`
    background-color: ${props => props.bg || 
    colors.light1};
    text-align: center;
    padding: 45px 55px;
    resizeMode: 'center';
    bor
    
`;

export const StyledFormAreaTable = styled.div`
    background-color: ${props => props.bg || 
        colors.light1};
    text-align: center;
    padding: 45px 50px;
    resizeMode: 'cover';
`;


export const StyledFormButton = styled.button`
    padding: 10px;
    width: 150px;
    background-color: transparent;
    font-size: 20px;
    border: 2px solid ${colors.theme};
    border-radius: 25px;
    color: ${colors.theme};
    text-decoration: none;
    text-align: center;
    transition: ease-in-out 0.3s;
    outline: 0;

    &:hover{
        background-color: ${colors.theme};
        color: ${colors.primary};
        cursor: pointer; 
    }    
`;

export const ErrorMsg = styled.div`
    font-size: 11px;
    color: ${colors.red};
    margin-top: -5px;
    margin-bottom: 10px;
    text-align: left;
`;

export const ExtraText = styled.p`
    font-sise: ${(props) => props.size}px;
    text-align: center;
    color: ${(props) =>(props.color? props.color : colors.dark2)};
    padding: 2px;
    margin-top: 10px;
`;

export const StyledIcon = styled.p`
    color: ${colors.dark1};
    position: absolute;
    font-size: 21px;
    top: 35px;
    ${(props) => props.right && `right: 15px; `}
    ${(props) => !props.right && `left: 15px; `}
`;

export const TextLink = styled(Link)`
    text-decoration: none;
    color: ${colors.theme};
    transition: ease-in-out 0.3s;

    &:hover {
        text-decoration: underline;
        letter-spacing: 2px;
        font-wight: bold;
    }
`;

export const CopyrightText = styled.p`
    padding: 5px;
    margin: 20px;
    text-align: center;
    color: ${colors.dark1}
`;

export const MapStyle = {
    width: '100%',
    height: '100%'
};

export const Table = styled.div`
    width: '100%',
    height: '100%',
    text-align: center,
`;

export const td = styled.div`
    padding: 0px,
`;
export const th = styled.div`
    padding: 0px,
`;

export const StyledButton2 = styled(Link)`
    padding: 0px;
    width: 150px;
    background-color: transparent;
    font-size: 20px;
    border: 3px solid ${colors.theme};
    border-radius: 25px;
    color: ${colors.dark1};
    text-decoration: none;
    text-align: center;
    display: inline-flex;
    align-items: center; 
    justify-content: center;
    transition: ease-in-out 0.3s;
    outline: 0;
    

    &:hover{
        background-color: ${colors.theme};
        color: ${colors.primary};
        cursor: pointer; 
        text-decoration: none;
    }
`;