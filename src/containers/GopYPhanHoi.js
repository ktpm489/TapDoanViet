import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Image,
    Alert,
    TouchableOpacity, AsyncStorage,
    KeyboardAvoidingView,
    Platform,
    ScrollView
} from 'react-native'
import Dimensions from 'Dimensions';
import PickerImage from "../components/PickerImage";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { callApiUploadImg } from "../actions/TaoBaiVietActions";
import { BASE_URL, CREATE_GROUP, FEEDBACK } from "../Constants";
import logout from '../components/TokenExpired'
class GopYPhanHoi extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isCheck: true,
            dataImage: null,
            avatarSource: null,
            MoTa: '',
            fileName: '',

        }

    }
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            title: 'Báo cáo sai phạm',
            headerStyle: { backgroundColor: '#23b34c' },
            headerTitleStyle: { color: 'white' },
            headerTintColor: 'white',

        }
    }

    show() {
        PickerImage((source, data) => {
            this.setState({ avatarSource: source, dataImage: data, isCheck: false }, () => {
                this.upload();
            }
            )
        });
    }
    upload() {
        // console.log('base64', this.state.dataImage)
        // dataImg = this.state.dataImage;

        const { callApiUploadImg } = this.props;
        callApiUploadImg(this.state.dataImage, 'feedback').then(dataPost => {
            this.setState({
                fileName: dataPost.data.fileName
            })

            // console.log('datapost1', dataPost.message)
        })
    }
    BaoCaoSaiPham = () => {
        this.textInput.clear();
        if (this.state.MoTa == "") {
            Alert.alert("Thông báo", "Nhập nội dung báo cáo sai phạm");
        }
        else {
            AsyncStorage.getItem("token").then(value => {

                fetch(BASE_URL + FEEDBACK, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": value
                    },
                    body: JSON.stringify({
                        content: this.state.MoTa,
                        image: this.state.fileName


                    })
                }).then(response => {
                    return response.json()
                }).then(data => {
                    console.log('data', data)
                    if (data.errorCode === 0) {
                        if (this.props.SocketRef.socket && this.props.SocketRef.socket.connected) {
                            this.props.SocketRef.socket.emit("new_report", data);
                        }
                        Alert.alert(
                            'Thông báo',
                            data.message,
                            [
                                { text: 'OK', onPress: () => this.props.navigation.goBack() },
                            ],
                            { cancelable: false }
                        )
                    }
                    else if (data.errorCode && data.errorCode === "401") {
                        logout(AsyncStorage, this.props)
                        return;
                    }
                    else {
                        Alert.alert(
                            'Thông báo',
                            data.message,
                            [
                                { text: 'OK', onPress: () => console.log('OK Pressed') },
                            ],
                            { cancelable: false }
                        )
                    }

                }).catch(e => {
                    console.log("exception", e);
                });
            });
        }

    }
    render() {
        let img = this.state.avatarSource == null ? null :
            <Image
                source={this.state.avatarSource}
                resizeMode="cover"
                style={styles.viewImage}
            />
        return (
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? "padding" : null}
                keyboardVerticalOffset={64}
            >
                <ScrollView style={{ flex: 1 }}>
                    {
                        this.state.isCheck ?
                            <View style={styles.viewImage}>
                                <TouchableOpacity onPress={this.show.bind(this)}>
                                    <Image
                                        source={require('../images/camera.png')}
                                        style={styles.imagePost}

                                    />
                                </TouchableOpacity>
                                <Text style={{ color: 'black', fontWeight: 'bold' }}>Bạn cần đăng 1 hình</Text>
                            </View> : img
                    }
                    {/* <View style={styles.viewWrap}> */}
                        <TextInput
                            style={styles.viewWrap}
                            placeholder='Nhập nôi dung báo cáo sai phạm'
                            underlineColorAndroid="transparent"
                            returnKeyType={'done'}
                            onChangeText={(MoTa) => this.setState({ MoTa })}
                            ref={input => {
                                this.textInput = input
                            }} />
                    {/* </View> */}
                    <TouchableOpacity onPress={this.BaoCaoSaiPham}>
                        <View style={styles.viewGui}>
                            <Text style={{ fontSize: 17 }}>
                                Báo cáo sai phạm
                        </Text>


                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        )

    }
}
const mapStateToProps = (state) => {
    return {
        imageGet: state.TaoBaiVietReducers,
        SocketRef: state.SocketRef
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        callApiUploadImg: bindActionCreators(callApiUploadImg, dispatch),
    };
}

GopYPhanHoi = connect(mapStateToProps, mapDispatchToProps)(GopYPhanHoi);

export default GopYPhanHoi

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
    viewWrap: {
        marginHorizontal: 10,
        marginLeft: 10,
        paddingLeft:10,
        marginTop: 10,
        borderWidth: 1,
        height: 50,
        borderColor: '#cccccc',
        borderRadius: 40,
        justifyContent: 'center',
    },
    viewGui: {
        marginTop: 20,
        borderWidth: 1,
        borderRadius: 5,
        marginHorizontal: 10,
        borderColor: "#23b34c",
        backgroundColor: '#23b34c',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'


    },
    viewImage: {
        marginTop: 10,
        marginHorizontal: 10,
        height: 250,
        backgroundColor: '#AED581',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderColor: '#23b34c'
    },
    imagePost: {
        width: 60,
        height: 60,

    }
})