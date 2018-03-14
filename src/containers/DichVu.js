import React, {Component} from 'react';
import {
    View,
    Text,
    AsyncStorage,
    TouchableOpacity,
    FlatList,ScrollView
} from 'react-native';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import ImageSlider from 'react-native-image-slider';
import {callApiDichVu} from "../actions/DichvuActions";
import {connectToSocket, disConnectToSocket, joinToChat} from '../actions/SocketActions';
import SocketIOClient from 'socket.io-client';
import * as URL from '../Constants'
import Icon from 'react-native-vector-icons/dist/Entypo'
import DichVuItem from '../components/DichVuItem'

class DichVu extends Component {
    static navigationOptions = ({navigation}) => {
        const {state} = navigation;
        return {
            headerLeft: <TouchableOpacity onPress={() => {
                navigation.navigate('DrawerOpen')
            }}>
                <Icon name="menu" size={30} style={{marginLeft: 7}} color="white"/>
            </TouchableOpacity>,
            headerStyle: {backgroundColor: '#23b34c'},
            headerTitleStyle: {color: 'white'},
        }

    }

    constructor(props) {
        super(props);

        this.state = {
            position: 1,
            interval: null,
            dataImg: '',
            listDichVu: [
                {
                    id: 'abcd',
                    name: "Thuê căn hộ",
                    icon: "https://cdn1.iconfinder.com/data/icons/travel-40/256/Vacation_Rental-512.png",
                    type:'house',
                    icon2:require('../images/thuenha.png')

                },
                {
                    id: 'abcd',
                    name: "Nước uống",
                    icon: "https://img00.deviantart.net/8bf6/i/2011/350/2/a/skylanders_water_icon_by_omniferious-d4j618s.png",
                    type:'common',
                    icon2:require('../images/nuocuong.png'),
                    data:{
                        phone:'09835439534',
                        adress:'Tầng 1 - B5',
                        price:'10.000 vnđ/bình',
                        description:'nuoc sach'
                    }
                }, {
                    icon2:require('../images/giupviec.png'),
                    id: 'abcd',
                    name: "Giúp việc",
                    icon: "https://cdn1.iconfinder.com/data/icons/cleaning-services-glyph-black/2048/7849_-_Wipe_with_Hand-512.png",
                    data:{
                        phone:'09835439534',
                        adress:'Tầng 1 - B5',
                        price:'4.000.000đ/tháng',
                        description:'dịch vụ tốt nhất'
                    }
                }, {
                    icon2:require('../images/goitaxi.png'),
                    id: 'abcd',
                    name: "Gọi taxi",
                    icon: "https://cdn.pixabay.com/photo/2015/01/17/11/37/taxi-icon-602136_640.png",
                    data:{
                        phone:'09835439534',
                        adress:'Tầng 1 - B5',
                        price:'10.000đ/km',
                        description:'taxi giá rẻ'
                    }
                }
                , {
                    icon2:require('../images/giasu.png'),
                    id: 'abcd',
                    name: "Gia sư",
                    icon: "https://d30y9cdsu7xlg0.cloudfront.net/png/62983-200.png",
                    data:{
                        phone:'09835439534',
                        adress:'Tầng 1 - B5',
                        price:'10.000đ/km',
                        description:'taxi giá rẻ'
                    }
                },
                {
                    icon2:require('../images/bac_si.png'),
                    id: 'abcd',
                    name: "Bác sĩ",
                    icon: "https://d30y9cdsu7xlg0.cloudfront.net/png/22779-200.png",
                    data:{
                        phone:'09835439534',
                        adress:'Tầng 1 - B5',
                        price:'80.000đ/lần khám',
                        description:'bác sỹ tận tâm'
                    }
                },
                {
                    icon2:require('../images/giatla.png'),
                    id: 'abcd',
                    name: "Giặt là",
                    icon: "https://d30y9cdsu7xlg0.cloudfront.net/png/28865-200.png",
                    data:{
                        phone:'09835439534',
                        adress:'Tầng 1 - B5',
                        price:'',
                        description:'bác sỹ tận tâm'
                    }
                },
                {
                    icon2:require('../images/thucphamsach.png'),
                    id: 'abcd',
                    name: "Thực phẩm sạch",
                    icon: "https://png.icons8.com/metro/1600/vegetarian-food.png"
                },
                {
                    icon2:require('../images/dotaphoa.png'),
                    id: 'abcd',
                    name: "Đồ tạp hóa",
                    icon: "https://d30y9cdsu7xlg0.cloudfront.net/png/177723-200.png"
                },
                {
                    icon2:require('../images/thayga.png'),
                    id: 'abcd',
                    name: "Thay ga",
                    icon: "https://d30y9cdsu7xlg0.cloudfront.net/png/8486-200.png"
                },
                {
                    icon2:require('../images/goiship.png'),
                    id: 'abcd',
                    name: "Gọi ship",
                    icon: "https://d30y9cdsu7xlg0.cloudfront.net/png/26575-200.png"
                },
                {
                    icon2:require('../images/suachua.png'),
                    id: 'abcd',
                    name: "Sửa chữa",
                    icon: "https://di-uploads-pod6.dealerinspire.com/mercedesbenzmanhattan/uploads/2017/04/wrenches12.png"
                },
                {
                    icon2:require('../images/vanphong.png'),
                    id: 'abcd',
                    name: "Văn phòng",
                    icon: "http://www.free-icons-download.net/images/office-building-icon-28005.png"
                }

            ],

        };


        console.ignoredYellowBox = [
            'Setting a timer'
        ];

        this.socket = SocketIOClient("http://222.252.16.186:9061/");
        console.log('socket', this.socket)
        // this.socket = SocketIOClient("http://192.168.1.68:6888" ,
        //     {query: 'token=eyJhbGciOiJIUzI1NiJ9.NWE5ZWIyZjA1ZTM1ODcxYjE1ZmRiZTJm.hXLTc3OtgBD5QilkTeh_Olr_tgfE72QmxuQ8hF82tog'}
        // );
        // console.log('socket', this.socket)
        this.socket = SocketIOClient("http://backend.thinhnv.net?token=eyJhbGciOiJIUzI1NiJ9.NWE5YmQ3N2E1ODc3YjY0YzE1MjgxNTFm.HIWMzAJXmauqu1tPH6px24Mr93hDHNCCkTGXIdCUAO4" ,
            // {
            //     jsonp: false,
            //     transports: ['websocket']
            // }
        );
        console.log('socket', this.socket)
        // this.token = AsyncStorage.getItem('token').then((data) => {
        //
        //     this.socket = SocketIOClient(URL.BASE_URL, {query: 'token=' + data});
        //     const {callConnectSocket, callJoinToChat, listenDisconnectSocket} = this.props;
        //     console.log("call connect socket");
        //     callConnectSocket(this.socket).then(() => {
        //         if (this.props.SocketRef.socket && this.props.SocketRef.socket.connected) {
        //             console.log("call join to chat");
        //             callJoinToChat(this.props.SocketRef.socket);
        //         }
        //         //listen disconnect
        //         listenDisconnectSocket(this.socket);
        //
        //     });
        // });


    }


