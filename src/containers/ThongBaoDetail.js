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
export default class ThongBaoDetail extends Component {

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
        const item = this.props.navigation.state.params.dataItem;
        var convertTime =  moment(item.createdAt).format("DD-MM-YYYY HH:MM");
        return (

        
                <View 
                      style={{flex: 1, flexDirection: 'column',margin:10 , alignItems: 'center'}}>
                    <Image style={myStyle.image_circle}
                        source={require('../../src/images/logo.png')}
                           resizeMode="cover"
                    >
                    </Image>
                   
                    <Text style={{fontWeight: '600',fontSize:16}} >{item.title}</Text>
                        <Text>{item.content}</Text>
                        <Text>{convertTime}</Text>
                   
                </View>)
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