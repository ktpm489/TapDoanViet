import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    AsyncStorage
} from 'react-native';
import { NavigationActions } from 'react-navigation'

export default class Launcher extends Component{
    constructor(props) {
        super(props)
        this.state = {
            isTime: false
        }
    }
    componentWillMount(){
        setTimeout(()=> {
            this.setState({
                isTime: true
            })
            this.pushScreen();
        },500)
    }
    pushScreen(){
        AsyncStorage.getItem('token').then((value)=>{
            console.log("token",value);
            if(value){ // co van de
                // this.props.navigation.navigate('Tab')
                const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({
                            routeName: 'Tab',
                        }),
                    ]
                });
                this.props.navigation.dispatch(resetAction)
            }
            else {
                const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({
                            routeName: 'Login',
                        }),
                    ]
                });
                this.props.navigation.dispatch(resetAction)
            }
        })
    }
    render (){
        return (
            <View style = {{ flex:1, backgroundColor:'white', justifyContent:'center', alignItems:'center'}}>
                <Image
                    source={require('../../src/images/logo.png')}
                />
            </View>
        )

    }
}