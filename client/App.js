import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import client from './config/apollo';
import { ApolloProvider } from '@apollo/client';
import StackNavigation from './navigation/StackNavigation';
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { createContext, useEffect, useState } from 'react';
import { AuthContext } from './context/AuthContext';
import * as SecureStore from "expo-secure-store"

if (process.env.NODE_ENV !== 'production') {  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}

export default function App() {
  const [isLogin,setIsLogin] = useState(false)
  const [loading,setLoading] = useState(false)

  useEffect(()=>{
    async function checkToken (){
      try {
        setLoading(true)
        let token = await SecureStore.getItemAsync("access_token")
        if(token) setIsLogin(true)
      } catch (error) {
        console.log(error,'<- error cek token');
      } finally {
        setTimeout(()=>{
          setLoading(false)
        }, 1000)
      }
    }
    checkToken()
  },[])

  if(loading) return <View style={{flex:1, justifyContent:'center', alignItems:'center'}}><Text style={{fontSize:20}}>Welcome to Me Tube</Text></View>
  
  return (
    <AuthContext.Provider value={{isLogin,setIsLogin}}>
      <ApolloProvider client={client}>
      <NavigationContainer style={styles.container}>
        {/* <TabNavigator/> */}
        <StackNavigation/>
      </NavigationContainer>
      </ApolloProvider>
    </AuthContext.Provider>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  
  // <View style={styles.container}>
  //   <Text>Open up App.js to start working on your app!</Text>
  //   <Text>berubah!!!</Text>
  //   <StatusBar style="auto" />
  // </View>