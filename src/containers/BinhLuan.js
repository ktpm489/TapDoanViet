import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    TextInput,
    TouchableOpacity,
    Image, AsyncStorage,
    KeyboardAvoidingView
} from 'react-native';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import CmtItem from "../components/status/CmtItem";
import {callApiCreateCmt} from "../actions/CreateCmtActions";


class BinhLuan extends Component {
    constructor(props){
        console.log('constructor')
        super(props)
        this.input_msg = '';
        const { params } = this.props.navigation.state
        console.log('tong cmt ', params.itemCmt)
        this.state = {
            dataCmt: params.itemCmt

        }
        AsyncStorage.getItem('token').then((token) => {
            this.token = token;
            // console.log("token", this.token)


            if (this.props.SocketRef.socket && this.props.SocketRef.socket.connected && this.props.SocketRef.isJoinChat && this.props.SocketRef.userSocket && this.props.SocketRef.userSocket.room) {
                // this.getOldMSG(this.props.SocketRef.userSocket.room, 1, 10);
                this.props.SocketRef.socket.on('comment', (dataCmt) => {
                    console.log("receiev msg", dataCmt);
                    let newCmt = this.state.dataCmt;
                    newCmt.push(dataCmt);
                    this.setState({dataCmt: newCmt});
                });



            } else {
                alert("socket not connect");
            }

        });

    }

    sendCmt = (postId) => {

        this.props.SocketRef.socket.emit("new_comment", postId);

    }
    Comment =() => {
        const { params } = this.props.navigation.state
        this.textInput.clear();
        let SendCMT = this.input_msg;
        // console.log('sendcmt', s)
        const { callApiCreateCmt } = this.props;
        callApiCreateCmt(params.idRoom, SendCMT).then(dataRes => {
           console.log('cmt', dataRes)
            this.sendCmt(params.idRoom)
        })
    }
    render (){
        return (

            <KeyboardAvoidingView style={{flex:1}} behavior="padding" keyboardVerticalOffset={64}>
            <View style = {{flex:1, backgroundColor:'#ffffff'}}>
                <FlatList
                    data={this.state.dataCmt}
                    renderItem={(item) => {
                        return (
                            <CmtItem
                                dataItem={item}
                            />
                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReachedThreshold={100}
                    showsVerticalScrollIndicator={false}
                    ref={ref => this.flatList = ref}
                    onContentSizeChange={() => {
                        // console.log("on size change");
                        this.flatList.scrollToEnd({animated: true})
                    }}
                    onLayout={() => {
                        // console.log("got to onlayout");
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
                            source={require('../images/camera.png')}
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
                        onPress={this.Comment}
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
                            source={require('../images/send.png')}
                        />
                    </TouchableOpacity>
                </View>


            </View>
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
        callApiCreateCmt: bindActionCreators(callApiCreateCmt, dispatch)
    }
};

BinhLuan = connect(mapStateToProps, mapDispatchToProps)(BinhLuan);
export default BinhLuan