import { StyledFormArea, StyledFormButton, Avatar, StyledTitle, colors, ButtonGroup } from '../components/Styles'

import Logo from "./../assets/logo.png"

import { Formik, Form } from 'formik';
import { TextInput } from '../components/FormLib'
import * as Yup from 'yup'

import { FiCompass, FiLock, FiEdit, FiClock, FiLink } from 'react-icons/fi'

import { ThreeDots } from 'react-loader-spinner'

import { connect } from 'react-redux';
import { AddNovaBike } from '../auth/actions/userActions';

import { useHistory } from 'react-router-dom';

const NovaBike = ({AddNovaBike}) => {
    const history = useHistory();
    return (
        <div position= "relative"
        padding-top= "2em"
        margin-top= "70px">
            <StyledFormArea>
                <Avatar image={Logo} />
                <StyledTitle color={colors.theme} size={40}> Adicionar uma bicicleta</StyledTitle>
                <Formik
                    initialValues={{
                        name: "",
                        priceHour: "",
                        latitude: " ",
                        longitude: " ",
                        hoursUsed: " ",
                        available: " ",
                        imageUrl: "",
                    }}
                    validationSchema={
                        Yup.object({
                            name: Yup.string().required("Obrigatório"),
                            priceHour: Yup.number().required("Obrigatório"),
                            imageUrl: Yup.string().required("Obrigatório"),
                        })
                    }
                    onSubmit={(values, { setSubmitting, setFieldError}) => {
                        console.log(values);
                        AddNovaBike(values, history, setFieldError, setSubmitting)
                    }}
                >
                    {({ isSubmitting }) => (
                           <Form>
                            <TextInput
                                name="name"
                                type="text"
                                label="Nome"
                                placeholder="Nome da Bicicleta"
                                icon={<FiEdit />}
                            />

                            <TextInput
                                name="priceHour"
                                type="text"
                                label="Preço/Min"
                                placeholder="Preço/Hora"
                                icon={<FiClock />}
                            />

                        
                            <TextInput
                                name="imageUrl"
                                type="text"
                                label="Link da Imagem"
                                placeholder="link url"
                                icon={<FiLink />}
                            />

                            <ButtonGroup >
                                {!isSubmitting && <StyledFormButton
                                    type="submit" 
                                    to="/bicicletas"
                                >Adicionar</StyledFormButton>
                                }
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
            </StyledFormArea>
           
        </div>
    )
}

export default connect(null, {AddNovaBike})(NovaBike);