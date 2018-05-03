import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
    Alert,
    ActivityIndicator
} from 'react-native';
import Dimensions from 'Dimensions';
import {BASE_URL, CHANGE_PASS} from "../Constants";

class ChangePass extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            title:'Thay đổi mật khẩu',
            headerStyle: {backgroundColor: '#23b34c'},
            headerTitleStyle: {color: 'white'},
            headerTintColor: 'white',

        }
    }
    constructor(props){
        super(props)
        this.state = {
            oldPass: '',
            newPass: '',
            confirmPass: '',
            isLoading:false
        }
    }
    updatePass () {
        if(this.state.oldPass.trim().length === 0){
            Alert.alert("Thông báo","Bạn phải nhập mật khẩu cũ");
            return;
        }

        if(this.state.newPass.trim().length === 0 || this.state.confirmPass.trim().length === 0){
            Alert.alert("Thông báo","Mật khẩu mới không được để trống");
            return;
        }

        if(this.state.newPass.trim() !== this.state.confirmPass.trim()){
            Alert.alert("Thông báo","Mật khẩu mới không trùng nhau");
            return;
        }
        if(this.state.newPass.trim().length < 6 || this.state.confirmPass.trim().length < 6){
            Alert.alert("Thông báo","Mật khẩu mới phải lớn hơn 6");
            return;
        }

        AsyncStorage.getItem('token').then((value) => {
            this.setState({isLoading:true})
            fetch( BASE_URL + CHANGE_PASS,  {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': value,

                },
                body: JSON.stringify({
                    oldPassword: this.state.oldPass,
                    newPassword: this.state.newPass,
                    confirmNewPassword: this.state.confirmPass,
                })
            })
                .then((response) => response.json())
                .then((dataRes)=> {
                    this.setState({isLoading:false})
                    console.log("dataRes",dataRes)
                    if(dataRes.errorCode===true) {
                        Alert.alert(
                            'Thông báo',
                            dataRes.message,
                            [
                                {text: 'OK', onPress: () => this.props.navigation.goBack()},
                            ],
                            { cancelable: false }
                        )
                    }
                    else {
                        Alert.alert(
                            'Thông báo',
                            dataRes.message,
                            [
                                {text: 'OK', onPress: () => console.log('OK Pressed')},
                            ],
                            { cancelable: false }
                        )
                    }

                }).catch((erro)=> {
                    this.setState({isLoading:false})
                console.log('erro',erro);
            })
        })



    }
    render (){
        return (
            <View style = {{justifyContent:'center', backgroundColor: "white", flex:1}}>
                <View style = {styles.itemBoder}>
                    <TextInput placeholder = 'Nhập mật khẩu cũ'
                               secureTextEntry = {true}
                               underlineColorAndroid="transparent"
                               onChangeText = {(oldPass)=>this.setState({oldPass})}/>
                </View>
                <View style = {styles.itemBoder}>
                    <TextInput placeholder = 'Nhập mật khẩu mới'
                               secureTextEntry = {true}
                               underlineColorAndroid="transparent"
                               onChangeText = {(newPass)=>this.setState({newPass})}/>
                </View>
                <View style = {styles.itemBoder}>
                    <TextInput placeholder = 'Xác nhận mật khẩu mới'
                               secureTextEntry = {true}
                               underlineColorAndroid="transparent"
                               onChangeText = {(confirmPass)=>this.setState({confirmPass})}/>
                </View>
                <TouchableOpacity onPress = {this.updatePass.bind(this)}>
                    <View style = {styles.viewGui}>
                        <Text style = {{fontSize: 17, color: 'white', fontWeight:'bold'}}>
                            HOÀN THÀNH
                        </Text>


                    </View>
                </TouchableOpacity>
                {this.state.isLoading?
                    <View style={{top:-10,bottom:-10,left:-10,right:-10, justifyContent: 'center', alignItems: 'center',position:'absolute',zIndex:1,backgroundColor: 'rgba(52, 52, 52, 0.3)'}}>
                        <ActivityIndicator size="large" color="green"/>
                    </View>:null
                }

            </View>
        );
    }
}

export default ChangePass
const DEVICE_HEIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
    itemBoder: {
        borderWidth:1,
        marginHorizontal: 10,
        marginTop:10,
        height: DEVICE_HEIGHT/12,
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


})
