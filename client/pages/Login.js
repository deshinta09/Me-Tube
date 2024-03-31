import Swal from 'sweetalert2'
import { gql, useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { TextInput, StyleSheet, View, Text, Button, ActivityIndicator } from "react-native";
import { AuthContext } from "../context/AuthContext";
import * as SecureStore from "expo-secure-store"

const login = gql`
    mutation Mutation($email: String, $password: String) {
    login(email: $email, password: $password) {
        access_token
    }
}
`

export default function Login (){
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigation = useNavigation()
    const [handlerLogin, { data, loading, error }] = useMutation(login)

    const value = useContext(AuthContext)
    // console.log(value,'<<- value');

    if(loading) return <ActivityIndicator style={{flex:1,justifyContent:'center', alignItems:'center'}} size="large" />

    if(error) return <Text style={{flex:1,justifyContent:'center'}}>error : {error.message}</Text>

    async function handlerSubmit(){
        try {
            // console.log({email,password});
            const result = await handlerLogin({
                variables: {
                    email: email,
                    password: password
                }
            })
            value.setIsLogin(true)
            await SecureStore.setItemAsync("access_token",result.data.login.access_token)
            // console.log(result.data.login.access_token,'<- hasilnya');
        } catch (error) {
            Swal.fire(error)
            console.log(error,'<- err login');
        }
    }
    return(
        <View style={{flex:1,alignItems:'center', justifyContent:'center'}}>
            <Text style={{fontSize:20}}>Login</Text>
            <View style={{width:300}}>
                <TextInput 
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="your email"
                />
                <TextInput 
                    secureTextEntry={true}
                    style={styles.input}
                    onChangeText={setPassword}
                    value={password}
                    placeholder="your password"
                />
            </View>
            <View style={{flexDirection:'row',gap:20}}>
                <Button 
                    onPress={handlerSubmit}
                    title="Login"
                />
                <Button
                    title="Sign In"
                    color="#a6bdde"
                    onPress={()=>navigation.navigate("Sign In")}
                />
            </View>
        </View>
    )
}

export const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderRadius: 20
    },
  });