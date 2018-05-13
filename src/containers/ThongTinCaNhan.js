import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    TextInput, ScrollView, AsyncStorage,
    ActivityIndicator, Alert
} from 'react-native'
import images from "../components/images";
import Dimensions from 'Dimensions';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {callApiProfile} from "../actions/ProfileActions";
import PickerImage from "../components/PickerImage";
import {callApiUploadImg} from "../actions/TaoBaiVietActions";
import {callApiUpdateInfo} from "../actions/UpdateInfoActions";
import logout from "../components/TokenExpired";
import {BASE_URL, UPDATE_INFO} from "../Constants";
import moment from 'moment';


class ThongTinCaNhan extends Component {

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state

        return {
            title: 'Thông tin cá nhân',
            headerStyle: {backgroundColor: '#23b34c'},
            headerTitleStyle: {color: 'white'},
            headerTintColor: 'white',

        }
    }

    constructor(props) {
        super(props)
        this.state = {
            FisrtName: '',
            LastName: '',
            GioiTinh: '',
            NgaySinh: '',
            SoDienThoai: '',
            DiaChi: '',
            Email: '',
            fileName: '',
            editable: false,
            check: true,
            Name: '',
            isLoading: false,


            dataProfile: '',
            avatarSource: null,
            dataImage: null,
            isCheck: true

        }
    }

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state

        return {
            title: 'Thông tin cá nhân',
            headerStyle: {backgroundColor: '#23b34c'},
            headerTitleStyle: {color: 'white'},
            headerTintColor: 'white',

        }
    }

    show() {
        PickerImage((source, data) => {
            this.setState({avatarSource: source, dataImage: data, isCheck: false}, () => {
                    this.upload();
                }
            )
        });
    }

    upload() {
        const {callApiUploadImg} = this.props;
        callApiUploadImg(this.state.dataImage, 'avatar').then(dataPost => {
            console.log('datapost1', dataPost)
            this.setState({
                fileName: dataPost.data.fileName
            }, () => {
                this.UpdateAvt()
            })

        })
    }


    componentWillMount() {
        const {callApiProfile} = this.props;
        callApiProfile().then(dataRes => {
            this.setState({
                dataProfile: dataRes.data[0]
            }, () => {
                this.setState({
                    FisrtName: this.state.dataProfile.firstName !==0 ? this.state.dataProfile.firstName : null,
                    LastName: this.state.dataProfile.lastName !==0 ? this.state.dataProfile.lastName : null,
                    // Name: this.state.dataProfile.firstName + " " + this.state.dataProfile.lastName,
                    NgaySinh: this.state.dataProfile.birthDay !== 0 ? this.state.dataProfile.birthDay : null,
                    SoDienThoai: this.state.dataProfile.phoneNumber !== 0 ? this.state.dataProfile.phoneNumber : null,
                    DiaChi: this.state.dataProfile.apartmentAddress !== 0 ? this.state.dataProfile.apartmentAddress : null,
                    Email: this.state.dataProfile.email !== 0 ? this.state.dataProfile.email : null,
                }, () => {
                    this.state.dataProfile.gender == 1 ? this.setState({
                        GioiTinh: "Nam"
                    }) : this.state.dataProfile.gender == 2 ? this.setState({
                            GioiTinh: "Nữ"
                        }) :
                        this.state.dataProfile.gender == 3 ? this.setState({
                            GioiTinh: "Khác"
                        }) : null

                })


            })
            console.log('dataprofile', this.state.dataProfile)
        })

    }

    EditInfo = () => {


        this.setState({
            editable: true,
            check: false,
        })

    }
    ok = () => {
        var validate =  moment(this.state.NgaySinh.trim(), 'DD/MM/YYYY',true).isValid();
        if(!validate){
            Alert.alert("Thông báo", "Ngày tháng phải đúng định dạng DD/MM/YYYY");
            return;
        }
       


        this.setState({
            editable: false,
            check: true,
            isLoading: true,
        })
       
        // console.log("data send",JSON.stringify({
        //     email: this.state.Email,
        //     lastName: this.state.LastName,
        //     firstName: this.state.FisrtName,
        //     birthDay: this.state.NgaySinh,
        //     apartmentAddress: this.state.DiaChi
        // }));
        const {callApiProfile} = this.props
            AsyncStorage.getItem('token').then((value) => {
                fetch(BASE_URL + UPDATE_INFO, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': value,
                    },
                    body: JSON.stringify({
                        email: this.state.Email,
                        lastName: this.state.LastName,
                        firstName: this.state.FisrtName,
                        birthDay: this.state.NgaySinh,
                        apartmentAddress: this.state.DiaChi
                    })

                }).then((response) => {
                    return response.json();
                }).then(dataRes => {
                    this.setState({isLoading: false})
                    if (dataRes.errorCode === 0) {
                        Alert.alert("Thông báo","Cập nhật thành công");
                        callApiProfile().then(dataRes => {
                            console.log('dataResProfile', dataRes)
                        })
                    }else{
                        Alert.alert("Thông báo",dataRes.message);
                    }
                }).catch(e => {
                    console.log('exception', e)
                    this.setState({isLoading: false})
                })
            });
    }

    UpdateAvt() {

        const {callApiProfile} = this.props
        AsyncStorage.getItem('token').then((value) => {
            fetch(BASE_URL + UPDATE_INFO, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': value,
                },
                body: JSON.stringify({
                    avatar: this.state.fileName
                })

            }).then((response) => {
                return response.json();
            }).then(dataRes => {
                if (dataRes.errorCode === 0) {
                    callApiProfile().then(dataRes => {
                        console.log('dataResProfile', dataRes)
                    })
                }
            }).catch(e => {
                console.log('exception', e)
            })
        });
    }

    ChangPass = () => {
        const {callApiUpdateInfo, InfoUser} = this.props
        if (InfoUser.length <= 0) {
            return null
        }
        callApiUpdateInfo(InfoUser.userInfo.gender, InfoUser.userInfo.Email, InfoUser.userInfo.firstName, this.state.fileName).then(dataRes => {
            console.log('dataRes', dataRes)
        })
    }

    render() {
        const {InfoUser} = this.props
        if (InfoUser.length <= 0) {
            return null
        }
        let img = this.state.avatarSource == null ? null :
            <Image
                source={this.state.avatarSource}
                style={styles.image_circle}
            />
        return (
            <ScrollView style={{flex: 1, backgroundColor: '#ffffff'}}>
                <View style={{flex: 1}}>
                    <ImageBackground style={{flex: 3, alignItems: 'center', width: null, height: DEVICE_HEIGHT / 3}}
                                     source={images.hieu}>
                        {
                            this.state.isCheck ?
                                <TouchableOpacity onPress={this.show.bind(this)}>
                                    <Image style={styles.image_circle}
                                           source={
                                               !InfoUser.userInfo.avatar ? require("../images/noavatar.png") : {
                                                   uri: InfoUser.userInfo.avatarUrl
                                               }}
                                           resizeMode="cover"
                                    >
                                    </Image>
                                </TouchableOpacity> : img
                        }

                    </ImageBackground>
                    <View style={{backgroundColor: '#ffffff', flex: 5}}></View>
                    <View style={{
                        zIndex: 1,
                        backgroundColor: '#ffffff',
                        left: 25,
                        right: 25,
                        top: -50,
                        paddingBottom: 20,
                        width: DEVICE_WIDTH - 50,
                        borderWidth: 1,
                        borderRadius: 10,
                        borderColor: '#ddd',
                        shadowColor: '#000',
                        shadowOffset: {width: 0, height: 2},
                        shadowOpacity: 0.8,
                    }}>
                        <Text style={{marginLeft: 10, color: 'black', fontSize: 15, marginTop: 10}}>Thông tin cá
                            nhân</Text>
                        <View style={{height: 1, marginHorizontal: 10, backgroundColor: '#9E9E9E', marginTop: 5}}/>
                        <View style={[styles.viewItem, {flexDirection: "row"}]}>
                            <Text style={{fontSize: 15, color: 'black'}}>Họ: </Text>
                            <TextInput
                                value={this.state.FisrtName}
                                underlineColorAndroid={this.state.underline}
                                editable={this.state.editable}
                                onChangeText={(FisrtName) => this.setState({FisrtName})}
                                selectTextOnFocus={false}
                                style={[styles.textinput, {flex:1}]}/>
                            <Text style={{fontSize: 15, color: 'black'}}>Tên: </Text>
                            <TextInput
                                value={this.state.LastName}
                                underlineColorAndroid={this.state.underline}
                                editable={this.state.editable}
                                onChangeText={(LastName) => this.setState({LastName})}
                                selectTextOnFocus={false}
                                style={[styles.textinput, {flex:1}]}/>
                        </View>
                        <View style={styles.viewItem}>
                            <Text style={{fontSize: 15, color: 'black'}}>Giới tính: </Text>
                            <TextInput
                                value={this.state.GioiTinh}
                                underlineColorAndroid={this.state.underline}
                                editable={false}
                                selectTextOnFocus={false}
                                style={styles.textinput}/>
                        </View>
                        <View style={styles.viewItem}>
                            <Text style={{fontSize: 15, color: 'black'}}>Ngày sinh: </Text>
                            <TextInput
                                value={this.state.NgaySinh}
                                onChangeText={(NgaySinh) => this.setState({NgaySinh})}
                                underlineColorAndroid={this.state.underline}
                                editable={this.state.editable}
                                selectTextOnFocus={false}
                                style={styles.textinput}/>
                        </View>
                        {/* <Text style={{marginLeft: 10, color: 'black', fontSize: 15, marginTop: 20}}>Thông tin liên hệ</Text> */}
                        <View style={styles.viewItem}>
                            <Text style={{fontSize: 15, color: 'black'}}>Địa chỉ: </Text>
                            <TextInput
                                value={this.state.DiaChi}
                                onChangeText={(DiaChi) => this.setState({DiaChi})}
                                underlineColorAndroid={this.state.underline}
                                editable={this.state.editable}
                                selectTextOnFocus={false}
                                style={styles.textinput}/>
                        </View>

                        <View style={{height: 1, marginHorizontal: 10, backgroundColor: '#9E9E9E', marginTop: 5}}/>
                        <View style={styles.viewItem}>
                            <Text style={{fontSize: 15, color: 'black'}}>Số điện thoại: </Text>
                            <TextInput
                                value={this.state.SoDienThoai}
                                underlineColorAndroid={this.state.underline}
                                editable={false}
                                selectTextOnFocus={false}
                                style={styles.textinput}/>
                        </View>
                        {/* <View style={styles.viewItem}>
                            <Text style={{fontSize: 15, color: 'black'}}>Email: </Text>
                            <TextInput
                                value={this.state.Email}
                                onChangeText={(Email) => this.setState({Email})}
                                underlineColorAndroid={this.state.underline}
                                editable={this.state.editable}
                                selectTextOnFocus={false}
                                style={styles.textinput}/>
                        </View> */}
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ChangePass')}>
                            <Text
                                style={{marginTop: 10, marginLeft: 10, color: 'blue', textDecorationLine: 'underline'}}>Đổi
                                mật khẩu</Text>
                        </TouchableOpacity>
                        {this.state.check ?
                            <TouchableOpacity onPress={this.EditInfo}
                            >
                                <View style={{
                                    justifyContent: 'center', alignItems: 'center',
                                    marginTop: 40, minHeight: 40, marginHorizontal: 90,
                                    backgroundColor: '#eaa33f',
                                    borderWidth: 1,
                                    borderRadius: 5,
                                    borderColor: '#FF9800'
                                }}>
                                    <Text style={{color: "white", fontWeight: 'bold'}}>CHỈNH SỬA</Text>
                                </View>
                            </TouchableOpacity> : <TouchableOpacity onPress={this.ok}
                            >
                                <View style={{
                                    justifyContent: 'center', alignItems: 'center',
                                    marginTop: 40, minHeight: 40, marginHorizontal: 90,
                                    backgroundColor: '#23b34c',
                                    borderWidth: 1,
                                    borderRadius: 5,
                                    borderColor: '#33691E'
                                }}>
                                    <Text style={{color: "white", fontWeight: 'bold'}}>HOÀN THÀNH</Text>
                                </View>
                            </TouchableOpacity>

                        }

                    </View>
                </View>
                {this.state.isLoading?
                    <View style={{top:-10,bottom:-10,left:-10,right:-10, justifyContent: 'center', alignItems: 'center',position:'absolute',zIndex:1,backgroundColor: 'rgba(52, 52, 52, 0.3)'}}>
                        <ActivityIndicator size="large" color="green"/>
                    </View>:null
                }
            </ScrollView>
        )

    }
}

const mapStateToProps = (state) => {
    return {
        InfoUser: state.ProfileReducers

    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        callApiProfile: bindActionCreators(callApiProfile, dispatch),
        callApiUploadImg: bindActionCreators(callApiUploadImg, dispatch),
        callApiUpdateInfo: bindActionCreators(callApiUpdateInfo, dispatch),
    }
};

ThongTinCaNhan = connect(mapStateToProps, mapDispatchToProps)(ThongTinCaNhan);
export default ThongTinCaNhan;
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
    image_circle: {
        height: DEVICE_WIDTH / 3,
        width: DEVICE_WIDTH / 3,
        borderRadius: DEVICE_WIDTH / 6,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        marginTop: 20

    },
    textinput: {
        color: '#000000',
        padding: 0,
    },
    viewItem: {
        flexDirection: 'row',
        marginLeft: 10,
        marginTop: 10,
        alignItems: 'center'
    }
})