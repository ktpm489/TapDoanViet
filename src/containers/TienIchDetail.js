import React, { Component } from 'react';
import {
    View,
    Text,
    AsyncStorage,
    FlatList,
    WebView,
    Image, TouchableOpacity,
    ScrollView
} from 'react-native'
import { BASE_URL, GET_SERVICE } from "../Constants";

class TienIchDetail extends Component {

    constructor(props) {
        super(props);


    }



    render() {
        const { item } = this.props.navigation.state.params;
        return (
            <ScrollView style = {{flex:1}}>
                <View  style = {{flex:1}}>
                    <Image style={{height: 180, width: "100%", alignSelf: 'stretch', }}
                           resizeMode="cover"
                           source={{ uri: item.imageUrl }}
                    />
                </View>
                <Text style={{color:'black',fontWeight:'bold',fontSize:20,marginLeft:5}}>{item.utilityName}</Text>
                <View style = {{flex:1}}>
                    <WebView
                        source={{ html: item.content }}
                        style = {{flex:1,height:500}}
                    />
                </View>
            </ScrollView>

        )

    }
}
export default TienIchDetail;