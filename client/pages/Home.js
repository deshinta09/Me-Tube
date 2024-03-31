import { Text, ScrollView, ActivityIndicator, TouchableHighlight, Button } from "react-native"
import Card from "../components/Card"
import { gql, useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native"

export const get_post = gql`
query ExampleQuery {
  getPosts {
    _id
    content
    tags
    imgUrl
    authorId
    likes {
      username
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
    comments {
      content
      username
      createdAt
      updatedAt
    }
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

export default function Home(){
    const { loading, data, error } = useQuery(get_post)
    // console.log(data.getPosts,'<-all posts');
    const navigation = useNavigation()

    if(loading) return <ActivityIndicator style={{flex:1,justifyContent:'center', alignItems:'center'}} size="large" />

    if(error) return <Text style={{flex:1,justifyContent:'center'}}>error : {error.message}</Text>
    

    return(
        <>
        <ScrollView>
            
            {
                data.getPosts.map(el=><TouchableHighlight key={el._id} onPress={()=>navigation.navigate('Post',{id:el._id})}>
                    <Card data={el}/>
                </TouchableHighlight>
                )
            }
            
        </ScrollView>
        </>
    )
}
