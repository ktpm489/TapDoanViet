import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';

import * as Dimention from '../configs/Dimention'

export default class ChatItem extends Component {
    constructor(props) {
        super(props);
    }


    shouldComponentUpdate(nextProps, nextState) {
        if (JSON.stringify(nextProps.dataItem) === JSON.stringify(this.props.dataItem)) {
            return false;
        }

        else
            return true;
    }

    renderMsgForUser = () => {
        if (this.props.dataItem && this.props.myName && this.props.dataItem.sender
            && this.props.dataItem.sender.userName) {

            // console.log("1111",this.props.myName);
            // console.log("222",this.props.dataItem.sender.userName);
            if (this.props.myName === this.props.dataItem.sender.userName) {
                return (

                    <View style={{
                        flex: 1,
                        marginLeft: Dimention.DEVICE_WIDTH / 3,
                        // minHeight: 50,
                        justifyContent: 'flex-end',
                        marginTop: 10,


                    }}>
                        <View style={{
                            borderRadius: 10,
                            marginRight: 10,
                            borderWidth: 1,
                            backgroundColor: '#64B5F6',
                            borderColor: '#64B5F6',
                            alignSelf: 'flex-end',

                        }}>
                            <Text style={{
                                alignSelf: 'flex-end',
                                borderColor: '#FAFAFA',
                                justifyContent: 'flex-end',
                                paddingLeft: 10,
                                paddingRight: 10,
                                paddingTop: 10,
                                paddingBottom: 10,


                            }}>{this.props.dataItem.messageContent}</Text>
                        </View>
                        {/*<Text style={{*/}
                        {/*justifyContent: 'center',*/}
                        {/*alignSelf: 'flex-end',*/}
                        {/*marginRight: 10*/}
                        {/*}}>{this.props.dataItem.createdAt}</Text>*/}

                    </View>

                )
            } else {
                return (

                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>

                        <Image style={myStyle.image_circle}

                            source={this.props.dataItem.sender.avatar.length == 0 ? require("../images/logo.png") : {
                                uri: this.props.dataItem.sender.avatarUrl
                            }}
                            resizeMode="cover"
                        >
                        </Image>
                        <View>
                            <View style={{ marginRight: Dimention.DEVICE_WIDTH / 3 }}>
                                {this.props.fromGroupChat ?
                                    <Text style={{ marginLeft: 2 }}>{this.props.dataItem.sender.userName}</Text> : null
                                }
                                <View style={{
                                    borderRadius: 10,
                                    marginRight: 10,
                                    borderWidth: 1,
                                    backgroundColor: '#FAFAFA',
                                    borderColor: '#FAFAFA',
                                    alignSelf: 'flex-start',

                                }}>
                                    <Text style={{

                                        justifyContent: 'flex-start',
                                        alignSelf: 'flex-start',
                                        paddingLeft: 10,
                                        paddingRight: 10,
                                        paddingTop: 10,
                                        paddingBottom: 10
                                    }}>{this.props.dataItem.messageContent}</Text>
                                </View>

                            </View>
                            {/*<Text style={{flex: 1, justifyContent: 'flex-start'}}>{this.props.dataItem.createdAt}</Text>*/}
                        </View>

                    </View>

                )

            }
        }
        return null;
    };


    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.renderMsgForUser()}
            </View>
        )

    }


    componentDidMount() {
    }

    componentDidUpdate() {
    }

}
const
    myStyle = StyleSheet.create({
        image_circle: {
            height: Dimention.DEVICE_WIDTH / 8,
            width: Dimention.DEVICE_WIDTH / 8,
            borderRadius: Dimention.DEVICE_WIDTH / 16,
            marginLeft: 10,
            marginRight: 10,

        }
    })
