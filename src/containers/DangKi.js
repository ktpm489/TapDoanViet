import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,

} from 'react-native';
import Dimensions from 'Dimensions';

class DangKi extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            title:'Đăng kí',
            headerStyle: {backgroundColor: '#23b34c'},
            headerTitleStyle: {color: 'white'},
            headerTintColor: 'white',

        }
    }
    constructor(props){
        super(props)
        this.state = {
            SoDienThoai: '',
            MatKhau: '',
        }
    }
    render (){
        return (
            <View>
                <View style = {{marginTop: 10, height:DEVICE_HEIGHT/5, marginHorizontal:10, backgroundColor:"white", borderColor: '#9E9E9E', borderWidth:1}}>
                    <View style = {{flex:1,justifyContent:'center'}}>
                        <TextInput
                            style = {{marginLeft: 10}}
                            placeholder = 'Số điện thoại'
                            underlineColorAndroid="transparent"
                            onChangeText = {(SoDienThoai) => this.setState({SoDienThoai})}/>
                    </View>
                    <View style = {{height:1, backgroundColor: '#9E9E9E'}}/>
                    <View style = {{flex:1, justifyContent:'center'}}>
                        <TextInput
                            style = {{marginLeft: 10}}
                            placeholder = 'Mật khẩu'
                            underlineColorAndroid="transparent"
                            onChangeText = {(MatKhau) => this.setState({MatKhau})}/>
                    </View>
                </View>
                <TouchableOpacity onPress = {()=> this.props.navigation.navigate('NhapThongTin')}>
                    <View style = {styles.viewGui}>
                        <Text style = {{fontSize: 17, color: 'white', fontWeight:'bold'}}>
                            TIẾP TỤC
                        </Text>


                    </View>
                </TouchableOpacity>


            </View>
        )
    }
}
export default DangKi
const DEVICE_HEIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
    viewGui: {
        marginTop: 20,
        borderWidth: 1,
        borderRadius: 5,
        marginHorizontal: 10,
        borderColor: "#23b34c",
        backgroundColor:'#23b34c',
        height: DEVICE_HEIGHT/12,
        justifyContent:'center',
        alignItems:'center'


    },
})