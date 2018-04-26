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
import * as Dimention from '../configs/Dimention'

export default class TienIchDetail extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            title:'Chi tiết',
            headerStyle: {backgroundColor: '#23b34c'},
            headerTitleStyle: {color: 'white'},
            headerTintColor: 'white',

        }
    }

    constructor(props) {
        super(props);


    }



    render() {
        const { item } = this.props.navigation.state.params;
        return (


            <View style = {{flex:1}}>
                
                    <Image style={{height: Dimention.DEVICE_WIDTH*(450/800), width: "100%", alignSelf: 'stretch', }}
                           resizeMode="cover"
                           source={{ uri: item.imageUrl }}
                    />
                
                <Text style={{color:'black',fontWeight:'bold',fontSize:20,marginLeft:5}}>{item.utilityName}</Text>
                <View style = {{flex:1}}>
                    <WebView
                        source={{ html: item.content,baseUrl:'' }}
                        style = {{flex:1, width: "100%"}}
                        // scrollEnabled={false}
                    />
                </View>
            </View>

        )

    }
}