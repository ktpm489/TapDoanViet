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
import SubItemPhiDichVu from '../components/SubItemPhiDichVu'

export default class PhiDichVuItem extends Component {

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
        //console.log('this.props.dataItem',this.props.dataItem)
        const itemPhiDichVU = this.props.dataItem.item;
        itemPhiDichVU.total_cost = this.format_curency(itemPhiDichVU.total_cost) +"đ";
        console.log('item con',itemPhiDichVU.time)
        return (

            <TouchableOpacity
                
            >
                <View key={this.props.dataItem.index}
                      style={{flex: 1,
                          marginLeft:10,
                          marginRight:10,
                          marginTop:10,
                          marginBottom:10,
                          borderRadius:5,
                        //   backgroundColor:'red',
                          flexDirection: 'column'}}>

                    <Text style={{flex:1,color:'black',fontWeight:'bold'}}>{itemPhiDichVU.time}</Text>
                    
                        <View style={{flexDirection:'row',}}>
                            <Text style={{textAlign:'left',color:'red'}}>{itemPhiDichVU.status}</Text>
                            <Text style={{textAlign:'right',flex:1,alignSelf: 'flex-end',color:'red',fontWeight:'bold'}}>{itemPhiDichVU.total_cost}</Text>
                        </View>
                        <View
                            style={{
                                    
                                padding:10,
                                borderWidth:1,
                                borderRadius:5,
                                borderColor:'gray',
                                // shadowColor: 'gray',
                                // shadowOffset: { width: 0, height: 2 },
                                // shadowOpacity: 0.8,
                            
                            }}
                        >
                            <FlatList
                                    data={itemPhiDichVU.details}
                                    renderItem={(item) => {
                                        return (
                                            <SubItemPhiDichVu
                                                dataItem={item}
                                            
                                            />
                                        )
                                    }}
                                    keyExtractor={(item, index) => index.toString()}
                                    
                            />
                        </View>

                </View>

                <TouchableOpacity
                    style={{backgroundColor:'#FF9800',alignSelf:'center',padding:10,
                    borderRadius:5,
                    borderColor:'#FF9800',
                    shadowColor: '#FF9800',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                    
                }}

                onPress={()=>{
                    alert("Vui lòng thanh toán bằng tiền mặt")
                }}
                >
                    <Text>Thanh toán</Text>
                </TouchableOpacity>
                <View style={{height:1,backgroundColor:'gray',margin:10}}></View>

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