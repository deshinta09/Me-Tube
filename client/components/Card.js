import { View,Text, Dimensions, Image } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const screenHeigh =  Dimensions.get('window').height
const screenWidth =  Dimensions.get('window').width


export default function Card({data}){

    function truncateString(inputString, maxWords) {
        // Memisahkan string menjadi array kata
        const words = inputString.split(/\s+/);
      
        // Jika jumlah kata lebih dari maxWords, ambil hanya 8 kata pertama
        if (words.length > maxWords) {
          return words.slice(0, maxWords).join(' ') + '...';
        }
      
        // Jika tidak, kembalikan string aslinya
        return inputString;
      }
    
    function getTimeAgo (updatedAt) {
        const now = new Date(); // Waktu saat ini
        const updated = new Date(updatedAt); // Waktu diubah terakhir
    
        const diffTime = Math.abs(now - updated); // Perbedaan waktu dalam milidetik
    
        const diffMinutes = Math.ceil(diffTime / (1000 * 60)); // Konversi ke menit
        const diffHours = Math.ceil(diffTime / (1000 * 60 * 60)); // Konversi ke jam
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Konversi ke hari
    
        if (diffMinutes < 60) {
            return `${diffMinutes}m`; // Kurang dari 1 jam, tampilkan dalam menit
        } else if (diffHours < 24) {
            return `${diffHours}h`; // Kurang dari 1 hari, tampilkan dalam jam
        } else {
            return `${diffDays}d`; // Lebih dari 1 hari, tampilkan dalam hari
        }
    };

    return (
        <View style={{height: screenHeigh/1.75}}>
            <View style={{flexDirection:"row", padding:12, gap:10, backgroundColor:'white'}}>
                <Image style={{height:34, width:34, borderRadius:50}} source={{uri:data?.author?.img}}/>
                <View>
                    <Text style={{ fontSize:15,fontWeight: 'bold' }}>{data?.author?.username}</Text>
                    <Text style={{ fontSize:11 }}>{getTimeAgo(+data.createdAt)}</Text>
                </View>
            </View>
            <View style={{padding:10}}>
                <Text style={{ fontSize:14 }}>{truncateString(data?.content,8)}</Text>
            </View>
            <View style={{justifyContent:'center', alignContent:'center', flex:1}}>
                {/* <Text>ini image url</Text> */}
                <Image style={{height:270, width:screenWidth,alignSelf:'center'}} source={{uri:data?.imgUrl}}/>
            </View>
            <View style={{flexDirection:"row", justifyContent:'space-between', padding:10, gap:20, backgroundColor:'white'}}>
                <View style={{flexDirection:"row", gap:10}}>
                    <AntDesign name="like2" size={24} color="black" />
                    <Text style={{ fontSize:14 }}>{data.likes ? data.likes.length : ''}</Text>
                </View>

                <View style={{flexDirection:"row", gap:10}}>
                    <MaterialCommunityIcons name="comment-text-outline" size={24} color="black" />
                    <Text style={{ fontSize:14 }}>{data.comments ? data.comments.length : ''}</Text>

                </View>
            </View>
        </View>
    )
}