import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import colors from "../colors";
import MapView from 'react-native-maps';
import 'intl';
import 'intl/locale-data/jsonp/en';
import { CredentialContext } from './../components/CredentialsContext';

//api
import axios from 'axios';
import { baseAPIUrl } from '../components/shared';

// terminar aluguer
const TerminarAluguer = ({ route, navigation }) => {

  // bike params
  const bicycle = route.params.bicycle;

  // bike 
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  // user data
  const { storedCredentials, setStoredCredentials } = useContext(CredentialContext);
  const { email } = storedCredentials;

  // close aluger
  const handleEstadoAluger = ({ bicycle }) => {
    handleMessage(null);
    const url = `${baseAPIUrl}/aluguer/closeAlugar`;
    var sendData = (({ user: email, bike: bicycle.name }));

    // api post para cancelar o aluger
    axios
      .post(url, sendData)
      .then((response) => {
        const result = response.data;
        const { message, status, precoTotal, hoursUsed } = result;

        if (status == 'SUCCESS') {
          navigation.navigate('Fatura', { bicycle, precoTotal: precoTotal, hoursUsed: hoursUsed });

        } else {
          handleMessage(message, status);
        }

      })
      .catch((error) => {
        handleMessage("An error occurred. Check your network and try again");
      })
  }

  // mensagem de erro
  const handleMessage = (message, type = 'FAILED') => {
    setMessage(message);
    setMessageType(type);
  };

  // view terminar aluguer
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.container2}>
          <Text style={styles.title} >{bicycle.name}</Text>
          <Image style={styles.productImg} source={{ uri: bicycle.imageUrl }} />
          <Text>Preço/Hora:</Text>
          <Text style={styles.price}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'EUR' }).format(bicycle.priceHour)}</Text>
        </View>
        <View style={styles.separator}></View>
        <TouchableOpacity
          style={styles.btn}
          mode="contained"
          onPress={() => handleEstadoAluger({ bicycle })}
        >
          <Text style={styles.btnText}>Terminar Aluger</Text>
        </TouchableOpacity>
        <View style={styles.MapContainer}>
          <MapView style={{ height: 130, width: "100%" }}
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
        </View>
      </ScrollView>
    </View>

  );
}

// styles terminar aluger
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 4,
    height: 200,
    borderRadius: 10,
  },

  MapContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    height: 130,
    width: '95%',
    borderRadius: 10,
    shadowOpacity: 0.4,
    elevation: 1.5,
    marginTop: 5,
    marginBottom: 5,
    shadowRadius: 1,
    shadowOffset: {height: 2, width: 0}
  },

  container2: {
    alignItems: 'center',
  },
  productImg: {
    width: 240,
    height: 200,
    margin: 20,
    alignItems: "center",
    borderRadius: 20
  },
  title: {
    fontSize: 28,
    color: "#696969",
    fontWeight: 'bold',
    textAlign: "center",
    marginTop: 25,
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
    backgroundColor: "#EF4444",
    padding: 5,
    color: colors.moon1000,
    borderRadius: 30,
    width: 300,
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

export default withNavigation(TerminarAluguer)