import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet, FlatList
} from 'react-native';
export default class ItemTienIchCateGory extends Component {

    itemTienIch = ({item})=>

    (
        
        <TouchableOpacity  style={{margin:10}} 
                onPress={()=>this.props.navigation.navigate("TienIchDetail",{item:item})}
        >
            <Image style={{flex: 1, height: 100, width: 100, alignSelf: 'stretch',}}
                       resizeMode="cover"
                       source={{uri: item.imageUrl}}/>

            <Text style={{ width: 100 }}
                                    ellipsizeMode={'tail'}
                                    numberOfLines={1}
                                >{item.utilityName}</Text>
        </TouchableOpacity>
    )

    render() {

        console.log("props", this.props);
        const item = this.props.dataItem.item;
        var subData = item.utilities;
        console.log("subdata", subData);
        if (subData.length > 4) {
            subData = subData.slice(0, 4);
        }

        return (
            <View key={item.index} style={{flex:1}}>
                <View style={{ flexDirection: 'row',marginLeft:10,justifyContent:'center',alignItems:'center' }}>
                    <Text style={{ flex: 1,fontWeight: "bold",color:'#000000',fontSize:20 }}
                        ellipsizeMode={'tail'}
                        numberOfLines={1}
                    >{item.name}</Text>
                    <TouchableOpacity
                        onPress={()=>{
                            this.props.navigation.navigate("TienIch",{dataItem:item.utilities,nameCategory:item.name})
                        }}
                    >
                        <Text numberOfLines={1} style={{color:'#000000'}}>Xem thêm... </Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    horizontal={true}
                    data={subData}
                    renderItem={
                        this.itemTienIch
                    }
                keyExtractor={(item, index) => index.toString()}
                numColumns={1}
            
                />

            </View>
        );
    }
}
