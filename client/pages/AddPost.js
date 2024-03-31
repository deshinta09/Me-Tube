import { Button, Dimensions, Image, Text, TextInput, View, ActivityIndicator, ScrollView } from "react-native"
import { styles } from "./Login"
import { useState } from "react"
import { gql, useMutation } from "@apollo/client"
import { get_post } from "./Home"
import { useNavigation } from "@react-navigation/native"

const add_post = gql`
mutation Mutation($newPost: NewPost) {
  createPost(NewPost: $newPost) {
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
    author {
      _id
      name
      username
      email
      img
    }
  }
}
`

const screenWidth =  Dimensions.get('window').width


export default function AddPost({navigation}) {
    // const navigation = useNavigation()
    const [content, setContent] = useState('')
    const [img, setImg] = useState('')
    const [tag, setTag] = useState('')

    const [handlePost, { loading,error }] = useMutation(add_post, {
        refetchQueries:[get_post]
    })

    if(loading) return <ActivityIndicator style={{flex:1,justifyContent:'center', alignItems:'center'}} size="large" />

    if(error) return <Text style={{flex:1,justifyContent:'center'}}>error : {error.message}</Text>

    
    async function handleSubmit(){
        try {
            let t = [tag]
            t = t.find(el=>el=',') ? t[0].split(',') : t
            // console.log({content,t,img});
            await handlePost({
                variables: {
                    newPost:{
                        content: content,
                        tags: t,
                        imgUrl: img
                    }
                }
            })
            navigation.navigate('Me Tube')
            setContent('')
            setImg('')
            setTag('')
        } catch (error) {
            console.log(error,'<-err post');
        }
    }

    return(
        <ScrollView>
        {
            img && <View>
                <Image style={{width:screenWidth,height:200}} source={{uri:img}}/>
            </View>
        }
        <View>
            <TextInput
                style={styles.input}
                onChangeText={setTag}
                value={tag}
                placeholder="tag"
            />
            <TextInput
                style={styles.input}
                onChangeText={setContent}
                value={content}
                placeholder="content"
            />
            <TextInput
                style={styles.input}
                onChangeText={setImg}
                value={img}
                placeholder="upload image"
            />
        </View>
        <View style={{justifyContent:'center',alignItems:'center'}}>
            <Button style={{width:screenWidth/6}} onPress={handleSubmit} title="Post"/>
          </View>
        </ScrollView>
    )
}