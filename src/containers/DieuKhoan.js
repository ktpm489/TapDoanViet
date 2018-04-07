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
    
    constructor(props){
        super(props);

        
    }


    componentWillMount(){
        
    }


    render (){

        
        return (
            
            
           <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#23b34c'}}>
               <Video 
                    repeat={false}
                    onEnd={()=>{
                       
                    }} 
                    resizeMode='cover'
                    source={require('../images/video_logo_app.mp4')}
                    style={{width:Dimention.DEVICE_WIDTH,height:315/560*Dimention.DEVICE_WIDTH}}
               />

            </View>
            
        )

    }
}
export default DieuKhoan;