import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { ActivityIndicator, Button, Image, ScrollView, Text, TextInput, View } from "react-native";
import Swal from 'sweetalert2'
import { all_followings } from "./Following";

const get_search = gql`
mutation Search($search: String) {
  search(search: $search) {
    _id
    name
    username
    email
    img
  }
}`

const add_followers = gql`
mutation Mutation($followingId: ID) {
  createFollow(followingId: $followingId) {
    _id
    followingId
    followerId
    createdAt
    updatedAt
  }
}`

export default function Search(){
    const [getSearch,setSearch] = useState('')
    const [sendSearch, { data,loading,error }] = useMutation(get_search)
    const [sendFollower] = useMutation(add_followers, {
        refetchQueries: [all_followings]
    })

    if(loading) return <ActivityIndicator style={{flex:1,justifyContent:'center', alignItems:'center'}} size="large" />

    if(error) return <Text style={{flex:1,justifyContent:'center'}}>error : {error.message}</Text>

    async function handleSearch(){
        try {
            await sendSearch({
                variables: {
                    search : getSearch
                }
            })
        } catch (error) {
            Swal.fire(error[0]);
        }
    }
    // console.log(data?.search,'<- user yg disearch');
    // console.log(getUsers,'<- user yg ditemukan');

    async function handleFollow(id){
        try {
            console.log('masuk handle follow');
            console.log(id,'<- id yg difollow');
            await sendFollower({
                variables: {
                    followingId: id
                }
            })
        } catch (error) {
            console.log(error,'<-err follow');
            Swal.fire(error[0]);
        }
    }

    return <ScrollView>
        <View  style={{flexDirection:'row', justifyContent:'center', marginTop:20, gap:10}}>
            <TextInput
                style={{height: 40, borderRadius: 10, width:200, borderWidth: 1, padding: 10}}
                onChangeText={setSearch}
                value={getSearch}
            />
            <Button
                onPress={handleSearch}
                style={{width:50}}
                title="Search"
            />
        </View>
        <View style={{marginTop:20}}>
            {
                data?.search &&
                data?.search.map(el=><View key={el._id} style={{flexDirection:'row',backgroundColor:'white'}}>
                    <View style={{flexDirection:'row', padding:12, gap:10}}>
                        <Image
                            style={{height:34, width:34, borderRadius:50}} 
                            source={{uri:el.img}}
                        />
                        <View>
                            <Text style={{fontSize:15,fontWeight: 'bold'}}>{el.username}</Text>
                            <Text>{el.email}</Text>
                        </View>
                    </View>
                    <View style={{padding:20, marginLeft:40}}>
                        <Button
                            onPress={()=>handleFollow(el._id)}
                            title="Follow"
                        />
                    </View>
                </View>)
            }
        </View>
    </ScrollView>
}