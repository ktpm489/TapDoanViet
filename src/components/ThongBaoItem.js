import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';

import * as Dimention from '../configs/Dimention'
import moment from 'moment';
export default class ThongBaoItem extends Component {

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
        var convertTime =  moment(item.createdAt).format("DD-MM-YYYY HH:MM");

        return (

            <TouchableOpacity
                onPress={() => {
                   navigation.navigate('ThongBaoDetail', {dataItem: item});
                }}
            >
                <View key={item.index}
                      style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',backgroundColor:item.isSeen?'white':'#b2ebf2'}}>
                    <Image style={myStyle.image_circle}
                        source={require('../../src/images/logo.png')}
                           resizeMode="cover"
                    >
                    </Image>
                    <View style={{flex: 4, flexDirection: 'column', marginLeft: 10, marginTop: 10, marginBottom: 10}}>
                    <Text style={{flex: 2}} numberOfLines={1}
                                  ellipsizeMode={'tail'}>{item.title}</Text>
                        <Text style={{flex: 1}} numberOfLines={1} ellipsizeMode={'tail'}>{item.content}</Text>
                        <Text style={{flex: 1}} numberOfLines={1} ellipsizeMode={'tail'}>{convertTime}</Text>
                    </View>
                </View>

            </TouchableOpacity>)
    }
};
const myStyle = StyleSheet.create({
    image_circle: {
        height: Dimention.DEVICE_WIDTH / 6,
        width: Dimention.DEVICE_WIDTH / 6,
        borderRadius: 0,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        marginTop: 10

    }
})