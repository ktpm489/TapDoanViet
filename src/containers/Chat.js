import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Image,
    KeyboardAvoidingView,
    Keyboard, AsyncStorage,
    Platform

} from 'react-native';


import * as URL from '../Constants';
import * as Dimention from '../configs/Dimention'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import ChatItem from '../components/ChatItem'
import { callApiDichVu } from "../actions/DichvuActions";
import { connectToSocket, disConnectToSocket, joinToChat } from "../actions/SocketActions";
import logout from '../components/TokenExpired'
import TextInputChat from '../components/TextInputChat'

class Chat extends Component {


    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            title: 'Chat',
            headerStyle: { backgroundColor: '#23b34c' },
            headerTitleStyle: { color: 'white' },
            headerTintColor: 'white',

        }
    }
    constructor(props) {
        super(props);
        this.dataUser2 = this.props.navigation.state.params.dataUser;
        console.log("user", this.dataUser2);
        // console.log("data pass", this.dataUser2);
        console.ignoredYellowBox = [
            'Setting a timer'
        ];

        this.state = {
            dataChat: []
        };


        console.log('scoket', this.props.SocketRef)

        AsyncStorage.getItem('token').then((token) => {
            this.token = token;
            // console.log("token", this.token)


            if (this.props.SocketRef.socket && this.props.SocketRef.socket.connected && this.props.SocketRef.isJoinChat && this.props.SocketRef.userSocket && this.props.SocketRef.userSocket.room) {
                this.getOldMSG(this.props.SocketRef.userSocket.room, 1, 10);
                this.props.SocketRef.socket.on('message', (dataMessage) => {
                    // console.log(" ohter msg", dataMessage);
                    if (dataMessage.sender.id === this.dataUser2.id && dataMessage.to.room === this.props.SocketRef.userSocket.room) {
                        let newMsg = this.state.dataChat;
                        newMsg.push(dataMessage);
                        this.setState({ dataChat: newMsg });
                        console.log("add ohter msg", dataMessage);
                    }
                });
                this.props.SocketRef.socket.on('owner_message', (dataMessage) => {
                    // console.log("dataMessage-owner",dataMessage);
                   
                    if (dataMessage.to.room !== this.dataUser2.id)
                        return;
                    console.log("add owner msg", dataMessage);
                    let newMsg2 = this.state.dataChat;
                    newMsg2.push(dataMessage);
                    this.setState({ dataChat: newMsg2 });
                });


            } else {
                Alert.alert("Có lỗi","Không thể kết nối server chat");
            }

        });

    }


    getOldMSG = (uid, page, pageSize) => {
        fetch(URL.BASE_URL + URL.PAHT_GET_CHAT + this.dataUser2._id + "?groupId=true" + '&page=' + page + '&pageSize=' + pageSize, {
            headers: {
                // 'Authorization': this.token,
                'x-access-token': this.token,
                'Content-Type': 'application/json'
            }
        }).then((data) => data.json()).then((data) => {
            if (data.errorCode && data.errorCode === "401") {
                logout(AsyncStorage, this.props)
                return;
            }

            let tempFilter = data.data.filter((item) => {
                return item.sender
            });
            console.log("filter", tempFilter);
            let newDataChat = this.state.dataChat.concat(tempFilter);
            this.setState({ dataChat: newDataChat });
            console.log("old message", data);
            console.log("new message", this.state.dataChat);
        }).catch((err) => {
            console.log("get old message erro", err);
        })
    }


    callApiUpdateReaded = (chatId) => {
        AsyncStorage.getItem('token').then((value) => {
            fetch(URL.BASE_URL + URL.UPDATE_READ + chatId, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': value,
                },


            }).then((response) => {
                return response.json();
            }).then(data => {
                this.props.navigation.state.params.onReloadBack();
                console.log('update read message: ', data);

                if (data.errorCode && data.errorCode === "401") {
                    logout(AsyncStorage, this.props)
                    return;
                }




            }).catch(e => {
                this.props.navigation.state.params.onReloadBack();
                console.log('exception', e)
            })
        });

    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;


    }

    componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }
    componentWillUnmount() {
        if (this.props.navigation.state.params.onReloadBack) {
            this.callApiUpdateReaded(this.dataUser2.id)

        }
    }

    _keyboardDidShow() {
        //console.log('Keyboard Shown');
    }

    _keyboardDidHide() {
        // console.log('Keyboard Hidden');
    }

    onReceiveTextInputClick = (text) => {
        if (text === "")
            return;


        var sendTo = {
            room: this.dataUser2._id,
            userName: this.dataUser2.userName

        };
        // console.log("room", this.props.SocketRef.userSocket.room);
        let dataSend = {
            sender: this.props.SocketRef.userSocket,
            to: sendTo,
            messageContent: text
        };

        console.log("send data", dataSend)
        this.props.SocketRef.socket.emit("send_message", dataSend);
    }

    render() {
        let userName;
        if (this.props.SocketRef && this.props.SocketRef.userSocket)
            userName = this.props.SocketRef.userSocket.userName;
        return (
            <KeyboardAvoidingView style={{ flex: 1 }}

                behavior={Platform.OS === 'ios' ? "padding" : null}
                keyboardVerticalOffset={64}
            >
                {/* <View style={{flex: 1}}> */}

                <FlatList
                    style={{ backgroundColor: "#E0E0E0", flex: 1 }}
                    data={this.state.dataChat}
                    extraData={this.state.dataChat}

                    renderItem={({ item }) => {
                        return (
                            <ChatItem
                                dataItem={item}
                                myName={userName ? userName : ""}
                            />
                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReachedThreshold={100}
                    showsVerticalScrollIndicator={false}
                    ref={ref => this.flatList = ref}
                    onContentSizeChange={() => {
                        console.log("on size change");
                        this.flatList.scrollToEnd({ animated: true })
                    }}
                    onLayout={() => {
                        console.log("got to onlayout");
                        this.flatList.scrollToEnd({ animated: true })
                    }
                    }


                />
                <TextInputChat
                    style={{marginTop:5}}
                    onReceiveTextInputClick={this.onReceiveTextInputClick}
                />
            </KeyboardAvoidingView>

        );
    }


}

const mapStateToProps = (state) => {
    return {
        SocketRef: state.SocketRef
    }
};
const mapDispatchToProps = (dispatch) => {

    return {
        // callApiDichVu: bindActionCreators(callApiDichVu, dispatch),
        // callConnectSocket: bindActionCreators(connectToSocket, dispatch),
        // callJoinToChat: bindActionCreators(joinToChat, dispatch),
        // listenDisconnectSocket: bindActionCreators(disConnectToSocket, dispatch)

    }
};
Chat = connect(mapStateToProps, mapDispatchToProps)(Chat)
export default Chat;



