import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Button, Image, ScrollView } from 'react-native';
import { NavigationEvents, withNavigation } from 'react-navigation';
import { StatusBar } from 'expo-status-bar';
import colors from "../colors";
import MapView from 'react-native-maps';
import 'intl';
import 'intl/locale-data/jsonp/en';

// icons
import { Octicons } from '@expo/vector-icons';

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
const { brand, darkLight, primary } = Colors;

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

// unavailable page
const Unavailable = ({ route, navigation }) => {

    // bike data
    const [bicycles, setBicycles] = useState([])

    // total bikes
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    // load bikes
    async function loadBicycles() {
        if (loading)
            return
        if (total > 0 && bicycles.length === total)
            return
        setLoading(true)

        const response = await api.get('/bicicleta', {
            params: {
                page,
            }
        })

        setBicycles([...bicycles, ...response.data])
        setTotal(response.headers['x-total-count'])
        setPage(page)
        setLoading(false)
    }

    useEffect(() => {
        loadBicycles()
    }, [])

    //context
    const { storedCredentials, setStoredCredentials } = useContext(CredentialContext);
    const { email } = storedCredentials;

    const bicycle = route.params.bicycle;

    // unavailable view
    return (
        <ScrollView>
            <KeyboardAvoidingWrapper>
                <StyledContainer>
                    <StatusBar style="dark" />
                    <InnerContainer>
                        <Text style={styles.title} >Bicicleta em uso</Text>
                        <Text style={styles.espaço} ></Text>
                        <Text style={styles.title2}>Esta bicicleta já se encontra alugada.</Text>
                        <Text style={styles.title2}>Por favor, escolha outra.</Text>
                        <Image style={styles.productImg} source={require('../assets/img/pngwing.com.png')} />
                        <MapView style={{ height: 250, width: "100%" }}
                            initialRegion={{
                                latitude: bicycle.latitude,
                                longitude: bicycle.longitude,
                                latitudeDelta: 0.09,
                                longitudeDelta: 0.04
                            }}
                            onPress={() => { navigation.navigate('ListMap') }}
                        >
                            <MapView.Marker
                                key={bicycle._id}
                                coordinate={{
                                    latitude: bicycle.latitude,
                                    longitude: bicycle.longitude
                                }}
                            >
                                <Image
                                    source={{ uri: bicycle.imageUrl }}
                                    style={{ width: 40, height: 30 }}
                                    resizeMode="stretch"
                                />
                            </MapView.Marker>
                        </MapView>
                        <StyledButton onPress={() => navigation.navigate("ListMap")} >
                            <ButtonText>Procurar outra bicicleta</ButtonText>
                        </StyledButton>
                    </InnerContainer>
                </StyledContainer>
            </KeyboardAvoidingWrapper>
        </ScrollView>
    );
}

// formik input view
const MyTextInput = ({ label, icon, ...props }) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
        </View>

    );
};

// unavailable styles
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
        width: 220,
        height: 240,
        margin: 20,
        alignItems: "center",
        resizeMode:"cover",
        borderRadius: 20
      },
    title: {
        fontSize: 28,
        color: "#696969",
        fontWeight: 'bold',
        textAlign: "center",
    },
    espaço: {
        fontSize: 15,
        color: "#696969",
        fontWeight: 'bold',
        textAlign: "center",
    },
    title2: {
        fontSize: 15,
        color: "#595959",
        fontWeight: 'normal',
        textAlign: "center",
      },
    price: {
        marginTop: 10,
        fontSize: 18,
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
export default withNavigation(Unavailable)