import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Picker
} from 'react-native';
import Dimensions from 'Dimensions';
class NhapThongTin extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            title:'Nhập thông tin',
            headerStyle: {backgroundColor: '#23b34c'},
            headerTitleStyle: {color: 'white'},
            headerTintColor: 'white',

        }
    }
    constructor(props){
        super(props)
        this.state = {
            GioiTinh: '',
            Ho: '',
            Ten: '',
            Email: '',

        }
    }

    render() {
        return (
            <View style = {{backgroundColor:'white', flex:1}}>
                <Text style  ={{marginLeft: 12, color: 'black', fontSize: 15, marginTop: 10}}>Họ</Text>
                <TextInput
                    style = {{marginLeft: 10}}
                    placeholder = 'Nhập họ'
                    underlineColorAndroid="transparent"
                    onChangeText = {(Ho) => this.setState({Ho})}/>
                <View style = {{height:1, backgroundColor: '#9E9E9E', marginHorizontal: 12}}/>
                <Text style  ={{marginLeft: 12, color: 'black', fontSize: 15 }}>Tên</Text>
                <TextInput
                    style = {{marginLeft: 10}}
                    placeholder = 'Nhập tên'
                    underlineColorAndroid="transparent"
                    onChangeText = {(Ten) => this.setState({Ten})}/>
                <View style = {{height:1, backgroundColor: '#9E9E9E', marginHorizontal: 12}}/>
                <Text style  ={{marginLeft: 12, color: 'black', fontSize: 15 }}>Email</Text>
                <TextInput
                    style = {{marginLeft: 10}}
                    placeholder = 'Tên'
                    underlineColorAndroid="transparent"
                    onChangeText = {(Email) => this.setState({Email})}/>
                <View style = {{height:1, backgroundColor: '#9E9E9E', marginHorizontal: 12}}/>
                <Text style  ={{marginLeft: 12, color: 'black', fontSize: 15 }}>Giới Tính</Text>
                <Picker
                    style = {{ width: 100, marginLeft: 3}}
                    selectedValue={this.state.GioiTinh}
                    onValueChange={(value) => this.setState({GioiTinh: value})}>
                    <Picker.Item label = {'Nam'} value ={'0'}/>
                    <Picker.Item label = {'Nữ'} value ={'1'}/>
                    <Picker.Item label = {'Khác'} value ={'2'}/>
                </Picker>
                <View style = {styles.viewGui}>
                    <Text style = {{fontSize: 17, color: 'white', fontWeight:'bold'}}>
                        TIẾP TỤC
                    </Text>


                </View>

            </View>
        )
    }
}

export default NhapThongTin
const DEVICE_HEIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
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