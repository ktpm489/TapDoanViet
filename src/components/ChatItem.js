import React, {Component} from 'react';
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
                        marginTop: 10
                    }}>

                        <Text style={{
                            borderRadius: 10,
                            alignSelf: 'flex-end',
                            backgroundColor: '#64B5F6',
                            justifyContent: 'flex-end',
                            paddingLeft: 10,
                            paddingRight: 10,
                            paddingTop: 10,
                            paddingBottom: 10,
                            marginRight: 10
                        }}>{this.props.dataItem.messageContent}</Text>
                        {/*<Text style={{*/}
                            {/*justifyContent: 'center',*/}
                            {/*alignSelf: 'flex-end',*/}
                            {/*marginRight: 10*/}
                        {/*}}>{this.props.dataItem.createdAt}</Text>*/}

                    </View>

                )
            } else {
                return (

                    <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>

                        <Image style={myStyle.image_circle}

                               source={{
                                   uri: 'https://znews-photo-td.zadn.vn/w820/Uploaded/kcwvouvs/2017_04_18/15624155_1264609093595675_8005514290339512320_n.jpg'
                               }}
                               resizeMode="cover"
                        >
                        </Image>
                        <View>
                            <View style={{marginRight: Dimention.DEVICE_WIDTH / 3}}>
                                <Text style={{
                                    borderRadius: 10,
                                    backgroundColor: '#FAFAFA',
                                    justifyContent: 'flex-start',
                                    alignSelf: 'flex-start',
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    paddingTop: 10,
                                    paddingBottom: 10
                                }}>{this.props.dataItem.messageContent}</Text>

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
            <View style={{flex: 1}}>
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
