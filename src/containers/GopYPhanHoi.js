import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Image,
} from 'react-native'
import Dimensions from 'Dimensions';
import * as Dimention from "../configs/Dimention";

class GopYPhanHoi extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            title:'Báo cáo sai phạm',
            headerStyle: {backgroundColor: '#23b34c'},
            headerTitleStyle: {color: 'white'},
            headerTintColor: 'white',

        }
    }
    constructor(props){
        super(props)
        this.state = {
            MoTa: '',
        }
}
    render (){
        return (
            <View>

                <View style = {styles.viewImage}>
                    <Image
                        source={require('../../src/images/camera.png')}
                        style={styles.imagePost}

                    />
                    <Text style = {{color: 'black', fontWeight:'bold'}}>Bạn cần đăng 1 hình</Text>
                </View>
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
export default GopYPhanHoi;
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
        borderColor: "#0288D1",
        backgroundColor:'#B3E5FC',
        height: DEVICE_HEIGHT/12,
        justifyContent:'center',
        alignItems:'center'


    },
    viewImage: {
        marginTop: 10,
        marginHorizontal: 10,
        height: DEVICE_HEIGHT/5,
        backgroundColor:'#B3E5FC',
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 5
    },
    imagePost: {
        width: 60,
        height: 60,

    }
})