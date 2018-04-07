import React, { Component } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    Alert,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';

import * as Dimention from '../configs/Dimention'
import Video from 'react-native-video'
import { NavigationActions } from 'react-navigation'
class FirstScreen extends Component {
    constructor(props){
        super(props)
        
    }
    


    render (){
        return (
            
            
            <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#23b34c'}}>
                <Video 
                     repeat={false}
                     onEnd={()=>{
                        AsyncStorage.setItem("isFirstLogin","true");
                        const resetAction = NavigationActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({
                                    routeName: 'Login',
                                }),
                            ]
                        });
                        this.props.navigation.dispatch(resetAction)
                     }} 
                     resizeMode='cover'
                     source={require('../images/video_logo_app.mp4')}
                     style={{width:Dimention.DEVICE_WIDTH,height:315/560*Dimention.DEVICE_WIDTH}}
                />
 
             </View>
             
         )
    }

}
export default FirstScreen