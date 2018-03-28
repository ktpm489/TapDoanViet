import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native'
import Dimensions from 'Dimensions';
import PickerImage from "../components/PickerImage";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {callApiUploadImg} from "../actions/TaoBaiVietActions";

class GopYPhanHoi extends Component {
    constructor(props){
        super(props)
        this.state = {
            isCheck:true,
            dataImage: null,
            avatarSource: null,
            Mota: ''

        }

    }
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            title:'Báo cáo sai phạm',
            headerStyle: {backgroundColor: '#23b34c'},
            headerTitleStyle: {color: 'white'},
            headerTintColor: 'white',

        }
    }

    show(){
        PickerImage((source, data) => {
            this.setState({avatarSource: source, dataImage: data,isCheck: false}, () => {
                    this.upload();
                }
            )
        });
    }
    upload (){
        // console.log('base64', this.state.dataImage)
        // dataImg = this.state.dataImage;

        const { callApiUploadImg } = this.props;
        callApiUploadImg(this.state.dataImage).then(dataPost => {
            console.log('datapost1', dataPost)

            // console.log('datapost1', dataPost.message)
        })
    }
    render (){
        let img = this.state.avatarSource == null? null:
            <Image
                source={this.state.avatarSource}
                style={styles.viewImage}
            />
        return (
            <View>
                {
                    this.state.isCheck ?
                    <View style={styles.viewImage}>
                        <TouchableOpacity onPress={this.show.bind(this)}>
                            <Image
                                source={require('../images/camera.png')}
                                style={styles.imagePost}

                            />
                        </TouchableOpacity>
                        <Text style={{color: 'black', fontWeight: 'bold'}}>Bạn cần đăng 1 hình</Text>
                    </View> : img
                }
                <View style = {styles.viewWrap}>
                    <TextInput
                        style = {{
                            marginLeft: 10,
                        }}
                        placeholder = 'Nhập nôi dung báo cáo sai phạm'
                        underlineColorAndroid="transparent"
                        onChangeText = {(MoTa) => this.setState({MoTa})}/>
                </View>
                <View style = {styles.viewGui}>
                    <Text style = {{fontSize: 17}}>
                        Báo cáo sai phạm
                    </Text>


                </View>

            </View>
        )

    }
}
const mapStateToProps = (state) => {
    return {
        // imageGet: state.TaoBaiVietReducers
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        callApiUploadImg : bindActionCreators(callApiUploadImg, dispatch),
    };
}

GopYPhanHoi = connect(mapStateToProps, mapDispatchToProps)(GopYPhanHoi);

export default GopYPhanHoi

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
    viewWrap: {
        marginHorizontal: 10,
        marginTop: 10,
        borderWidth: 1,
        height: DEVICE_HEIGHT/12,
        borderColor: '#cccccc',
        borderRadius:40,
        justifyContent:'center' ,
    },
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
    viewImage: {
        marginTop: 10,
        marginHorizontal: 10,
        height: DEVICE_HEIGHT/5,
        backgroundColor:'#AED581',
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 5,
        borderColor:'#23b34c'
    },
    imagePost: {
        width: 60,
        height: 60,

    }
})