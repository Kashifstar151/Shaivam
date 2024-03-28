import { useIsFocused } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Dimensions, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
// import { NestableScrollContainer, NestableDraggableFlatList } from "react-native-draggable-flatlist"
import { listfavAudios, updatefavPlaylist } from "../../Databases/AudioPlayerDatabase";
import { colors } from "../../Helpers";
import DraggableFlatList, {
    ScaleDecorator,
} from "react-native-draggable-flatlist";
import { useState } from "react";
import  Icon  from "react-native-vector-icons/dist/Feather";
import { NestableScrollContainer, NestableDraggableFlatList } from "react-native-draggable-flatlist"
import Background from "../../components/Background";
import DragIcon from "../../assets/Images/Frame 34902.svg"
import Button from "../Temples/Common/Button";
const SongLists = ({navigation,route} ) => {
    const {data} = route?.params
    const [index , setIndex]=useState(0)
    const isFocuced = useIsFocused()
    const [favList,setFavList]=useState(data)
    // console.log("🚀 ~ SongLists ~ favList:", favList)
    useEffect(() => {
        // fetchAndDisplayDownloads()
        listfavAudios(callbacks => {
            console.log("🚀 ~ useEffect ~ callbacks:", callbacks)
            setFavList(callbacks)
        })

    }, [isFocuced])
    // const isFocused = useIsFocused()
    // useEffect(() => {
    //     getSongList()
    // }, [isFocused])
    // const getSongList = () => {
    //     listfavAudios(callbacks => {
    //         console.log("🚀 ~ getSongList ~ callbacks:", JSON.stringify(callbacks, 0, 2))
    //     })
    // }
    const serializeSing = ()=>{
        let sql = `UPDATE fav_odhuvar SET count=? WHERE id=?`;

    }
    const renderItem = ({ item, index,drag,isActive }) => (
        <ScaleDecorator>
            <TouchableOpacity   style={{marginBottom:10, alignItems:'center',  height:48 , flexDirection:'row',justifyContent:'space-between',}}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                  <View style={{backgroundColor:'#F2F0F8',height:48,width:48}}>
                  </View>
                    <Text style={{ fontSize: 14, color: 'black',marginHorizontal:5 }}>{item?.title}</Text>
                </View>
                <TouchableOpacity onLongPress={drag} disabled={isActive}>
                    <DragIcon/>
                </TouchableOpacity>
            </TouchableOpacity>
        </ScaleDecorator>
    )
    const updateList = (item)=>{

      for (i in item){
        console.log("index" ,i)
        let query = `UPDATE fav_odhuvar SET serialNo=? WHERE id=?`
        updatefavPlaylist(query, [i, item?.[i]?.id],callbacks => {
            console.log("🚀 ~ updateList ~ callbacks:", callbacks)
        })
      }
      setFavList(item)
    }
    return (
        <Background>
             <View style={{marginTop:30,paddingTop:10, backgroundColor:'#fff',borderTopEndRadius: 15,borderTopLeftRadius: 15, paddingHorizontal:10,height:Dimensions.get('window').height-25}}>
                 <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <View>
                 <Text style={{fontFamily:'Lora-Bold' , fontSize:16,}}>Re-arrange tasks</Text>
                 <Text style={{fontFamily:'Mulish-Regular' , fontSize:12,}}>Long press & hold tracks to move them up or down</Text>
                    </View>
                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                     <Icon name='x' color='black' size={24}/>
                    </TouchableOpacity>
                    </View>
                 <NestableScrollContainer style={{backgroundColor:'#fff',paddingTop:10}}>
                       <NestableDraggableFlatList
                       onPlaceholderIndexChange={(index)=>setIndex(index)}
                       style={{paddingHorizontal:10,paddingBottom:300}}
                       data={favList}
                       renderItem={renderItem}
                       keyExtractor={(item) => item.id}
                       onDragEnd={({ data }) => updateList(data)}
                       />
        </NestableScrollContainer>
                 </View>
        <Button active buttonText={'Save'} navigation={()=>navigation.goBack()}/>
        </Background>
        // </ScrollView>
    );
};

export default SongLists;
