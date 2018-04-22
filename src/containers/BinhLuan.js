import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    TextInput,
    TouchableOpacity,
    Image, AsyncStorage,
    KeyboardAvoidingView,
    Platform,
    BackHandler
} from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CmtItem from "../components/status/CmtItem";
import { callApiCreateCmt } from "../actions/CreateCmtActions";
import TextInputChat from '../components/TextInputChat'


class BinhLuan extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            title: 'Bình luận',
            headerStyle: { backgroundColor: '#23b34c' },
            headerTitleStyle: { color: 'white' },
            headerTintColor: 'white',

        }
    }
    constructor(props) {
        console.log('constructor')
        super(props)

        const { params } = this.props.navigation.state
        console.log('tong cmt ', params.itemCmt)
        this.state = {
            dataCmt: params.itemCmt

        }

        AsyncStorage.getItem('token').then((token) => {
            this.token = token;


            if (this.props.SocketRef.socket && this.props.SocketRef.socket.connected) {

                this.props.SocketRef.socket.on('comment', (newCmt) => {
                    console.log("receiev msg", newCmt);
                    this.setState({ dataCmt: newCmt });
                });



            } else {
                alert("socket not connect");
            }

        });

    }

    componentWillUnmount() {
        if (this.props.navigation.state.params.onReloadBack)
            this.props.navigation.state.params.onReloadBack();
    }



    sendCmt = (postId) => {

        this.props.SocketRef.socket.emit("new_comment", postId);

    }


    onReceiveTextInputClick = (text) => {
        if (text === "")
            return;
        const { params } = this.props.navigation.state
        let SendCMT = text;
        const { callApiCreateCmt } = this.props;
        callApiCreateCmt(params.idRoom, SendCMT).then(dataRes => {
            console.log('cmt', dataRes)
            this.sendCmt(params.idRoom)
        })
    }


    componentWillUnmount() {
        if (this.props.navigation.state.params.onReloadBack)
            this.props.navigation.state.params.onReloadBack();
    }

    render() {
        return (

            <KeyboardAvoidingView style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? "padding" : null}
                keyboardVerticalOffset={64}>
                <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
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
                            this.flatList.scrollToEnd({ animated: true })
                        }}
                        onLayout={() => {
                            // console.log("got to onlayout");
                            this.flatList.scrollToEnd({ animated: true })
                        }
                        }
                    />
                    <TextInputChat
                        onReceiveTextInputClick={this.onReceiveTextInputClick}
                    />


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