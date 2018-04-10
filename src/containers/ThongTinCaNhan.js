import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    TextInput,
} from 'react-native'
import images from "../components/images";
import Dimensions from 'Dimensions';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {callApiProfile} from "../actions/ProfileActions";
import PickerImage from "../components/PickerImage";
import {callApiUploadImg} from "../actions/TaoBaiVietActions";
import {callApiUpdateInfo} from "../actions/UpdateInfoActions";

// import {callApiProfile} from "../actions/ProfileActions";

class ThongTinCaNhan extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            title:'Thông tin cá nhân',
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
            Email: '',
            fileName: '',

            dataProfile: '',
            avatarSource: null,
            dataImage: null,
            isCheck : true

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
    show(){
        PickerImage((source, data) => {
            this.setState({avatarSource: source, dataImage: data, isCheck: false}, () => {
                    this.upload();
                }
            )
        });
    }
    upload (){
        const { callApiUploadImg } = this.props;
        callApiUploadImg(this.state.dataImage, 'avatar').then(dataPost => {
            console.log('datapost1', dataPost)
            this.setState({
                fileName: dataPost.data.fileName
            })

        })
    }


    componentWillMount() {
        const {callApiProfile} = this.props;
        callApiProfile().then(dataRes => {
            this.setState({
                dataProfile: dataRes.data[0]
            }, ()=> {
                this.setState({
                    FisrtName: this.state.dataProfile.firstName,
                    LastName: this.state.dataProfile.lastName,
                    // NgaySinh: this.state.dataProfile.firstName,
                    SoDienThoai: this.state.dataProfile.phoneNumber,
                    Email: this.state.dataProfile.email,
                }, () => {
                    this.state.dataProfile.gender == 1 ? this.setState ({
                        GioiTinh: "Nam"
                    }) : this.state.dataProfile.gender == 2 ? this.setState ({
                        GioiTinh: "Nữ" }) :
                        this.state.dataProfile.gender == 3 ? this.setState ({
                        GioiTinh: "Khác" }) : null

                })


            })
            console.log('dataprofile', this.state.dataProfile)
        })

    }
    EditInfo = () => {
        callApiUpdateInfo().then(dataRes => {
            console.log('dataRes', dataRes)
        })

    }
    render() {
        let img = this.state.avatarSource == null? null:
            <Image
                source={this.state.avatarSource}
                style={styles.image_circle}
            />
        return (
            <View style={{flex: 1}}>
                <ImageBackground style={{flex: 3, alignItems: 'center', width: null, height: null}}
                                 source={images.hieu}>
                    {
                        this.state.isCheck ?
                        <TouchableOpacity onPress = {this.show.bind(this)}>
                            <Image style={styles.image_circle}
                                   source={{
                                       uri: 'https://znews-photo-td.zadn.vn/w820/Uploaded/kcwvouvs/2017_04_18/15624155_1264609093595675_8005514290339512320_n.jpg'
                                   }}
                                   resizeMode="cover"
                            >
                            </Image>
                        </TouchableOpacity> : img
                    }

                </ImageBackground>
                <View style={{backgroundColor: 'white', flex: 5}}></View>
                <View style={{
                    position: 'absolute', zIndex: 99,
                    marginTop: DEVICE_WIDTH / 3 + 50,
                    backgroundColor: 'white', marginLeft: 40,
                    height: 350,
                    width: 280,
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: '#ddd',
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.8,
                }}>
                    <Text style={{marginLeft: 10, color: 'black', fontSize: 15, marginTop: 10}}>Thông tin cá nhân</Text>
                    <View style={{height: 1, marginHorizontal: 10, backgroundColor: '#9E9E9E', marginTop: 5}}/>
                    <View style={styles.viewItem}>
                        <Text style={{fontSize: 15, color: 'black'}}>Tên: </Text>
                        <TextInput
                            value = {this.state.LastName}
                            underlineColorAndroid={this.state.underline}
                            editable={false}
                            selectTextOnFocus={false}
                                style = {styles.textinput}/>
                    </View>
                    <View style={styles.viewItem}>
                        <Text style={{fontSize: 15, color: 'black'}}>Giới tính: </Text>
                        <TextInput
                            value = {this.state.GioiTinh}
                            underlineColorAndroid={this.state.underline}
                            editable={false}
                            selectTextOnFocus={false}
                            style = {styles.textinput}/>
                    </View>
                    <View style={styles.viewItem}>
                        <Text style={{fontSize: 15, color: 'black'}}>Ngày sinh: </Text>
                        <TextInput
                            value = {this.state.NgaySinh}
                            underlineColorAndroid={this.state.underline}
                            editable={false}
                            selectTextOnFocus={false}
                            style = {styles.textinput}/>
                    </View>
                    <Text style={{marginLeft: 10, color: 'black', fontSize: 15, marginTop: 20}}>Thông tin liên hệ</Text>
                    <View style={{height: 1, marginHorizontal: 10, backgroundColor: '#9E9E9E', marginTop: 5}}/>
                    <View style={styles.viewItem}>
                        <Text style={{fontSize: 15, color: 'black'}}>Số điện thoại: </Text>
                        <TextInput
                            value = {this.state.SoDienThoai}
                            underlineColorAndroid={this.state.underline}
                            editable={false}
                            selectTextOnFocus={false}
                            style = {styles.textinput}/>
                    </View>
                    <View style={styles.viewItem}>
                        <Text style={{fontSize: 15, color: 'black'}}>Email: </Text>
                        <TextInput
                            value = {this.state.Email}
                            underlineColorAndroid={this.state.underline}
                            editable={false}
                            selectTextOnFocus={false}
                            style = {styles.textinput}/>
                    </View>
                    <TouchableOpacity 
                    // onPress = {this.EditInfo}
                    
                    >
                        <View style = {{justifyContent:'center', alignItems:'center',
                            marginTop: 40, minHeight: 40, marginHorizontal:90,
                            backgroundColor: '#eaa33f',
                            borderWidth:1,
                            borderRadius: 5,
                            borderColor:'#FF9800'}}>
                            <Text>Chỉnh sửa</Text>
                        </View>
                    </TouchableOpacity>

                </View>
                {/*<View style = {{*/}
                {/*position: 'absolute', zIndex: 100,*/}
                {/*marginTop:  DEVICE_WIDTH / 1 +10,*/}
                {/*backgroundColor: 'red', marginLeft: 40,*/}
                {/*height: 30,*/}
                {/*width: 80,*/}
                {/*borderWidth: 1,*/}
                {/*borderRadius: 10,*/}
                {/*borderColor: 'white'*/}
                {/*}}>*/}

                {/*</View>*/}
            </View>
        )

    }
}

const mapStateToProps = (state) => {
    return {

    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        callApiProfile: bindActionCreators(callApiProfile, dispatch),
        callApiUploadImg : bindActionCreators(callApiUploadImg, dispatch),
        callApiUpdateInfo : bindActionCreators(callApiUpdateInfo, dispatch),
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
        color: "#757575",
        padding: 0,
    },
    viewItem: {
        flexDirection: 'row',
        marginLeft: 10,
        marginTop: 10,
        alignItems:'center'
    }
})