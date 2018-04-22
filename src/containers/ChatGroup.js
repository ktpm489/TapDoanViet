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
    Alert
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

class ChatGroup extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            // headerRight: <TouchableOpacity style = {{marginRight:10}}
            //                                onPress={() => params.actionMore()}>
            //     <Image style = {{width:30,height:30}}
            //            source={require('../images/more.png')}
            //     />
            // </TouchableOpacity>,
            title: params.title,
            headerStyle: { backgroundColor: '#23b34c' },
            headerTitleStyle: { color: 'white' },
            headerTintColor: 'white',
        }
    }
    constructor(props) {
        super(props);
        this.groupname = this.props.navigation.state.params.groupname;
        this.IdGroup = this.props.navigation.state.params.IdGroup;
        this.props.navigation.setParams({ title: this.groupname })
        
        console.ignoredYellowBox = [
            'Setting a timer'
        ];

        this.state = {
            dataChat: []
        };
        

        AsyncStorage.getItem('token').then((token) => {
            this.token = token;
            // console.log("token", this.token)


            if (this.props.SocketRef.socket && this.props.SocketRef.socket.connected && this.props.SocketRef.isJoinChat && this.props.SocketRef.userSocket && this.props.SocketRef.userSocket.room) {
                this.getOldMSG(this.props.SocketRef.userSocket.room, 1, 10);
                this.props.SocketRef.socket.on('message', (dataMessage) => {

                    if (dataMessage.sender.id === this.props.SocketRef.userSocket.id || dataMessage.to.room !== this.IdGroup)
                        return;

                    console.log("receiev msg", dataMessage);
                    let newMsg = this.state.dataChat;
                    newMsg.push(dataMessage);
                    this.setState({ dataChat: newMsg });
                });
                this.props.SocketRef.socket.on('owner_message', (dataMessage) => {

                    if (dataMessage.to.room !== this.IdGroup)
                        return;
                    console.log("receiev owner_message", dataMessage);

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
        const { params } = this.props.navigation.state
        console.log('params', params)
        fetch(URL.BASE_URL + URL.PAHT_GET_CHAT + params.IdGroup + "?isGroup=true" + '&page=' + page + '&pageSize=' + pageSize, {
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
        console.log("group id", chatId);
        console.log("url", URL.BASE_URL + URL.UPDATE_READ + chatId + "?isGroup=true");
        AsyncStorage.getItem('token').then((value) => {
            fetch(URL.BASE_URL + URL.UPDATE_READ + chatId + "?isGroup=true", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': value,
                },


            }).then((response) => {

                return response.json();
            }).then(data => {
                this.props.navigation.state.params.onReloadBack();
                if (data.errorCode && data.errorCode === "401") {
                    logout(AsyncStorage, this.props)
                    return;
                }
                console.log('update read message: ', data);

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
        this.callApiUpdateReaded(this.IdGroup)

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
            room: this.IdGroup,
            userName: this.groupname,
            isGroup: true

        };
        
        let dataSend = {
            sender: this.props.SocketRef.userSocket,
            to: sendTo,
            messageContent: text
        };
        this.props.SocketRef.socket.emit("send_message", dataSend);
    }

    render() {
        let userName;
        if (this.props.SocketRef && this.props.SocketRef.userSocket)
            userName = this.props.SocketRef.userSocket.userName;
        return (

            <View style={{ flex: 1 }}>
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
ChatGroup = connect(mapStateToProps, mapDispatchToProps)(ChatGroup)
export default ChatGroup;



