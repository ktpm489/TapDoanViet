import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
    Button,
    Alert
} from 'react-native';
// import stylesContainer from "../../components/style";
import PickerImage from "../components/PickerImage"
import Icon from 'react-native-vector-icons/Ionicons';
import {callApiCreatePost, callApiUploadImg} from "../actions/TaoBaiVietActions";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class TaoBaiViet extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            headerRight: <TouchableOpacity style = {{marginRight:10}}
                                           onPress={() => params.handleSave()}>
                <Text style = {{color: "#1565C0"}}>Chia sẻ</Text>
            </TouchableOpacity>
        }
    }


    constructor(props){
        super (props)
        this.state = {
            Status:'',
            avatarSource: null,
            dataImage: null,
            resizedImageUri: '',
        }
    }

    share() {
        // console.log('hhhh', this.props)
        const { callApiCreatePost } = this.props;
        callApiCreatePost(this.state.Status).then(dataPost => {
            console.log('datapost', dataPost.message)
            if(dataPost.errorCode=== 0) {
                Alert.alert(
                    'Alert',
                    dataPost.message,
                    [
                        {text: 'OK', onPress: () => this.props.navigation.goBack()},
                    ],
                    { cancelable: false }
                )
            }
            else {
                Alert.alert(
                    'Alert',
                    "Cập nhập không thành không",
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: false }
                )
            }
        })
    }

    componentDidMount() {
        this.props.navigation.setParams({ handleSave: this.share.bind(this) });
    }
    show(){
        PickerImage((source, data) => {
            this.setState({avatarSource: source, dataImage: data},
            // this.upload()
            )});
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


    render () {
        let img = this.state.avatarSource == null? null:
            <Image
                source={this.state.avatarSource}
                style={{height: 200, width: 200}}
            />
        return (
            <View style = {{justifyContent: 'space-between', flex:1, backgroundColor:'white'}}>
                <View>
                    <View style  = {{flexDirection:'row', marginTop: 15}}>
                        <Image source={require('../images/chieu-cao-va-tieu-su-cua-phuong-ly-12-e1482887471940.jpg')}
                               style = {{ resizeMode: 'cover',height: 40, width:30, marginLeft:10}}>
                        </Image>
                        <View style = {{marginLeft: 10}}>
                            <Text style = {{color: 'black'}}>Nguyễn Văn A</Text>
                            <Text>Mọi người</Text>
                        </View>
                    </View>
                    <View style = {{marginHorizontal: 10, marginTop:10}}>
                        <TextInput placeholder = 'Soạn tin mới'
                                   underlineColorAndroid="transparent"
                                   onChangeText ={(Status)=> this.setState({Status})}
                                   placeholderTextSize = "20"/>
                    </View>
                </View>
                {/*<TouchableOpacity onPress={this.upload.bind(this)}>*/}
                {/*<Text style = {{fontSize: 30}}>Upload</Text>*/}
                {/*</TouchableOpacity>*/}

                {img}

                <View style = {{flexDirection:'row', marginTop:50, minHeight:30,  justifyContent: 'space-between', alignItems:'center'}}>
                    <Text>Thêm vào bài viết của bạn</Text>
                    <TouchableOpacity onPress={this.show.bind(this)}>
                        <Icon name="md-images" size={30} color="#900"
                              style = {{flex:1}}/>
                    </TouchableOpacity>

                </View>
            </View>
        );
    }

}
const mapStateToProps = (state) => {
    return {
        imageGet: state.TaoBaiVietReducers
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        callApiUploadImg : bindActionCreators(callApiUploadImg, dispatch),
        callApiCreatePost : bindActionCreators(callApiCreatePost, dispatch),
    }
};

TaoBaiViet = connect(mapStateToProps, mapDispatchToProps)(TaoBaiViet);

export default TaoBaiViet

