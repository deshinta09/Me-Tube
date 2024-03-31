import { createNativeStackNavigator } from "@react-navigation/native-stack"
import DetailPost from "../pages/DetailPost"
import TabNavigator from "./TabNavigator"
import Login from "../pages/Login"
import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import Register from "../pages/Register"
import Followers from "../pages/Followers"
import Followings from "../pages/Following"

const Stack = createNativeStackNavigator()

export default function StackNavigation(){
    const value = useContext(AuthContext)
    return <Stack.Navigator>
        {
            value.isLogin ? <>
        <Stack.Screen name="Me Tube" options={{headerShown:false}} component={TabNavigator}/>
        <Stack.Screen name="Post" component={DetailPost}/>
        <Stack.Screen name="Followers" component={Followers} />
        <Stack.Screen name="Following" component={Followings} />
            </> : <>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Sign In" component={Register} />
            </>
        }
        {/* <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Me Tube" component={TabNavigator}/>
        <Stack.Screen name="Post" component={DetailPost}/> */}

    </Stack.Navigator>
}