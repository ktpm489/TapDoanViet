import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Entypo'
import PhiDichVu from '../containers/PhiDichVu'
export default class ThongBao extends Component {
    static navigationOptions = ({ navigation}) => {
        const {state} = navigation;
        return {
            headerLeft:
                <TouchableOpacity onPress={() => {
                    navigation.navigate('DrawerOpen')
                }}>
                    <Icon name="menu" size={30} style={{marginLeft: 7}} color="white"/>
                </TouchableOpacity>,
            headerStyle: { backgroundColor: '#23b34c' },
            headerTitleStyle:{ color: 'white'},
        }

    }
    render (){
        return (
            <View style={{flex:1}}>
                <PhiDichVu/>
            </View>
        );
    }
}