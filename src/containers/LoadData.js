import React, { Component } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    Alert,
    TouchableOpacity
} from 'react-native';
import { NavigationActions } from 'react-navigation'

class LoadData extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }
    componentWillMount(){
        // console.log('component will mount')
        setTimeout(()=> {
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({
                        routeName: 'Tab',
                    }),
                ]
            });
            this.props.navigation.dispatch(resetAction)

        },1500)
    }


    render (){
        return (
            <View style={{flex: 1,justifyContent:'center', alignItems: 'center',backgroundColor: 'rgba(52, 52, 52, 0.3)'}}>
                <ActivityIndicator size="large"/>
            </View>
        );
    }

}
export default LoadData