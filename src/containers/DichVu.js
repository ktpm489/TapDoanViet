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
import {callApiDichVu} from "../actions/DichvuActions";
import {connectToSocket, disConnectToSocket, joinToChat} from '../actions/SocketActions';
import {callApiProfile} from "../actions/ProfileActions";
import SocketIOClient from 'socket.io-client';
import * as URL from '../Constants'
import Icon from 'react-native-vector-icons/dist/Entypo'
import DichVuItem from '../components/DichVuItem'
import SlideImage from '../components/SlideImage';


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
          
            listDichVu: [],
            imageSlider:[]

        };


        console.ignoredYellowBox = [
            'Setting a timer'
        ];

        this.token = AsyncStorage.getItem('token').then((data) => {
            console.log("token",data);
        
            this.socket = SocketIOClient(URL.BASE_URL, {query: 'token=' + data});
            const {callConnectSocket, callJoinToChat, listenDisconnectSocket} = this.props;
            console.log("call connect socket");
            callConnectSocket(this.socket).then(() => {
                if (this.props.SocketRef.socket && this.props.SocketRef.socket.connected) {
                    console.log("call join to chat");
                    callJoinToChat(this.props.SocketRef.socket);
                }
                //listen disconnect
                listenDisconnectSocket(this.socket);
        
            });
        });


    }


    componentWillMount() {
        console.log("call dich vu");
        this.getListDichVu();
        const {callApiDichVu} = this.props;
        callApiDichVu().then(data => {

            console.log("aaa",data);
                this.setState({imageSlider:data.data});
                console.log("state11111",this.state);
        });
        const { callApiProfile } = this.props;
        callApiProfile().then(dataRes=> {
            
        })
        
    }

    getListDichVu =  ()=>{
        AsyncStorage.getItem('token').then((value)=> {
            fetch(URL.BASE_URL + URL.GET_SERVICE, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': value,
                },
                

            }).then((response) => {
                return response.json();
            }).then(data => {
                console.log('get dichvu response', data);
                if(data && data.errorCode == 0){
                    this.setState({listDichVu:data.data})
                }
               
            }).catch(e => {
                console.log('exception',e)
            })
        });
    }

    componentWillUnmount() {
    
    }

    
   
    render() {
        const {navigation} = this.props;

        return (
            <ScrollView
                showsHorizontalScrollIndicator={true}
                showVerticalScrollIndicator={true}
                    >
           
                    <SlideImage
                        imageSlider={this.state.imageSlider}
                       
                    />
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
        listenDisconnectSocket: bindActionCreators(disConnectToSocket, dispatch),
        callApiProfile : bindActionCreators(callApiProfile, dispatch),

    }
};

DichVu = connect(mapStateToProps, mapDispatchToProps)(DichVu);

export default DichVu