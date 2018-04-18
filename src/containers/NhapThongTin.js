import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Picker,
    Alert, AsyncStorage,
} from 'react-native';
import Dimensions from 'Dimensions';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from '../components/ButtonRadio/SimpleRadioButton';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {callApiDangKy} from "../actions/DangKyActions";
import { NavigationActions } from 'react-navigation';
import {BASE_URL, LIKE, LISTTOA} from "../Constants";
import logout from '../components/TokenExpired'
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
            GioiTinh: 1,
            Toa: '',
            Ho: '',
            Ten: '',
            Email: '',
            dataToa: [],
            NgaySinh: '',
            types1: [{label: 'Nam', value: 1}, {label: 'Nữ', value: 2}, {label: 'Khác', value: 3}],
            value1: 1,
            value1Index: 0,

        }
    }
    getToa = () => {
        AsyncStorage.getItem("token").then(value => {

            fetch(BASE_URL + LISTTOA, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": value
                },

            }).then(response => {
                return response.json()
            }).then(dataRes => {
                console.log('dtatREs', dataRes)
                if(dataRes.errorCode && dataRes.errorCode === "401"){
                    logout(AsyncStorage,this.props)
                    return;
                }
                this.setState({
                    dataToa: dataRes.data,
                    Toa: dataRes.data[0]._id
                }, ()=> {
                    console.log('dataToa', this.state.dataToa)
                })
            }).catch(e => {
                console.log("exception", e);
            });
        });

    }
    componentDidMount(){
        this.getToa()
    }
    DangKyTaiKhoan=  ()=> {
        const { params } = this.props.navigation.state
        console.log('params', params)
        const { callApiDangKy } = this.props
        callApiDangKy(this.state.Ten, this.state.Ho, "", params.SDT, params.MK, params.MKConfirm, this.state.value1, this.state.Toa, this.state.NgaySinh).then(dataRes => {
            console.log('data', dataRes)
            // let errors
            let errors = dataRes.errorCode !== 0 ? dataRes.errors : null
            let data = errors ? JSON.parse(errors) : null
            console.log('data1', data)
            if(dataRes.errorCode===0) {
                Alert.alert(
                    'Thông báo',
                    dataRes.message
                    ,
                    [
                        {text: 'OK', onPress: () => {
                                const resetAction = NavigationActions.reset({
                                    index: 0,
                                    actions: [
                                        NavigationActions.navigate({
                                            routeName: 'Login',
                                        }),
                                    ]
                                });
                                this.props.navigation.dispatch(resetAction)
                            }},
                    ],
                    { cancelable: false }
                )
            }
            if (dataRes.errors) {
                Alert.alert(
                    'Thông báo',
                    data[0].msg
                    ,
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: false }
                )
            }
            else {
                Alert.alert(
                    'Thông báo',
                    dataRes.message
                    ,
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: false }
                )
            }



        })

    }
    render() {
        dataToaNha = this.state.dataToa;
        return (
            <View style = {{backgroundColor:'white', flex:1}}>
                <Text style  ={{marginLeft: 12, color: 'black', fontSize: 15, marginTop: 10}}>Họ*</Text>
                <TextInput
                    style = {{marginLeft: 10}}
                    placeholder = 'Nhập họ'
                    underlineColorAndroid="transparent"
                    onChangeText = {(Ho) => this.setState({Ho})}/>
                <View style = {{height:1, backgroundColor: '#9E9E9E', marginHorizontal: 12}}/>
                <Text style  ={{marginLeft: 12, color: 'black', fontSize: 15 }}>Tên*</Text>
                <TextInput
                    style = {{marginLeft: 10}}
                    placeholder = 'Nhập tên'
                    underlineColorAndroid="transparent"
                    onChangeText = {(Ten) => this.setState({Ten})}/>
                <View style = {{height:1, backgroundColor: '#9E9E9E', marginHorizontal: 12}}/>
                <Text style  ={{marginLeft: 12, color: 'black', fontSize: 15 }}>Ngày sinh*</Text>
                <TextInput
                    style = {{marginLeft: 10}}
                    placeholder = 'DD/MM/YYYY'
                    underlineColorAndroid="transparent"
                    onChangeText = {(NgaySinh) => this.setState({NgaySinh})}/>
                <View style = {{height:1, backgroundColor: '#9E9E9E', marginHorizontal: 12}}/>
                <Text style  ={{marginLeft: 12, color: 'black', fontSize: 15 }}>Địa chỉ*</Text>
                <TextInput
                    style = {{marginLeft: 10}}
                    placeholder = 'P101, Tòa nhà Victoria, Quận Hà Đông'
                    underlineColorAndroid="transparent"
                    onChangeText = {(Toa) => this.setState({Toa})}/>
                <View style = {{height:1, backgroundColor: '#9E9E9E', marginHorizontal: 12}}/>
                <Text style  ={{marginLeft: 12, color: 'black', fontSize: 15 }}>Giới Tính*</Text>
                <RadioForm
                    ref="radioForm"
                    radio_props={this.state.types1}
                    initial={0}
                    formHorizontal={false}
                    labelHorizontal={true}
                    buttonColor={'#2196f3'}
                    labelColor={'#000'}
                    animation={true}
                    onPress={(value, index) => {
                        this.setState({
                            value1:value,
                            value1Index:index
                        })
                    }}
                />
                <TouchableOpacity onPress = {this.DangKyTaiKhoan}>
                    <View style = {styles.viewGui}>
                        <Text style = {{fontSize: 17, color: 'white', fontWeight:'bold'}}>
                            TIẾP TỤC
                        </Text>


                    </View>
                </TouchableOpacity>

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
        callApiDangKy: bindActionCreators(callApiDangKy, dispatch)
    }
};

NhapThongTin = connect(mapStateToProps, mapDispatchToProps)(NhapThongTin);
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