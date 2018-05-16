import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
    AsyncStorage,
    ImageBackground,
    Image,
    TextInput,
    KeyboardAvoidingView,
    ActivityIndicator,
    Linking,
    Platform,
    ScrollView
} from 'react-native';
import Dimensions from 'Dimensions';
import Communications from 'react-native-communications';
import UserInput from "../components/Login/UserInput";
import { addTodo, callApiLogin } from "../actions/LoginActions";
import images from "../components/images";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            SoDienThoai: '',
            MatKhau: '',
            showPass: true,
            press: false,
            isLoading: false
        }
        this.showPass = this.showPass.bind(this);
    }

    componentDidMount() {
    }

    showPass = () => {
        this.setState({ showPass: !this.state.showPass });
    }

    Login() {

        const { callApiLogin } = this.props;
        this.setState({ isLoading: true })
        callApiLogin(this.state.SoDienThoai, this.state.MatKhau).then(data => {
            console.log('sdt---', this.state.SoDienThoai);
            console.log('mk---', this.state.MatKhau);
            console.log('token---', data.token);
            this.setState({ isLoading: false })
            if (data.errorCode === 0) {
                AsyncStorage.setItem('token', data.token);
                this.props.navigation.navigate('LoadData')


            }
            else {
                this.setState({
                    isLoading: false,
                    error: true
                })
                Alert.alert(
                    'Thông báo',
                    data.message,
                    [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ],
                    { cancelable: false }
                )
            }
        }).catch(exception => {

            this.setState({
                isLoading: false,
                error: true
            })
            Alert.alert("Có lỗi", "Vui lòng thử lại sau");
        });
    }

    render() {
        return (
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? "padding" : null}
            // keyboardVerticalOffset={64}
            >
               
                <ImageBackground style={styles.picture}
                    source={require('../images/wallpaper.png')}
                >

                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>

                        <Image source={require('../images/logo2.png')} />

                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <UserInput nameIcon="user-circle"
                                // keyboardType={'numeric'}
                                placeholder={'Nhập số điện thoại'}
                                keyboardType={'numeric'}
                                   returnKeyType={'done'}
                                autoCorrect={false}
                                style={{ marginTop: 20 }}
                                onChangeText={(SoDienThoai) => this.setState({ SoDienThoai })}
                            />
                            <UserInput nameIcon="lock"
                                secureTextEntry={this.state.showPass}
                                placeholder='Nhập mật khẩu'
                                returnKeyType={'done'}
                                autoCorrect={false}
                                style={{ marginTop: 20 }}
                                onChangeText={(MatKhau) => {
                                    this.setState({ MatKhau })
                                }}
                            />
                            <TouchableOpacity onPress={() => this.showPass()}
                                style={{ marginTop: 10 }}>
                                <Text style={{ color: '#23b34c' }}>Hiển thị mật khẩu</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.Login()}
                                style={{
                                    marginHorizontal: 20,
                                    marginTop: 30,
                                    minHeight: 40
                                }}
                            >
                                <View style={{
                                    backgroundColor: '#23b34c',
                                    borderWidth: 1,
                                    borderColor: '#23b34c',
                                    width: DEVICE_WIDTH - 40,
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>ĐĂNG NHẬP</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{ marginTop: 15, flexDirection: 'row', marginHorizontal: 20 }}>
                                <View style={{ flex: 1, }}>
                                    <TouchableOpacity style={{}}
                                        onPress={() => this.props.navigation.navigate('QuenMatKhau')}>
                                        <Text
                                            style={{
                                                color: '#23b34c',
                                                textDecorationLine: 'underline',
                                                textAlign: 'left',

                                            }}>Quên
                                            mật khẩu?</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 1, }}>
                                    <TouchableOpacity style={{}}
                                        onPress={() => this.props.navigation.navigate('DangKi')}>
                                        <Text
                                            style={{
                                                color: '#23b34c',
                                                textDecorationLine: 'underline',
                                                textAlign: 'right'
                                            }}>Đăng
                                            ký</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', flex: 1, }}>
                                <View style={{ justifyContent: 'flex-end', alignItems: 'flex-start', flexDirection: 'column', flex: 1, marginLeft: 2 }}>
                                    <TouchableOpacity onPress={() => Communications.phonecall('0902703073', true)}>
                                        <Text style={styles.bottomText}>
                                            Hotline: 0902.703.073
                                            </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', flex: 1, flexDirection: 'column', marginRight: 2 }}>
                                    <TouchableOpacity onPress={() => {
                                        let url = "http://homesun.vn";
                                        console.log("url", url);
                                        Communications.web(url);
                                    }}
                                        style={{ marginLeft: 20, }}>
                                        <Text style={styles.bottomText}>
                                            Website: Homesun.vn
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>



                    </View>
                   
                </ImageBackground>
                {this.state.isLoading ?
                    <View style={{
                        top: -10,
                        bottom: -10,
                        left: -10,
                        right: -10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        zIndex: 1,
                        backgroundColor: 'rgba(52, 52, 52, 0.3)'
                    }}>
                        <ActivityIndicator size="large" color="green" />
                    </View> : null
                }
            
                
                
            </KeyboardAvoidingView>


        );
    }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
    textinput: {
        borderWidth: 1,

    },
    picture: {
        flex: 1,
        width: null,
        height: null,

    },
    bottomText: {
        fontWeight: 'bold',
        color: '#000000',
        fontSize: 16,


    },
    container: {
        backgroundColor: '#4c69a5',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

const mapStateToProps = (state) => {
    return {
        LoginReducers: state.LoginReducers
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        // addTodo: bindActionCreators(addTodo, dispatch),
        callApiLogin: bindActionCreators(callApiLogin, dispatch)
    }
};

Login = connect(mapStateToProps, mapDispatchToProps)(Login);

export default Login