import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity, Alert,

} from 'react-native';
import Dimensions from 'Dimensions';

class DangKi extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            title: 'Đăng kí',
            headerStyle: { backgroundColor: '#23b34c' },
            headerTitleStyle: { color: 'white' },
            headerTintColor: 'white',

        }
    }
    constructor(props) {
        super(props)
        this.state = {
            SoDienThoai: '',
            MatKhau: '',
            MatKhauConfirm: '',
        }
    }
    checkPass = () => {

        if (this.state.SoDienThoai.trim().length === 0) {
            Alert.alert("Thông báo", "Số điện thoại không được để rỗng");
            return;
        }
        if (this.state.SoDienThoai.trim().length <= 9 || this.state.SoDienThoai.trim().length >= 12) {
            Alert.alert("Thông báo", "Số điện thoại phải từ 10 đến 11 số");
            return;
        }
        if (this.state.MatKhau !== this.state.MatKhauConfirm) {
            Alert.alert("Thông báo", "Mật khẩu không trùng khớp");
            return;
        }
        if (this.state.MatKhau.trim().length === 0 || this.state.MatKhauConfirm.trim().length === 0) {
            Alert.alert("Thông báo", "Mật khẩu không không được để rỗng");
            return;
        }
        if (this.state.MatKhau.trim().length < 6 || this.state.MatKhauConfirm.trim().length < 6) {
            Alert.alert("Thông báo", "Mật khẩu phải từ 6 ký tự");
            return;
        }

        this.props.navigation.navigate('NhapThongTin',
            {
                SDT: this.state.SoDienThoai,
                MK: this.state.MatKhau,
                MKConfirm: this.state.MatKhauConfirm
            })


    }
    render() {
        return (
            <View>
                <View style={{ marginTop: 10, height: DEVICE_HEIGHT / 4, marginHorizontal: 10, backgroundColor: "white", borderColor: '#9E9E9E', borderWidth: 1 }}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <TextInput
                            style={{ marginLeft: 10 }}
                            placeholder='Số điện thoại'
                            keyboardType={'numeric'}
                            underlineColorAndroid="transparent"
                            onChangeText={(SoDienThoai) => this.setState({ SoDienThoai })} />
                    </View>
                    <View style={{ height: 1, backgroundColor: '#9E9E9E' }} />
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <TextInput
                            style={{ marginLeft: 10 }}
                            placeholder='Mật khẩu'
                            secureTextEntry={true}
                            underlineColorAndroid="transparent"
                            onChangeText={(MatKhau) => this.setState({ MatKhau })} />
                    </View>
                    <View style={{ height: 1, backgroundColor: '#9E9E9E' }} />
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <TextInput
                            style={{ marginLeft: 10 }}
                            secureTextEntry={true}
                            placeholder='Xác nhận mật khẩu'
                            underlineColorAndroid="transparent"
                            onChangeText={(MatKhauConfirm) => this.setState({ MatKhauConfirm })} />
                    </View>
                </View>
                <TouchableOpacity onPress={this.checkPass}>
                    <View style={styles.viewGui}>
                        <Text style={{ fontSize: 17, color: 'white', fontWeight: 'bold' }}>
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
        backgroundColor: '#23b34c',
        height: DEVICE_HEIGHT / 12,
        justifyContent: 'center',
        alignItems: 'center'


    },
})