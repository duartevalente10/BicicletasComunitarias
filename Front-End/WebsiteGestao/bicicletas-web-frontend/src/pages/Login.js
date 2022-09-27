import { StyledFormArea, StyledFormButton, StyledTitle, colors, ButtonGroup, ExtraText, TextLink, CopyrightText } from './../components/Styles'

import {Formik, Form} from 'formik';
import {TextInput} from './../components/FormLib'
import * as Yup from 'yup'

import{FiMail, FiLock} from 'react-icons/fi'

import { ThreeDots } from  'react-loader-spinner'  

import { connect } from 'react-redux';
import { loginUser } from '../auth/actions/userActions';
import { useHistory } from 'react-router-dom';

const Login = ({loginUser}) => {
    const history = useHistory();
    return (
        <div>
            <StyledFormArea>
                <StyledTitle color = {colors.theme} size={40}> Efetue Login</StyledTitle>
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                    validationSchema={
                        Yup.object({
                            email: Yup.string().email("Endereço de email inválido").required("Obrigatório"),
                            password: Yup.string().min(8, "A palavra-pass deve conter pelo menos 8 caracteres").max(30, "A palavra-pass é demasiado grande").required("Obrigatório")
                        })
                    }
                    onSubmit={(values, {setSubmitting ,setFieldError}) => {
                        console.log(values);
                        loginUser(values, history, setFieldError, setSubmitting)
                    }}
                >
                    {({isSubmitting}) => (
                        <Form>
                            <TextInput
                                name="email"
                                type="text"
                                label="Email Address"
                                placeholder="admin@gmail.com"
                                icon={<FiMail/>}
                            />

                            <TextInput
                                name="password"
                                type="password"
                                label="Password"
                                placeholder="*********"
                                icon={<FiLock/>}
                            />  

                            <ButtonGroup>
                                {!isSubmitting && <StyledFormButton 
                                type="submit">Login
                                </StyledFormButton>}
                                {isSubmitting && (
                                    <ThreeDots
                                        color={colors.theme}
                                        height={49}
                                        widht={100}
                                    />
                                )}
                            </ButtonGroup>
                        </Form>
                    )}
                </Formik>
                <ExtraText>
                     Ainda não tem conta? <TextLink to="/singup">Registar</TextLink>
                </ExtraText>
            </StyledFormArea>
            
        </div>
    )
}

export default connect(null, {loginUser})(Login);