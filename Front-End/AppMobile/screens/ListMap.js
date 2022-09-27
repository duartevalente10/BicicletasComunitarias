import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import api from '../services/Api';
import Constants from "expo-constants";
import { withNavigation } from 'react-navigation';
import MapView from 'react-native-maps';

//credential context
import { CredentialContext } from './../components/CredentialsContext';

// API client
import axios from 'axios';

//api url
import { baseAPIUrl } from '../components/shared';

// map function
function ListMap({ navigation }) {

  // bike params
  const [bicycles, setBicycles] = useState([])

  // total bikes
  const [total, setTotal] = useState(0)

  // aux vars
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  // load all bikes
  async function loadBicycles() {
    if (loading)
      return
    // do for all bikes
    if (total > 0 && bicycles.length === total)
      return
    setLoading(true)

    // ger bikes
    const response = await api.get('/bicicleta', {
      params: {
        page,
      }
    })

    // set vars values
    setBicycles([...bicycles, ...response.data])
    setTotal(response.headers['x-total-count'])
    setPage(page)
    setLoading(false)
  }

  // refresh page
  useEffect(() => {
    loadBicycles()
  }, [])

  //user data
  const { storedCredentials, setStoredCredentials } = useContext(CredentialContext);
  const { email } = storedCredentials;
  const [message, setMessage] = useState();

  // bike verifications
  const handleEstadoAluger = ({bicycle}) => {
    handleMessage(null);
    const url = `${ baseAPIUrl }/aluguer/verificaAluger`;
    var sendData = (({user: email,bike: bicycle.name}));
    // post to verify if the bike availability
    axios
    .post(url, sendData )
      .then((response) => {
        const result = response.data;
        const { message, status, data } = result;

        // verifications and respective navigations
        if (status == 'SUCCESS') {
          navigation.navigate('VerBicicleta', { bicycle }, { email: email });
          
        } else if (status == 'USING') {
          navigation.navigate("TerminarAluguer", { bicycle });
        } else {
          navigation.navigate("Unavailable", { bicycle });
        }

      })
      .catch((error) => {
        handleMessage("An error occurred. Check your network and try again");
      })
  }

  // error messege
  const handleMessage = (message) => {
    setMessage(message);
  };

  // Map View
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha uma bicicleta</Text>
      <View style={styles.MapContainer}>
      {!loading && <MapView style={{ height: "100%", width: "100%", borderRadius: 30, shadowOffset: {width: 16.4, height: 1.6}}}
        initialRegion={{
          latitude: 39.600,
          longitude: -8.400,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04
        }}
      >
        {bicycles.map(bicycle => {
          return (
            <MapView.Marker
              key={bicycle._id}
              coordinate={{
                latitude: parseFloat(bicycle.latitude),
                longitude: parseFloat(bicycle.longitude)
              }}

              title={bicycle.name}
              onPress={() => handleEstadoAluger({bicycle})}
            >
              <Image
                source={{ uri: bicycle.imageUrl }}
                style={{ width: 40, height: 30 }}
                resizeMode="stretch"
              />
            </MapView.Marker>
          );
        })}
      </MapView>
      }</View >
    </View >
  )
}

// Map styles
const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#86B049",
    alignItems: "center",
    flex: 1,
    overflow: 'hidden'
  },

  MapContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    height: '85%',
    width: '95%',
    borderRadius: 20,
    shadowOpacity: 0.4,
    elevation: 1.5,
    marginTop: 5,
    marginBottom: 5,
    shadowRadius: 1,
    shadowOffset: {height: 2, width: 0}
  },

  title: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: '600',
    alignSelf: "center",
    color: "white",
    margin: 20
  },

  imageLogo: {
    width: 150,
    height: 150,

  },

});

export default withNavigation(ListMap)
