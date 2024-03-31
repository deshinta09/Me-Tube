import { Button, Text, TextInput, View } from "react-native";
import { styles } from "./Login";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";

const input_user = gql`
mutation Mutation($name: String, $username: String, $email: String, $password: String, $img: String) {
  register(name: $name, username: $username, email: $email, password: $password, img: $img) {
    _id
    name
    username
    email
    img
  }
}`

export default function Register(){
    const navigation = useNavigation()
    const [name,setName] = useState('')
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [img,setImg] = useState('')

    const [sendInput, { loading,error }] = useMutation(input_user)

    async function handleRegister(){
        try {
            await sendInput({
                variables: {
                    "name": name,
                    "username": username,
                    "email": email,
                    "password": password,
                    "img": img
                  }
            })
            navigation.navigate("Login")
        } catch (error) {
            console.log(error);
        }
    }

    return <View style={{flex:1,alignItems:'center', justifyContent:'center'}}>
        <Text>Register</Text>
        <View style={{width:300}}>
            <TextInput
                style={styles.input}
                onChangeText={setName}
                value={name}
                placeholder="name"
            />
            <TextInput
                style={styles.input}
                onChangeText={setUsername}
                value={username}
                placeholder="username"
            />
            <TextInput
                style={styles.input}
                onChangeText={setImg}
                value={img}
                placeholder="picture"
            />
            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="email"
            />
            <TextInput
                secureTextEntry={true}
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder="password"
            />
        </View>
        <Button 
            onPress={handleRegister}
            title="Sign In"
            style={{width:50}}
        />
    </View>
}