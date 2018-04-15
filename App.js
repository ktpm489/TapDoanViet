/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    AsyncStorage,
    TouchableOpacity,
    Platform
} from 'react-native';
import {Provider} from 'react-redux'
import DeviceInfo from 'react-native-device-info';
import store from './src/store'
import RootStack from './src/routers/Navigation'
import FCM, {
    FCMEvent,
    RemoteNotificationResult,
    WillPresentNotificationResult,
    NotificationType
} from 'react-native-fcm';

import PhiDichVu from './src/containers/PhiDichVu'
import DichVu from './src/containers/DichVu'
import DichVuDetail from './src/containers/DichVuDetail'
import * as Consts from './src/Constants';
import {Tab} from './src/routers/Navigation'
import ThongTinCaNhan from "./src/containers/ThongTinCaNhan";
import logout from './src/components/TokenExpired'

export default class App extends Component<{}> {

    constructor(props) {
        super(props);
        this.os = '';

    }

    render() {
        return (


            <Provider store={store}>
                <RootStack/>
            </Provider>

        );
    }


    pushDeviceToken = (token_APP, device_token) => {
        console.log("os", Platform);
        // console.log("version",  DeviceInfo);

        fetch(Consts.BASE_URL + Consts.PATH_FIREBASE_TOKEN, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token_APP,
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                token: device_token,
                os: Platform.OS,
                version: Platform.Version,
                deviceName:  DeviceInfo.getBrand()
            })
        }).then(data => data.json()).then(data => {
            if(data.errorCode && data.errorCode === "401"){
                logout(AsyncStorage,this.props)
            }
            console.log("data push device token", data)
            var temp =JSON.stringify({
                token: device_token,
                os: Platform.OS,
                version: Platform.Version,
                deviceName:  DeviceInfo.getBrand()
            });
            console.log("josn firebse push",temp);

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
            AsyncStorage.setItem('token_firebase', token);
            AsyncStorage.getItem("token").then(token_APP => {

                this.pushDeviceToken(token_APP, token);
            })
            // store fcm token in your server
        });

        this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {

            console.log("receive noti listent", notif);
            // optional, do some component related stuff
            if (notif && notif.opened_from_tray && notif.opened_from_tray === 1) {
                
                return;
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

}

