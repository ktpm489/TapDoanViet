import React, {Component} from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Image,
    KeyboardAvoidingView,
    Keyboard, AsyncStorage
} from 'react-native';


import * as URL from '../Constants';
import * as Dimention from '../configs/Dimention'

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'

import ChatItem from '../components/ChatItem'
import {callApiDichVu} from "../actions/DichvuActions";
import {connectToSocket, disConnectToSocket, joinToChat} from "../actions/SocketActions";


class Chat extends Component {
    constructor(props) {
        super(props);
        this.dataUser2 = this.props.navigation.state.params.dataUser;
        // console.log("user",this.dataUser2);
        // console.log("data pass", this.dataUser2);
        console.ignoredYellowBox = [
            'Setting a timer'
        ];

        this.state = {
            dataChat: []
        };
        this.input_msg = '';

        console.log('scoket', this.props.SocketRef)

        AsyncStorage.getItem('token').then((token) => {
            this.token = token;
            // console.log("token", this.token)


            if (this.props.SocketRef.socket && this.props.SocketRef.socket.connected && this.props.SocketRef.isJoinChat && this.props.SocketRef.userSocket && this.props.SocketRef.userSocket.room) {
                this.getOldMSG(this.props.SocketRef.userSocket.room, 1, 10);
                this.props.SocketRef.socket.on('message', (dataMessage) => {
                    console.log("receiev msg", dataMessage);
                    let newMsg = this.state.dataChat;
                    newMsg.push(dataMessage);
                    this.setState({dataChat: newMsg});
                });
                this.props.SocketRef.socket.on('owner_message', (dataMessage) => {
                    console.log("receiev owner_message", dataMessage);
                    let newMsg2 = this.state.dataChat;
                    newMsg2.push(dataMessage);
                    this.setState({dataChat: newMsg2});
                });


            } else {
                alert("socket not connect");
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
            let tempFilter = data.data.filter((item) => {
                return item.sender
            });
            console.log("filter", tempFilter);
            let newDataChat = this.state.dataChat.concat(tempFilter);
            this.setState({dataChat: newDataChat});
            console.log("old message", data);
            console.log("new message", this.state.dataChat);
        }).catch((err) => {
            console.log("get old message erro", err);
        })
    }


    shouldComponentUpdate(nextProps, nextState) {
        return true;


    }

    componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    _keyboardDidShow() {
        //console.log('Keyboard Shown');
    }

    _keyboardDidHide() {
        // console.log('Keyboard Hidden');
    }


    sendMessage = () => {
        if (this.input_msg === "")
            return;
        this.textInput.clear();
        // console.log("msg:", this.input_msg);
        // console.log("user:", this.dataUser2._id);

        var sendTo = {
            room: this.dataUser2._id,
            userName: this.dataUser2.userName

        };
        // console.log("room", this.props.SocketRef.userSocket.room);
        let dataSend = {
            sender: this.props.SocketRef.userSocket,
            to: sendTo,
            messageContent: this.input_msg
        };

        console.log("send data",dataSend)
        this.props.SocketRef.socket.emit("send_message", dataSend);

    };

    render() {
        let userName;
        if (this.props.SocketRef && this.props.SocketRef.userSocket)
            userName = this.props.SocketRef.userSocket.userName;
        return (

            <View style={{flex: 1}}>
                <FlatList
                    style={{backgroundColor: "#E0E0E0", flex: 1}}
                    data={this.state.dataChat}
                    extraData={this.state.dataChat}

                    renderItem={({item}) => {
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
                        this.flatList.scrollToEnd({animated: true})
                    }}
                    onLayout={() => {
                        console.log("got to onlayout");
                        this.flatList.scrollToEnd({animated: true})
                    }
                    }


                />
                <View style={{
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    paddingBottom: 5,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <TouchableOpacity>
                        <Image
                            style={{
                                width: 40,
                                aspectRatio: 1,
                                paddingBottom: 10,
                                paddingLeft: 10,
                                paddingRight: 10,
                                paddingTop: 10,
                            }}
                            source={require('../../src/images/camera.png')}
                        />
                    </TouchableOpacity>
                    <TextInput
                        style={{flex: 1}}
                        placeholder={"Nhập vào đây..."}
                        onChangeText={
                            (text) => this.input_msg = text}
                        ref={input => {
                            this.textInput = input
                        }}


                    />
                    <TouchableOpacity
                        onPress={this.sendMessage}
                    >
                        <Image
                            style={{
                                width: 40,
                                paddingBottom: 10,
                                paddingLeft: 10,
                                paddingRight: 10,
                                paddingTop: 10,
                                aspectRatio: 1
                            }}
                            source={require('../../src/images/send.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>

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



