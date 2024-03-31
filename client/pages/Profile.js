import { Text, View, Image, Dimensions, Button, ActivityIndicator } from "react-native"
import * as SecureStore from "expo-secure-store"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { gql, useQuery } from "@apollo/client"
import { useNavigation } from "@react-navigation/native"

const screenHeigh =  Dimensions.get('window').height
const screenWidth =  Dimensions.get('window').width

const get_user = gql`
query GetFollowers {
  getUserById {
    _id
    name
    username
    email
    img
  }
}
`

export default function Profile(){
    const navigation = useNavigation()
    const { setIsLogin } = useContext(AuthContext)
    const { data ,loading, error, refetch } = useQuery(get_user)
    
    if(loading) return <ActivityIndicator style={{flex:1,justifyContent:'center', alignItems:'center'}} size="large" />

    if(error) return <Text style={{flex:1,justifyContent:'center'}}>error : {error.message}</Text>
    // console.log(data,'<-all data');

    async function handlerLogout(){
        try {
            await SecureStore.deleteItemAsync("access_token")
            setIsLogin(false)
            refetch()
        } catch (error) {
            console.log(error,'<-err logout');
        }
    }

    return<>
        <View style={{height: screenHeigh}}>
            {/* buttom logout */}
            <View style={{width:screenWidth, backgroundColor:'white'}}>
                <View style={{width: screenHeigh/9, marginLeft:250}}>
                    <Button onPress={handlerLogout} title="LogOut" color="red" />
                </View>
            </View>

            {/* nama + profile uaer */}
            <View style={{flexDirection:"row", padding:20, gap:20, backgroundColor:'white'}}>
                <Image style={{height:90, width:90, borderRadius:50}} source={{uri:data?.getUserById?.img}}/>
                <View style={{padding:10}}>
                    <Text style={{ fontSize:30,fontWeight: 'bold' }}>{data?.getUserById?.username}</Text>
                    <Text style={{ fontSize:14 }}>{data?.getUserById?.email}</Text>
                </View>
            </View>

            {/* button follower and following */}
            <View style={{flexDirection:'row', justifyContent:'space-around'}}>


                <View style={{width: screenWidth/2, padding:20}}>
                    <Button title="Follower"  color="#235ee8" onPress={()=>navigation.navigate("Followers")}/> 
                </View>
                <View style={{width: screenWidth/2, padding:20}}>
                    <Button title="Following"  color="#235ee8" onPress={()=>navigation.navigate("Following")}/>
                </View>

            </View>
            
            {/* menampilkan semua follower atau following */}
            {
                // followerOrFollowing==='getFollowers'?

                // follow.map((el,i)=><View key={i} style={{backgroundColor:'#fff'}}>
                //     <View style={{flexDirection:'row', padding:12, gap:10,paddingLeft:10}}>
                //         <Image style={{height:34, width:34, borderRadius:50}} source={{uri:el?.followers?.img}}/>

                //         <View>
                //             <Text style={{ fontSize:15,fontWeight: 'bold' }}>{el?.followers?.username}</Text>
                //             <Text style={{ fontSize:14 }}>{el.followers?.name}</Text>
                //         </View>
                //     </View>
                // </View>
                // )

                // :

                // follow.map((el,i)=>
                //   <View key={i} style={{backgroundColor:'#fff'}}>
                //       <View style={{flexDirection:'row', padding:12, gap:10,paddingLeft:10}}>
                //         <Image style={{height:34, width:34, borderRadius:50}} source={{uri:el?.followings?.img}}/>

                //         <View>
                //             <Text style={{ fontSize:15,fontWeight: 'bold' }}>{el?.followings?.username}</Text>
                //             <Text style={{ fontSize:14 }}>{el?.followings?.name}</Text>
                //         </View>

                //       </View>
                //   </View>
                // )

            }
        </View>
        </>
}


// {followerOrFollowing==="getFollowers"?
// <>
// <Button title="Follower"  color="#235ee8" onPress={()=>handleFollow(followerOrFollowing)}/> 
// <Button title="Following"  color="#a6bdde" onPress={()=>handleFollow("getFollowings")}/>
// </>
// : 
// <>
// <Button title="Follower"  color="#a6bdde" onPress={()=>handleFollow(followerOrFollowing)}/>
// <Button title="Following"  color="#235ee8" onPress={()=>handleFollow("getFollowings")}/> 
// </>
// }