import { StyledFormArea, StyledFormButton, AvatarLogo, StyledTitle, colors, ButtonGroup, ExtraText, TextLink, CopyrightText } from './../components/Styles'

import Logo from "./../assets/person.png"

import { Formik, Form } from 'formik';
import { TextInput } from './../components/FormLib'
import * as Yup from 'yup'

import { FiMail, FiLock, FiUser, FiCalendar } from 'react-icons/fi'

import { ThreeDots } from 'react-loader-spinner'

import { connect } from 'react-redux';
import { singupUser } from '../auth/actions/userActions';
import { useHistory } from 'react-router-dom';

const Singup = ({singupUser}) => {
    const history = useHistory();
    return (
        <div style={{ marginTop: '20px', marginBottom: '20px'}} position= "relative"
        padding-top= "2em"
        margin-top= "70px">
            <StyledFormArea>
                <AvatarLogo image={Logo} />
                <StyledTitle color={colors.theme} size={40}> Crie uma conta</StyledTitle>
                <Formik
                    initialValues={{
                        name: "",
                        email: "",
                        password: "",
                        reapeatPassword: "",
                        dateOfBirth: "",
                        
                    }}
                    validationSchema={
                        Yup.object({
                            email: Yup.string().email("Endereço de email inválido").required("Obrigatório"),
                            password: Yup.string().min(8, "A palavra-pass deve conter pelo menos 8 caracteres").max(30, "A palavra-pass é demasiado grande").required("Obrigatório"),
                            name: Yup.string().required("Obrigatório"),
                            dateOfBirth: Yup.date().required("Obrigatório"),
                            reapeatPassword: Yup.string().required("Obrigatório").oneOf([Yup.ref("password")], "As palavras-pass devem ser iguais")
                        })
                    }
                    onSubmit={(values, { setSubmitting, setFieldError}) => {
                        console.log(values);
                        singupUser(values, history, setFieldError, setSubmitting)
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <TextInput
                                name="name"
                                type="text"
                                label="Nome"
                                placeholder="Admin"
                                icon={<FiUser />}
                            />

                            <TextInput
                                name="email"
                                type="text"
                                label="Email Address"
                                placeholder="admin@gmail.com"
                                icon={<FiMail />}
                            />

                            <TextInput
                                name="dateOfBirth"
                                type="date"
                                label="Data de Nascimento"
                                icon={<FiCalendar />}
                            />

                            <TextInput
                                name="password"
                                type="password"
                                label="Password"
                                placeholder="*********"
                                icon={<FiLock />}
                            />

                            <TextInput
                                name="reapeatPassword"
                                type="password"
                                label="Repita a Password"
                                placeholder="*********"
                                icon={<FiLock />}
                            />

                            <ButtonGroup>
                                {!isSubmitting && <StyledFormButton
                                    type="submit">Registar
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
                    Já tem conta? <TextLink to="/login">Entrar</TextLink>
                </ExtraText>
            </StyledFormArea>
           
        </div>
    )
}

export default connect(null, {singupUser})(Singup);