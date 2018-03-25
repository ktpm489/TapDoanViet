import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native'

class BaoCaoKhanCap extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            title:'Báo cáo khẩn cấp',
            headerStyle: {backgroundColor: '#23b34c'},
            headerTitleStyle: {color: 'white'},
            headerTintColor: 'white',

        }
    }
    render (){
        return (
            <View>
                <Text>Thông tin cá nhân</Text>
            </View>
        )

    }
}
export default BaoCaoKhanCap;