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

export default class HoursItem extends Component {

    constructor(props) {
        super(props);

        
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('nextState',nextState.dataItem)
        console.log('props',this.props.dataItem)

        if (JSON.stringify(nextProps.dataItem.select) === JSON.stringify(this.props.dataItem.select)) {
            return false;
        }

        else
            return true;
    }
    render() {
        const {navigation} = this.props;
        const {item} = this.props.dataItem;
        console.log("datta_item",item);

        return (

            <View key={item.index}
                      style={{flex: 1,
                          marginLeft:10,
                          marginRight:10,
                          marginTop:10,
                          marginBottom:10,
                          width:Dimention.DEVICE_WIDTH/4-30,
                          height:Dimention.DEVICE_WIDTH/4-30,
                          borderRadius:5,
                          backgroundColor:this.props.select?'red':Const.COLOR_APP_GREEN,
                          flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.onHourSelect(item.position);
                        }}
                    >
                        <View style={{justifyContent:'center',alignContent:'center'}}>
                            <Text>{item.time}</Text>
                        </View>

                    </TouchableOpacity>
            
            </View>)
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