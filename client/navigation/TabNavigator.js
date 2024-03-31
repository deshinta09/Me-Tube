const Tab = createBottomTabNavigator();
import { createBottomTabNavigator  } from '@react-navigation/bottom-tabs'

import AddPost from "../pages/AddPost"
import Home from "../pages/Home"
import Profile from "../pages/Profile"
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Search from '../pages/Search';

export default function TabNavigator(){
    return(
        <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} 
          options={{
            tabBarIcon:({focused, color, size})=>{
              return <Entypo name="home" size={size} color={color} />
            }
          }}
        />
        <Tab.Screen name="Search" component={Search}
          options={{
            tabBarIcon:({focused, color, size})=>{
              return <Feather name="search" size={size} color={color} />
            }
          }}
        />
        <Tab.Screen name="Add Post" component={AddPost}
          options={{
            tabBarIcon:({focused, color, size})=>{
              return <Entypo name="squared-plus" size={size} color={color} />
            }
          }}
        />
        <Tab.Screen name="Profile" component={Profile}
          options={{
            tabBarIcon:({focused, color, size})=>{
              return <FontAwesome5 name="user-alt" size={size} color={color} />
            }
          }}
        />
      </Tab.Navigator>
    )
}