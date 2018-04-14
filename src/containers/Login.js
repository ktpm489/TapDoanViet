import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
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
    KeyboardAvoidingView
} from 'react-native';
import Dimensions from 'Dimensions';
import Communications from 'react-native-communications';
import UserInput from "../components/Login/UserInput";
import {addTodo, callApiLogin} from "../actions/LoginActions";
import images from "../components/images";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            SoDienThoai: '',
            MatKhau: '',
            showPass: true,
            press: false,
        }
        this.showPass = this.showPass.bind(this);
    }

    componentDidMount() {
    }

    showPass() {
        this.state.press === false ? this.setState({showPass: false, press: true}) : this.setState({
            showPass: true,
            press: false
        });
    }

    Login() {

        const {callApiLogin} = this.props;
        callApiLogin(this.state.SoDienThoai, this.state.MatKhau).then(data => {
            console.log('data', data.token);
            if (data.errorCode === 0) {
                AsyncStorage.setItem('token', data.token);
                this.props.navigation.navigate('LoadData')


            }
            else {
                this.setState({
                    loading: false,
                    error: true
                })
                Alert.alert(
                    'Thông báo',
                    data.message,
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: false}
                )
            }
        }).catch(exception => {
            console.log("exception", exception);
        });
    }

    render() {
        return (
            <KeyboardAwareScrollView
                // style={{ backgroundColor: '#4c69a5' }}
                // resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={styles.container}
                // scrollEnabled={false}
            >
            <ImageBackground style={styles.picture}
                             source={require('../images/wallpaper.png')}
            >
                    <View style={{flex: 1, justifyContent: 'space-between',}}>
                        <View style = {{flex: 10}}>
                            <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
                                <Image source={images.logo}/>
                            </View>
                            <View style={{flex: 5, alignItems: 'center', marginTop: 40}}>
                                <UserInput nameIcon="user-circle"
                                    // keyboardType={'numeric'}
                                           placeholder={'Nhập số điện thoại'}
                                           keyboardType={'numeric'}
                                           autoCapitalize={'none'}
                                           returnKeyType={'done'}
                                           autoCorrect={false}
                                           style={{marginTop: 20}}
                                           onChangeText={(SoDienThoai) => this.setState({SoDienThoai})}
                                />
                                <UserInput nameIcon="lock"
                                           secureTextEntry={this.state.showPass}
                                           placeholder='Nhập mật khẩu'
                                           returnKeyType={'done'}
                                           autoCapitalize={'none'}
                                           autoCorrect={false}
                                           style={{marginTop: 20}}
                                           onChangeText={(MatKhau) => {
                                               this.setState({MatKhau})
                                           }}
                                />
                                <TouchableOpacity onPress={this.showPass}
                                                  style={{marginTop: 10}}>
                                    <Text style={{color: '#23b34c'}}>Hiển thị mật khẩu</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.Login()}>
                                    <View style={{
                                        backgroundColor: '#23b34c',
                                        borderWidth: 1,
                                        borderColor: '#23b34c',
                                        width: DEVICE_WIDTH - 40,
                                        marginHorizontal: 20,
                                        marginTop: 30,
                                        minHeight: 40,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Text style={{color: 'white', fontWeight: 'bold'}}>ĐĂNG NHẬP</Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={{marginTop: 15, flexDirection: 'row', marginHorizontal: 20}}>
                                    <TouchableOpacity style={{flex: 1}}>
                                        <Text
                                            style={{
                                                color: '#23b34c',
                                                textDecorationLine: 'underline',
                                                textAlign: 'left',
                                            }}>Quên
                                            mật khẩu?</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{flex: 1}}
                                                      onPress={() => this.props.navigation.navigate('DangKi')}>
                                        <Text
                                            style={{
                                                color: '#23b34c',
                                                textDecorationLine: 'underline',
                                                textAlign: 'right'
                                            }}>Đăng
                                            kí</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', marginHorizontal: 20}}>
                            <TouchableOpacity onPress={() => Communications.phonecall('0902703073', true)}>
                                <Text style={styles.bottomText}>
                                    Hotline: 0902703073
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => Communications.phonecall('0963250395', true)}
                                              style={{marginLeft: 20}}>
                                <Text style={styles.bottomText}>
                                    Website: tapdoanviet.vn/
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </View>
            </ImageBackground>
            </KeyboardAwareScrollView>
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
        color: '#23b34c'

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