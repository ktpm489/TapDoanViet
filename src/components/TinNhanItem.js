import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';

import * as Dimention from '../configs/Dimention'

export default class TinNhanItem extends Component {

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
    render() {
        const {navigation} = this.props;
        const {item,index} = this.props.dataItem;
        // console.log("item",item)
       
        const{fromSearch} = this.props;
        const{fromDachSach} = this.props;
        
        return (

            <TouchableOpacity
                onPress={() => {
                    if(fromDachSach)
                        return;
                    if(fromSearch){
                        
                        this.props.sendDataClick(item,index);
                    }else
                        navigation.navigate('Chat', {dataUser: item});
                }}
            >
                <View key={index}
                      style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                    <Image style={myStyle.image_circle}
                        
                        //    source={!item.avatar || item.avatar.length == 0?require("../images/logo.png"):{
                        //        uri:item.avatarUrl
                        //    }}
                        source={!item.avatarUrl || item.avatarUrl.length == 0?require("../images/logo.png"):{
                                   uri:item.avatarUrl
                               }}
                          
                           resizeMode="cover"
                    >
                    </Image>
                    <View style={{flex: 4, flexDirection: 'column', marginLeft: 10, marginTop: 10, marginBottom: 10}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <Text style={{flex: 2}} numberOfLines={1}
                                  ellipsizeMode={'tail'}>{item.firstName + " " + item.lastName}</Text>
                            <Text style={{flex: 1}}>{item.lastTime}</Text>
                        </View>
                        <Text style={{flex: 1}} numberOfLines={1} ellipsizeMode={'tail'}>{item.email}</Text>
                    </View>
                </View>

            </TouchableOpacity>)
    }
};
const myStyle = StyleSheet.create({
    image_circle: {
        height: Dimention.DEVICE_WIDTH / 6,
        width: Dimention.DEVICE_WIDTH / 6,
        borderRadius: Dimention.DEVICE_WIDTH / 12,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        marginTop: 10

    }
})