    componentWillMount() {
        console.log("call dich vu");
        const {callApiDichVu} = this.props;
        callApiDichVu().then(dataDichVu => {

        });
        this.setState({
            interval: setInterval(() => {
                this.setState({position: this.state.position === 2 ? 0 : this.state.position + 1});
            }, 4000)
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

    render() {
        const {imageSlider} = this.props;
        const {navigation} = this.props;

        if (imageSlider.length <= 0) {
            return null;
        }

        return (
<ScrollView
    showsHorizontalScrollIndicator={true}
    showVerticalScrollIndicator={true}
>
            <View>
                <View>
                <ImageSlider images={[
                imageSlider[0].thumbnail,
                imageSlider[1].thumbnail,
                imageSlider[2].thumbnail,
                ]}
                position={this.state.position}
                onPositionChanged={position => this.setState({position})}/>
                </View>

                    < FlatList
                         showsHorizontalScrollIndicator={false}
                         showVerticalScrollIndicator={false}
                        data={this.state.listDichVu}
                        renderItem={(item) => {
                            return (
                                <DichVuItem
                                    dataItem={item}
                                    navigation={navigation}
                                />
                            )
                        }}
                        numColumns={3}
                        keyExtractor={(item, index) => index}
                        style={{marginBottom: 100, marginLeft: 10, marginRight: 10, marginTop: 10}}
                    />
                </View>
</ScrollView>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        imageSlider: state.DichVuReducers,
        SocketRef: state.SocketRef
    }
};

const mapDispatchToProps = (dispatch) => {

    return {
        callApiDichVu: bindActionCreators(callApiDichVu, dispatch),
        callConnectSocket: bindActionCreators(connectToSocket, dispatch),
        callJoinToChat: bindActionCreators(joinToChat, dispatch),
        listenDisconnectSocket: bindActionCreators(disConnectToSocket, dispatch)

    }
};

DichVu = connect(mapStateToProps, mapDispatchToProps)(DichVu);

export default DichVu