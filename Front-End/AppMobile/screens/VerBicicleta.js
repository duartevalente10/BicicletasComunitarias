import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Button, Image, ScrollView } from 'react-native';
import { NavigationEvents, withNavigation } from 'react-navigation';
import { StatusBar } from 'expo-status-bar';
import colors from "../colors";
import MapView from 'react-native-maps';
import 'intl';
import 'intl/locale-data/jsonp/en';

//formik
import {Formik} from 'formik';

// icons
import {Octicons} from '@expo/vector-icons';

// styles
import { 
  StyledContainer, 
    InnerContainer, 
    StyledFormArea,
    LeftIcon, 
    StyledInputLabel, 
    StyledTextInput, 
    StyledButton,
    ButtonText,
    MsgBox,
    Colors
} from './../components/styles';

//colors
const {brand, darkLight, primary} = Colors;

// keyboard avoiding view
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credential context
import { CredentialContext } from './../components/CredentialsContext';


// API 
import axios from 'axios';
import api from '../services/Api';
import { baseAPIUrl } from '../components/shared';

// ver bicicleta
const VerBicicleta = ({ route, navigation }) => {

  // bike data
  const [bicycles, setBicycles] = useState([])

  // total bikes
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

// load all bikes
  async function loadBicycles() {
    if (loading)
      return
    if (total > 0 && bicycles.length === total)
      return
    setLoading(true)

    // api get all bikes
    const response = await api.get('/bicicleta', {
      params: {
        page,
      }
    })

    // set vars
    setBicycles([...bicycles, ...response.data])
    setTotal(response.headers['x-total-count'])
    setPage(page)
    setLoading(false)
  }

  //refresh view
  useEffect(() => {
    loadBicycles()
  }, [])

  //user data
  const { storedCredentials, setStoredCredentials } = useContext(CredentialContext);
  const { email } = storedCredentials;

  // bike data from previous route
  const bicycle = route.params.bicycle;

  //aux vars
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  // form handling
  const handleAluguer = (credentials, setSubmitting) => {
    handleMessage(null);
    const url = `${ baseAPIUrl }/aluguer/addAlugar`;

    // api post to create a new aluguer 
    axios
        .post(url, credentials)
        .then((response) => {
            const result = response.data;
            const {message, status, data} = result;

            // conditions and navigation to the result
            if(status !== 'SUCCESS'){
                handleMessage(message, status);
                
            }else{
              navigation.navigate("TerminarAluguer", {bicycle});
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

// View
  return (
      <ScrollView>
        <KeyboardAvoidingWrapper>
            <StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>
            <Text style={styles.title} >Aluguer</Text>
            <Text style={styles.title2}>Preço/Hora:</Text>
            <Text style={styles.price}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'EUR' }).format(bicycle.priceHour)}</Text>
            <Image style={styles.productImg} source={{uri: bicycle.imageUrl}} />

                <Formik
                    initialValues={{ user: email, bike: route?.params?.bicycle.name }}
                    enableReinitialize={true} 
                    onSubmit={(values, {setSubmitting}) => {
                        if (values.user == '' || values.bike == ''){
                            handleMessage('Preencha todos os campos');
                            setSubmitting(false);
                        }else {
                          handleAluguer(values, setSubmitting);

                        }
                    }}
                >
                    {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (<StyledFormArea>
                    <MyTextInput
                        label="Bicicleta"
                        icon="tag"
                        placeholder="Bicicleta"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange('bike')}
                        onBlur={handleBlur('bike')}
                        value={values.bike}
                        editable={false}
                    />
                    <MyTextInput
                        label="Utilizador"
                        icon="mail"
                        placeholder="Utilizador"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange('user')}
                        onBlur={handleBlur('user')}
                        value={values.user}
                        editable={false}
                    />
                    
                    <MsgBox type={messageType}>{message}</MsgBox>
                    {!isSubmitting && (
                    <StyledButton onPress={handleSubmit} >
                          <ButtonText>Alugar</ButtonText>
                    </StyledButton>
                    )}

                    {isSubmitting && (
                    <StyledButton disabled={true}>
                        <ActivityIndicator size="large" color={primary} />
                    </StyledButton>
                    )}

                </StyledFormArea>
                )}
                
          </Formik>
            </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
      </ScrollView>
  );
}

// formik input view
const MyTextInput = ({label, icon, ...props}) => {
    return(
    <View>
        <LeftIcon>
          <Octicons name={icon} size={30} color={brand} />
        </LeftIcon>
        <StyledInputLabel>{label}</StyledInputLabel>
        <StyledTextInput {...props} />
    </View>
  
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 4,
    height: 200,
    borderRadius: 10,
  },
  container2: {
    alignItems: 'center',
  },
  productImg: {
    width: 240,
    height: 200,
    margin: 20,
    alignItems: "center",
    resizeMode:"cover",
    borderRadius: 20
  },
  title: {
    fontSize: 35,
    color: "#696969",
    fontWeight: 'bold',
    textAlign: "center",
  },
  title2: {
    fontSize: 20,
    color: "#595959",
    fontWeight: 'bold',
    textAlign: "center",
  },
  price: {
    marginTop: 10,
    fontSize: 20,
    color: "#86B049",
    fontWeight: 'bold',
    textAlign: "center",

  },
  description: {
    textAlign: 'center',
    marginTop: 10,
    color: "#696969",
  },

  separator: {
    height: 2,
    backgroundColor: "#eeeeee",
    marginTop: 20,
    marginHorizontal: 30
  },

  btn: {
    marginVertical: 30,
    backgroundColor: "#86B049",
    padding: 5,
    color: colors.moon1000,
    borderRadius: 30,
    width: 125,
    alignSelf: 'center',

  },
  btnText: {
    fontSize: 20,
    padding: 7,
    color: "white",
    textAlign: "center",
    fontWeight: 'bold',
    alignSelf: "center"
  }

});
export default withNavigation(VerBicicleta)