import { gql, useMutation, useQuery } from "@apollo/client";
import { ActivityIndicator, Text, View, Image, ScrollView, Dimensions, Button, TextInput, TouchableHighlight } from "react-native"
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from "react";

const screenWidth =  Dimensions.get('window').width

const get_all_post = gql`
query Query($getPostByIdId: String) {
  getPostById(id: $getPostByIdId) {
    _id
    content
    tags
    imgUrl
    authorId
    comments {
      content
      username
      createdAt
      updatedAt
    }
    likes {
      username
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
    username {
      _id
      name
      username
      email
      img
    }
  }
}
`

const add_comment = gql`
mutation Mutation($content: String, $postId: ID) {
  createComment(content: $content, postId: $postId) {
    content
    createdAt
    updatedAt
  }
}`

const add_like = gql`
mutation Mutation($postId: ID) {
  createLike(postId: $postId) {
    username
    createdAt
    updatedAt
  }
}`

export default function DetailPost({ route }){
  const [getInput,setInput] = useState(false)
  const [getComment,setComment] = useState('')
    const { id } = route.params;
    const { loading, data, error } = useQuery(get_all_post, {
        variables: { getPostByIdId:id }
    })

    const [sendComment] = useMutation(add_comment, {
      refetchQueries:[get_all_post]
    })
    const [sendLike] = useMutation(add_like, {
      refetchQueries:[get_all_post]
    })

    async function handleLike(){
      try {
        await sendLike({
          variables: {
            postId:id
          }
        })
      } catch (error) {
        console.log(error,'<-err di like');
      }
    }

    async function handleComment(){
      try {
        // console.log({getComment,id});
        await sendComment({
          variables: {
            content: getComment,
            postId: id
          }
        })
        setInput(false)
        setComment('')
      } catch (error) {
        console.log(error,'<- err add comment');
      }
    }

    if(loading) return <ActivityIndicator style={{flex:1,justifyContent:'center', alignItems:'center'}} size="large" />

    if(error) return <Text style={{flex:1,justifyContent:'center'}} size="large">error: {error.message}</Text>

    // console.log(data.getPostById.tags,'<<<- data');
    return <ScrollView>
        <View style={{flexDirection:"row", padding:12, gap:10, backgroundColor:'white'}}>
            <Image style={{height:34, width:34, borderRadius:50}} source={{uri:data?.getPostById?.username?.img}}/>
            <View>
                <Text style={{ fontSize:15,fontWeight: 'bold' }}>{data?.getPostById?.username?.username}</Text>
            </View>
        </View>
        <View style={{padding:10,backgroundColor:'white',gap:10}}>
            <Text style={{ fontSize:15 }}>{data?.getPostById?.content}</Text>
            <View>
              {
                data?.getPostById?.tags.map((el,i)=><Text key={i} style={{fontSize:12}}>#{el}</Text>
                )
              }
            </View>
        </View>
        <View style={{justifyContent:'center', alignContent:'center', flex:1}}>
            <Image style={{height:300, width:screenWidth, alignSelf:'center'}} source={{uri:data?.getPostById?.imgUrl}}/>
        </View>
        <View style={{flexDirection:"row", justifyContent:'space-between', padding:10, gap:20, backgroundColor:'white'}}>
          <TouchableHighlight onPress={handleLike}>
            <View style={{flexDirection:"row", gap:10}}>
                <AntDesign name="like2" size={24} color="black" />
                <Text style={{ fontSize:14 }}>{data?.getPostById?.likes.length}</Text>
            </View>
          </TouchableHighlight>

            <View style={{flexDirection:"row", gap:10}}>
                <MaterialCommunityIcons name="comment-text-outline" size={24} color="black" />
                <Text style={{ fontSize:14 }}>{data.getPostById?.comments.length}</Text>
            </View>
        </View>
        <View style={{padding:5 ,gap:10}}>
            {
              data.getPostById?.comments.map((el,i)=>(
                <View key={i} style={{backgroundColor:'#fff'}}>
                    <View style={{paddingLeft:10}}>
                        <Text style={{ fontSize:15,fontWeight: 'bold' }}>{el.username}</Text>
                    </View>
                    <View style={{padding:10}}>
                        <Text style={{ fontSize:14 }}>{el.content}</Text>
                    </View>
                </View>
              ))
            }
            {
              getInput ? <View style={{flexDirection:'row', justifyContent:'center', marginTop:20, gap:10}}>
                <TextInput
                  style={{height: 40, borderRadius: 10, width:200, borderWidth: 1, padding: 10}}
                  onChangeText={setComment}
                  value={getComment}
                />
                <Button
                  onPress={handleComment}
                  title="send"
                  style={{width:50}}
                />
              </View> 
              :
              <Button 
                onPress={()=>setInput(true)}
                title="Add Comment"
                style={{width:50}}
              />

            }
        </View>
    </ScrollView>
}