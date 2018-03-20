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
        
            return true;
    }
    componentWillReceiveProps(){
        
    }
    
    render() {
       
    
        const item = this.props.dataItem;
        
        return (
            <TouchableOpacity
                        onPress={() => {
                            this.props.onHourSelect(item.position);
                        }}
                    >
                    <View 
                            style={{
                                marginLeft:10,
                                marginRight:10,
                                marginTop:10,
                                marginBottom:10,
                                width:Dimention.DEVICE_WIDTH/3-40,
                                height:Dimention.DEVICE_WIDTH/3-40,
                                borderRadius:5,
                                backgroundColor:item.select?'red':Const.COLOR_APP_GREEN,
                                flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                            
                                <View style={{justifyContent:'center',alignContent:'center'}}>
                                    <Text>{item.time}</Text>
                                </View>

                        
                    
                    </View>
            </TouchableOpacity>
            )
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