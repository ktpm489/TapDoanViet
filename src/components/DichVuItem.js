import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';

import * as Dimention from '../configs/Dimention'
import * as Const from '../Constants'

export default class DichVuItem extends Component {

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
        const {item} = this.props.dataItem;
       
        return (

            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('DichVuDetail', {dataItem: item});
                }}
            >
                <View key={item.index}
                      style={{flex: 1,
                          marginLeft:10,
                          marginRight:10,
                          marginTop:10,
                          marginBottom:10,
                          width:Dimention.DEVICE_WIDTH/3-30,
                          height:Dimention.DEVICE_WIDTH/3-30,
                          borderRadius:5,
                          backgroundColor:Const.COLOR_APP_GREEN,
                          flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Image
                        
                         source={{uri:item.iconUrl}}
                         resizeMode="cover"
                         style={{width:50,height:50}}
                    />
                    <Text style={{textAlign:'center',color:'white',fontWeight:'bold'}}>{item.serviceName}</Text>
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