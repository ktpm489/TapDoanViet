import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,

} from 'react-native';
import Dimensions from 'Dimensions';
class NhapThongTin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            SoDienThoai: '',
            MatKhau: '',
        }
    }

    render() {
        return (
            <View style={{alignItems: 'center'}}>
                <Text style={{fontWeight: 'bold', color: 'black', marginTop: 10, fontSize: 16}}>Nhập số điện
                    thoại</Text>
                {/*<View style={{justifyContent: 'center', alignItems: 'center'}}>*/}
                    {/*<Text style={{marginTop: 8, fontSize: 13}}>Số điện thoại này được sử dụng để đăng nhập và*/}
                        {/*đặt </Text>*/}
                    {/*<Text style={{fontSize: 13}}>lại mật khẩu khi cần. </Text>*/}
                {/*</View>*/}
                <View style={{flexDirection: 'row', backgroundColor: 'white',marginTop: 15, minHeight: 30, alignItems: 'center'}}>
                    <Text style={{fontSize: 18, color: "#23b34c", marginLeft: 10, flex: 1}}>VN</Text>
                    <TextInput placeholder='Nhập số điện thoại'
                               underlineColorAndroid="transparent"
                               onChangeText={(SoDienThoai) => this.setState({SoDienThoai})}
                               placeholderTextSize="20"
                               style={{flex: 10}}/>
                </View>
                <Text style={{fontWeight: 'bold', color: 'black', marginTop: 10, fontSize: 16}}>Nhập mật khẩu</Text>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{marginTop: 8, fontSize: 13}}>Tạo mật khẩu cho tài khoản của bạn</Text>
                </View>
                <View style={{flexDirection: 'row', backgroundColor: 'white',marginTop: 15, minHeight: 30, alignItems: 'center'}}>
                    <Text style={{fontSize: 18, color: "#23b34c", marginLeft: 10, flex: 1}}>VN</Text>
                    <TextInput placeholder='Nhập mật khẩu'
                               underlineColorAndroid="transparent"
                               onChangeText={(SoDienThoai) => this.setState({SoDienThoai})}
                               placeholderTextSize="20"
                               style={{flex: 10}}/>
                </View>
                <TouchableOpacity>
                    <View style = {{backgroundColor:'#23b34c',borderWidth:1,borderColor:'#23b34c',width: DEVICE_WIDTH - 40,  marginHorizontal: 20, marginTop:30, minHeight:40,alignItems:'center', justifyContent: 'center'}}>
                        <Text style = {{color: 'white', fontWeight:'bold'}}>Tiếp tục</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

export default NhapThongTin
const DEVICE_WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({})