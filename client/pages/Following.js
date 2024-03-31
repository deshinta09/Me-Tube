import { gql, useQuery } from "@apollo/client";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";

export const all_followings = gql`
query GetFollowers {
  getFollowings {
    _id
    followingId
    followerId
    createdAt
    updatedAt
    followings {
      _id
      name
      username
      email
      img
    }
  }
}
`

export default function Followings(){
    const { data,loading,error } = useQuery(all_followings)
    // console.log(data,'<- followings');

    if(loading) return <ActivityIndicator style={{flex:1,justifyContent:'center', alignItems:'center'}} size="large" />

    if(error) return <Text style={{flex:1,justifyContent:'center'}}>error : {error.message}</Text>

    return <ScrollView>
            {
                data.getFollowings.length === 0 ? <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontSize:25}}>No Following</Text>
                </View>
                :
                data.getFollowings.map(el=><View key={el._id}>
                    <View style={{flexDirection:'row', padding:12, gap:10,paddingLeft:10}}>
                        <Image
                            style={{height:34, width:34, borderRadius:50}} source={{uri:el?.followings?.img}}
                        />
                        <View>
                            <Text style={{fontSize:15,fontWeight: 'bold'}}>{el.followings.username}</Text>
                            <Text>{el.followings.email}</Text>
                        </View>
                    </View>
                </View>)
            }
    </ScrollView>
}