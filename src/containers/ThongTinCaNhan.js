import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ImageBackground,
} from 'react-native'
import images from "../components/images";
import Dimensions from 'Dimensions';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {callApiProfile} from "../actions/ProfileActions";
// import {callApiProfile} from "../actions/ProfileActions";

class ThongTinCaNhan extends Component {
    constructor(props){
        super(props)
        this.state = {
            dataProfile :'',

        }
    }
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            title:'Thông tin cá nhân',
            headerStyle: {backgroundColor: '#23b34c'},
            headerTitleStyle: {color: 'white'},
            headerTintColor: 'white',

        }
    }
    componentWillMount(){
        const { callApiProfile } = this.props;
        callApiProfile().then(dataRes=> {
            this.setState({
                dataProfile: dataRes.data[0]
            })
            console.log('dataprofile', this.state.dataProfile)
        })
    }
    render (){
        return (
            <View style = {{flex:1}}>
                <ImageBackground style = {{flex:3, alignItems:'center', width: null, height: null}}
                                 source = {images.hieu}>
                    <Image style={styles.image_circle}
                           source={{
                               uri: 'https://znews-photo-td.zadn.vn/w820/Uploaded/kcwvouvs/2017_04_18/15624155_1264609093595675_8005514290339512320_n.jpg'
                           }}
                           resizeMode="cover"
                    >
                    </Image>
                </ImageBackground>
                <View style = {{backgroundColor:'white', flex:5}}></View>
                <View style = {{
                        position: 'absolute', zIndex: 99,
                        marginTop: DEVICE_WIDTH / 3 + 50,
                        backgroundColor:'white', marginLeft:40,
                        height: 360,
                        width: 280,
                        borderWidth:1,
                        borderRadius:10,
                        borderColor:'#ddd',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                    }}>
                    <Text style = {{marginLeft:10, color: 'black', fontSize:15, marginTop: 10}}>Thông tin cá nhân</Text>
                    <View style = {{height:1, marginHorizontal:10 , backgroundColor:'#9E9E9E', marginTop:5}}/>
                    <View style = {{flexDirection:'row', marginLeft: 10, marginTop:10}}>
                        <Text style = {{fontSize: 15, color:'black'}}>Họ tên: </Text>
                        <Text style = {{fontSize: 15, color:'black'}}>{this.state.dataProfile.userName} </Text>
                    </View>
                    <View style = {{flexDirection:'row', marginLeft: 10, marginTop:5}}>
                        <Text style = {{fontSize: 15, color:'black'}}>Giới tính: </Text>
                        <Text style = {{fontSize: 15, color:'black'}}>Nam</Text>
                    </View>
                    <View style = {{flexDirection:'row', marginLeft: 10, marginTop:5}}>
                        <Text style = {{fontSize: 15, color:'black'}}>Ngày sinh: </Text>
                        <Text style = {{fontSize: 15, color:'black'}}>08/09/1993 </Text>
                    </View>
                    <Text style = {{marginLeft:10, color: 'black', fontSize:15, marginTop: 20}}>Thông tin liên hệ</Text>
                    <View style = {{height:1, marginHorizontal:10 , backgroundColor:'#9E9E9E', marginTop:5}}/>
                    <View style = {{flexDirection:'row', marginLeft: 10, marginTop:10}}>
                        <Text style = {{fontSize: 15, color:'black'}}>Số điện thoại: </Text>
                        <Text style = {{fontSize: 15, color:'black'}}>0963250395 </Text>
                    </View>
                    <View style = {{flexDirection:'row', marginLeft: 10, marginTop:5}}>
                        <Text style = {{fontSize: 15, color:'black'}}>Email: </Text>
                        <Text style = {{fontSize: 15, color:'black'}}>{this.state.dataProfile.email}</Text>
                    </View>
                    <Text style = {{marginLeft:10, color: 'black', fontSize:15, marginTop:20}}>Thông tin cá nhân</Text>
                    <View style = {{height:1, marginHorizontal:10 , backgroundColor:'#9E9E9E', marginTop:5}}/>
                    <View style = {{flexDirection:'row', marginLeft: 10, marginTop:10}}>
                        <Text style = {{fontSize: 15, color:'black'}}>Khu đô thị: </Text>
                        <Text style = {{fontSize: 15, color:'black'}}>Time City </Text>
                    </View>
                    <View style = {{flexDirection:'row', marginLeft: 10, marginTop:5}}>
                        <Text style = {{fontSize: 15, color:'black'}}>Số nhà: </Text>
                        <Text style = {{fontSize: 15, color:'black'}}>1080</Text>
                    </View>
                    <View style = {{flexDirection:'row', marginLeft: 10, marginTop:5}}>
                        <Text style = {{fontSize: 15, color:'black'}}>Tầng/Lầu: </Text>
                        <Text style = {{fontSize: 15, color:'black'}}>10 </Text>
                    </View>
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
        callApiProfile : bindActionCreators(callApiProfile, dispatch),
    }
};

ThongTinCaNhan = connect( mapStateToProps, mapDispatchToProps)(ThongTinCaNhan);
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

    }
})