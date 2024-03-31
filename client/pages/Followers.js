import { gql, useQuery } from "@apollo/client";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";

const all_followers = gql`
query GetFollowers {
  getFollowers {
    _id
    followers {
      username
      email
      img
    }
  }
}
`

export default function Followers(){
    const { data,loading,error } = useQuery(all_followers)

    if(loading) return <ActivityIndicator style={{flex:1,justifyContent:'center', alignItems:'center'}} size="large" />

    if(error) return <Text style={{flex:1,justifyContent:'center'}}>error : {error.message}</Text>
    // console.log(data,'<- follower');

    return <ScrollView>
        {
            data.getFollowers.length===0 ? <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:25}}>No Followers</Text>
            </View>
            :
            data.getFollowers.map(el=><View key={el._id}>
                <View style={{flexDirection:'row', padding:12, gap:10,paddingLeft:10, backgroundColor:'white'}}>
                    <Image
                        style={{height:34, width:34, borderRadius:50}} 
                        source={{uri:el.followers.img}}
                    />
                     <View>
                        <Text style={{fontSize:15,fontWeight: 'bold'}}>{el.followers.username}</Text>
                        <Text>{el.followers.email}</Text>
                    </View>
                </View>
            </View>)
        }
    </ScrollView>
}