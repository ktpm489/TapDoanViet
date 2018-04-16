import React, {Component} from 'react';
import {
    View,
    Text,
    AsyncStorage,
    TouchableOpacity,
    FlatList,ScrollView,
    ActivityIndicator,
    Image,
    StyleSheet
} from 'react-native';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {callApiDichVu} from "../actions/DichvuActions";
import {connectToSocket, disConnectToSocket, joinToChat} from '../actions/SocketActions';
import {callApiProfile} from "../actions/ProfileActions";
import {getAdmin} from "../actions/GetAdminActions";
import SocketIOClient from 'socket.io-client';
import * as URL from '../Constants'
import Icon from 'react-native-vector-icons/dist/Entypo'
import DichVuItem from '../components/DichVuItem'
import SlideImage from '../components/SlideImage';
import logout from '../components/TokenExpired'


class DichVu extends Component {
    static navigationOptions = ({ navigation}) => {
        const {state} = navigation;
        return {
            headerLeft: <TouchableOpacity onPress={() => {
                    navigation.navigate('DrawerOpen')
                }}>
                    <Icon name="menu" size={30} style={{marginLeft: 7}} color="white"/>
                </TouchableOpacity>,
            tabBarIcon: () => (
                <Image
                    source={require('../images/icondichvu.png')}
                    style = {styles.iconTab}
                />
            ),
            headerStyle: { backgroundColor: '#23b34c' },
            headerTitleStyle:{ color: 'white'},
            title: 'Dịch vụ'

        }

    }

    constructor(props) {
        super(props);

        this.state = {
          
            listDichVu: [],
            imageSlider:[],
            isLoading:false

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
        this.setState({isLoading:true})
        callApiDichVu().then(data => {

            console.log("aaa",data);
                this.setState({imageSlider:data.data,isLoading:false});
                console.log("state11111",this.state);
        });
        const { callApiProfile,getAdmin } = this.props;
        
        getAdmin();
        
        callApiProfile().then(dataRes=> {
            console.log('data response profile', dataRes);
        })
        
    }

    getListDichVu =  ()=>{
        AsyncStorage.getItem('token').then((value)=> {
            this.setState({isLoading:true})
            fetch(URL.BASE_URL + URL.GET_SERVICE_CATEGORY, {
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
                    this.setState({listDichVu:data.data,isLoading:false})
                }else if(data.errorCode && data.errorCode === "401"){
                    logout(AsyncStorage,this.props)
                    return;
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
                style={{backgroundColor:'#ffffff'}}
                    >
           
                    <SlideImage
                        imageSlider={this.state.imageSlider}
                       
                    />
                    <View style={{flex:1,height:1,backgroundColor:'gray'}} />
                    <View style={{justifyContent:'center',alignItems:'center',marginTop:10,backgroundColor:'#ffffff'}}>
                    < FlatList
                         showsHorizontalScrollIndicator={false}
                         showVerticalScrollIndicator={false}
                        data={this.state.listDichVu}
                        renderItem={(item) => {
                            return (
                                <DichVuItem
                                    dataItem={item}
                                    navigation={navigation}
                                    fromSubDichVu= {false}
                                />
                            )
                        }}
                        numColumns={3}
                        keyExtractor={(item, index) => index.toString()}
                        style={{marginBottom: 100,backgroundColor:'#ffffff'}}
                    />
                    </View>
                    {this.state.isLoading?
                        <View style={{top:-10,bottom:-10,left:-10,right:-10, justifyContent: 'center', alignItems: 'center',position:'absolute',zIndex:1,backgroundColor: 'rgba(52, 52, 52, 0.3)'}}>
                            <ActivityIndicator size="large" color="green"/>
                        </View>:null
                    }
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
        getAdmin:bindActionCreators(getAdmin, dispatch),

    }
};

DichVu = connect(mapStateToProps, mapDispatchToProps)(DichVu);

export default DichVu
const styles = StyleSheet.create({
    iconTab: {
        height:24,
        width:24,
    }
})