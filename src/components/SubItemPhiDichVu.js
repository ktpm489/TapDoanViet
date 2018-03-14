import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList
} from 'react-native';

import * as Dimention from '../configs/Dimention'
import * as Const from '../Constants'

export default class SubItemPhiDichVu extends Component {

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

    format_curency = (a)=> {
        return a.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
         
        }
    render() {
        const {navigation} = this.props;
        const itemSubPhiDichVu = this.props.dataItem.item;
        itemSubPhiDichVu.value_chiphi = this.format_curency(itemSubPhiDichVu.value_chiphi)+"đ";
        return (

            
                <View key={this.props.dataItem.index}
                      style={{flex: 1,
                        marginLeft:10,
                        marginRight:10,
                        marginTop:10,
                        
                        
                          flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>

                    <Image
                          source={{
                              uri: 'https://cdn3.iconfinder.com/data/icons/currency-2/460/US-dollar-512.png'
                          }}
                         //source={itemSubPhiDichVu.icon}
                         resizeMode="cover"
                         style={{width:20,height:20}}
                    />
                    <Text style={{textAlign:'left',color:'black',marginLeft:10,}}>{itemSubPhiDichVu.name_chiphi}</Text>
                    <Text style={{textAlign:'right',flex:1,alignSelf: 'flex-end'}}>{itemSubPhiDichVu.value_chiphi}</Text>
                </View>

        )
    }
};
