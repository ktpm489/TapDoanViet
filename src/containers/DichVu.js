import React, { Component } from 'react';
import {
    View,
    Text,
    AsyncStorage,
    TouchableOpacity,
    FlatList, ScrollView,
    ActivityIndicator,
    Image,
    StyleSheet,
    NetInfo,
    Platform

} from 'react-native';
// import Video from 'react-native-video'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { callApiDichVu } from "../actions/DichvuActions";
import { connectToSocket, disConnectToSocket, joinToChat } from '../actions/SocketActions';
import { callApiProfile } from "../actions/ProfileActions";
import { getAdmin } from "../actions/GetAdminActions";
import SocketIOClient from 'socket.io-client';
import * as URL from '../Constants'
import Icon from 'react-native-vector-icons/dist/Entypo'
import DichVuItem from '../components/DichVuItem'
import SlideImage from '../components/SlideImage';
import logout from '../components/TokenExpired'
import FCM, {
    FCMEvent,
    RemoteNotificationResult,
    WillPresentNotificationResult,
    NotificationType
} from 'react-native-fcm';
import DeviceInfo from 'react-native-device-info';


class DichVu extends Component {
    static navigationOptions = ({ navigation }) => {
        const { state } = navigation;
        return {
            headerLeft: <TouchableOpacity onPress={() => {
                navigation.navigate('DrawerOpen')
            }}>
                <Icon name="menu" size={30} style={{ marginLeft: 7 }} color="white" />
            </TouchableOpacity>,
            tabBarIcon: () => (
                <Image
                    source={require('../images/dichvu1.png')}
                    style={styles.iconTab}
                />
            ),
            headerStyle: { backgroundColor: '#23b34c' },
            headerTitleStyle: { color: 'white' },
            title: 'Dịch vụ'

        }

    }

    constructor(props) {
        super(props);
        this.os = '';
        this.state = {

            listDichVu: [],
            imageSlider: [],
            isLoading: false,
            isNetWork: true

        };



        console.ignoredYellowBox = [
            'Setting a timer'
        ];

        this.token = AsyncStorage.getItem('token').then((data) => {
            console.log("token", data);

            this.socket = SocketIOClient(URL.BASE_URL, { query: 'token=' + data });
            const { callConnectSocket, callJoinToChat, listenDisconnectSocket } = this.props;
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
        const { callApiDichVu } = this.props;
        this.setState({ isLoading: true })
        callApiDichVu().then(data => {

            console.log("aaa", data);
            this.setState({ imageSlider: data.data, isLoading: false });
            console.log("state11111", this.state);
        });
        const { callApiProfile, getAdmin } = this.props;

        getAdmin();

        callApiProfile().then(dataRes => {
            console.log('data response profile', dataRes);
        })

    }

    getListDichVu = () => {
        AsyncStorage.getItem('token').then((value) => {
            this.setState({ isLoading: true })
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
                if (data && data.errorCode == 0) {
                    this.setState({ listDichVu: data.data, isLoading: false })
                } else if (data.errorCode && data.errorCode === "401") {
                    logout(AsyncStorage, this.props)
                    return;
                }

            }).catch(e => {
                console.log('exception', e)
                this.setState({
                    isLoading: false
                })
                Alert.alert("Có lỗi", "Vui lòng thử lại sau");
            })
        });
    }

