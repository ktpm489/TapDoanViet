import React, { Component } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    Alert,
    TouchableOpacity,
    AsyncStorage,
    Image,
    NetInfo
} from 'react-native';

import * as Dimention from '../configs/Dimention'
import { NavigationActions } from 'react-navigation'
class FirstScreen extends Component {
    constructor(props){
        super(props)

        

        

        
    }
    
    componentWillMount(){
        setTimeout(()=> {
            
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
                     
        },500);
    }

    render (){
        return (
            
            
            <View style = {{ flex:1, backgroundColor:'white', justifyContent:'center', alignItems:'center'}}>
                <Image
                    source={require('../../src/images/logo2.png')}
                />
            
            </View>
             
         )
    }

}
export default FirstScreen