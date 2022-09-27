import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import colors from "../colors";
import 'intl';
import 'intl/locale-data/jsonp/en';


const Fatura = ({ route, navigation }) => {

  //data bicicleta
  const bicycle = route.params.bicycle;
  //preco aluguer
  const precoTotal = route.params.precoTotal;
  //tempo do aluger
  const hoursUsed = route.params.hoursUsed;

  //view fatura
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.container2}>
          <Text style={styles.title} >Resumo</Text>
          <Image style={styles.productImg} source={{ uri: bicycle.imageUrl }} />
          <Text>Custo do aluguer:</Text>
          <Text style={styles.price}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'EUR' }).format(precoTotal)}</Text>
          <Text>Tempo de aluguer(min):</Text>
          <Text style={styles.title} >{hoursUsed}</Text>
        </View>
        <View style={styles.separator}></View>
        <TouchableOpacity
          style={styles.btn}
          mode="contained"
          onPress={() => navigation.navigate("ListMap")}
        >
          <Text style={styles.btnText}>Confirmar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>

  );
}

//Fatura Styles
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
  container2: {
    alignItems: 'center',
  },
  productImg: {
    width: 275,
    height: 230,
    margin: 20,
    alignItems: "center",
    borderRadius: 20
  },
  title: {
    fontSize: 28,
    color: "#696969",
    fontWeight: 'bold',
    textAlign: "center",
    marginTop: 20,
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

export default withNavigation(Fatura)