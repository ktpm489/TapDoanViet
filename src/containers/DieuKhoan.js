import React, { Component } from 'react';
import {
    View,
    Text,
    AsyncStorage,
    FlatList,
    TextInput,
    Image,TouchableOpacity,
    ActivityIndicator,
    ScrollView,
    WebView
} from 'react-native'

import * as Dimention from '../configs/Dimention'
import Video from 'react-native-video'
class DieuKhoan extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            title:'Điều khoản',
            headerStyle: {backgroundColor: '#23b34c'},
            headerTitleStyle: {color: 'white'},
            headerTintColor: 'white',

        }
    }
    
    constructor(props){
        super(props);

        
    }


    componentWillMount(){
        
    }


    render (){

        
        return (
            
            
            <WebView
            // source={{ html: item.content }}
            source={{ uri: "https://dayngheso1.vn/" }}
            style = {{flex: 1,}}
            // scrollEnabled={false}
            />
            
        )

    }
}
export default DieuKhoan;