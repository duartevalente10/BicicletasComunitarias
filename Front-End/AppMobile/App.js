import React, {useState} from 'react';

//console.disableYellowBox = true;

//React navigation screens
import RootStack from './navigators/RootStack';

// app loading
import AppLoading from 'expo-app-loading';

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credential context
import { CredentialContext } from './components/CredentialsContext';

// init
export default function App() {

  //aux vars
  const [appReady, setAppReady] = useState(false); 
  const [storedCredentials, setStoredCredentials] = useState("");

  // verify login
  const checkLoginCredentials = () => {
    AsyncStorage
      .getItem('bikeSharingCredentials')
      .then((result) => {
        if(result !== null) {
          setStoredCredentials(JSON.parse(result));
        }else {
          setStoredCredentials(null);
        }
      })
      .catch(error =>console.log(error))
  }

  // ready to launch view
  if(!appReady){
    return (
      <AppLoading 
        startAsync={checkLoginCredentials} 
        onFinish={() => setAppReady(true)}
        onError={console.warn}
      />)
  }

  // default view
  return (
    <CredentialContext.Provider value={{storedCredentials, setStoredCredentials}}>
      <RootStack />
    </CredentialContext.Provider>
  );
}
