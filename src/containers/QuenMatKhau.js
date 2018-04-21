import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native'
import Communications from 'react-native-communications';
export default class QuenMatKhau extends Component {
    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state

        return {
            title: 'Quên mật khẩu',
            headerStyle: {backgroundColor: '#23b34c'},
            headerTitleStyle: {color: 'white'},
            headerTintColor: 'white',

        }
    }
    render (){
        return (
            <View style = {{marginTop: 20, flex:1, alignItems:'center', justifyContent:'center', flexWrap:'wrap', flexDirection:'row', marginHorizontal: 20}}>
                <Text style = {{fontSize: 15}}>Vui lòng liên hệ với số Hotline</Text>
                <TouchableOpacity  onPress={() => Communications.phonecall('0963250395', true)}>
                    <Text style = {{fontSize: 15, color: '#2979FF', fontWeight:'bold'}}> 0902703073</Text>
                </TouchableOpacity>
                <Text style = {{fontSize: 15}}>để cấp lại mật khẩu</Text>
            </View>
        )
    }
}