    componentWillUnmount() {


    }
    pushDeviceToken = (token_APP, device_token) => {
        
        console.log("1234",Platform.OS ==="android"?DeviceInfo.getBrand(): "Iphone");
        
        fetch(URL.BASE_URL + URL.PATH_FIREBASE_TOKEN, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token_APP,
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                token: device_token,
                os: Platform.OS,
                version: Platform.Version,
                deviceName:  Platform.OS ==="android"?DeviceInfo.getBrand(): "Iphone"
            })
        }).then(data => data.json()).then(data => {
            if(data.errorCode && data.errorCode === "401"){
                logout(AsyncStorage,this.props)
            }
            console.log("data push device token", data)

        }).catch(err => {
            console.log("call api token firebase erro: " + err);
        })
    }
    componentDidMount() {
        // iOS: show permission prompt for the first call. later just check permission in user settings
        // Android: check permission in user settings
        FCM.requestPermissions().then(() => console.log('granted')).catch(() => console.log('notification permission rejected'));

        FCM.getFCMToken().then(token => {
            
            console.log("firebase_token",token);
            AsyncStorage.getItem("token").then(token_APP => {
                if(token_APP && token_APP !== null){
                    console.log("push token call");
                this.pushDeviceToken(token_APP, token);
                }
            })
            // store fcm token in your server
        });

        this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {

            console.log("receive noti listent", notif);
            // optional, do some component related stuff
            if (notif && notif.opened_from_tray && notif.opened_from_tray === 1) {
                
                return ;
            }
            if(Platform.OS === 'ios' && notif._notificationType === "remote_notification"){
                let data = notif.aps.alert;
                console.log('ios-noti',data);
                FCM.presentLocalNotification({
                    vibrate: 500,
                    title: data.title,
                    body: data.body,
                    priority: "high",
                    sound: "default",
                    icon: "logo.png",
                    wake_screen: true,
                    show_in_foreground: true,
                    // click_action: notif.fcm.action,

                });
            }else if(Platform.OS === 'android'){
                FCM.presentLocalNotification({
                    vibrate: 500,
                    title: notif.fcm.title,
                    body: notif.fcm.body,
                    priority: "high",
                    sound: "default",
                    icon: "ic_launcher",
                    wake_screen: true,
                    show_in_foreground: true,
                    // click_action: notif.fcm.action,

                });
            }
            


        });

        // initial notification contains the notification that launchs the app. If user launchs app by clicking banner, the banner notification info will be here rather than through FCM.on event
        // sometimes Android kills activity when app goes to background, and when resume it broadcasts notification before JS is run. You can use FCM.getInitialNotification() to capture those missed events.
        // initial notification will be triggered all the time even when open app by icon so send some action identifier when you send notification
        FCM.getInitialNotification().then(notif => {
            //console.log("click noti:", notif)
        });
    }


    render() {
        const { navigation } = this.props;

        return (
            <View>
                {/* <View>
                   <Video 
                    source={require('../images/video_logo_app.mp4')}
                   />

            </View> */}


                <ScrollView
                    showsHorizontalScrollIndicator={true}
                    showVerticalScrollIndicator={true}
                    style={{ backgroundColor: '#ffffff' }}
                >

                    <SlideImage
                        imageSlider={this.state.imageSlider}

                    />
                    <View style={{ flex: 1, height: 1, backgroundColor: 'gray' }} />
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, backgroundColor: '#ffffff' }}>
                        < FlatList
                            showsHorizontalScrollIndicator={false}
                            showVerticalScrollIndicator={false}
                            data={this.state.listDichVu}
                            renderItem={(item) => {
                                return (
                                    <DichVuItem
                                        dataItem={item}
                                        navigation={navigation}
                                        fromSubDichVu={false}
                                    />
                                )
                            }}
                            numColumns={3}
                            keyExtractor={(item, index) => index.toString()}
                            style={{ marginBottom: 100, backgroundColor: '#ffffff' }}
                        />
                    </View>
                    {this.state.isLoading ?
                        <View style={{ top: -10, bottom: -10, left: -10, right: -10, justifyContent: 'center', alignItems: 'center', position: 'absolute', zIndex: 1, backgroundColor: 'rgba(52, 52, 52, 0.3)' }}>
                            <ActivityIndicator size="large" color="green" />
                        </View> : null
                    }

                </ScrollView>
            </View>

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
        callApiProfile: bindActionCreators(callApiProfile, dispatch),
        getAdmin: bindActionCreators(getAdmin, dispatch),

    }
};

DichVu = connect(mapStateToProps, mapDispatchToProps)(DichVu);

export default DichVu
const styles = StyleSheet.create({
    iconTab: {
        height: 24,
        width: 24,
    }
})