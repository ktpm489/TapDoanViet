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
        const {navigation,fromSubDichVu,fromCongDong} = this.props;
        const {item} = this.props.dataItem;
       
        return (

            <TouchableOpacity
                onPress={() => {
                    if(fromSubDichVu){
                        navigation.navigate('DichVuDetail', {dataItem: item});
                        
                    }else if(fromCongDong){
                        navigation.navigate('TrangChu', {dataItem: item});
                    }else
                        navigation.navigate('SubDichVu', {idItem: item.id,subtitle:item.name});
                }}
            >

            {fromSubDichVu?
                <View key={item.index}
                      style={{flex: 1,

                        borderRadius: 1,
                                // borderColor: '#FF9800',
                                // shadowColor: '#FF9800',
                                // shadowOffset: { width: 0, height: 2 },
                                // shadowOpacity: 0.8,
                        backgroundColor:'gray',
                          marginLeft:1,
                          marginRight:1,
                          marginTop:1,
                          marginBottom:1,
                          
                          width:Dimention.DEVICE_WIDTH/3-9,
                           height:Dimention.DEVICE_WIDTH/3,
                          flexDirection: 'column', justifyContent: 'flex-start',alignItems:'center' }}>
                    
                
                    <Image
                        
                    source={{uri:item.iconUrl}}
                    resizeMode="cover"
                    style={{width:'100%',height:'70%'}}
               />
               <View style ={{flex:1,justifyContent: 'center',alignItems:'center',marginLeft:5,marginRight:5}}>
                    <Text style={{textAlign:'center',alignSelf:'center',color:'#ffffff',fontWeight:'bold',}}>{fromSubDichVu? item.serviceName:item.name}</Text>
                </View>
                </View>
                :<View key={item.index}
                style={{flex: 1,
                 
                  width:Dimention.DEVICE_WIDTH/3-10,
                     height:Dimention.DEVICE_WIDTH/3-10,
                    flexDirection: 'column', justifyContent: 'flex-start',alignItems:'center' }}>
              
          
              <Image
                  
              source={{uri:item.iconUrl}}
              resizeMode="cover"
              style={{width:Dimention.DEVICE_WIDTH/5-10,height:Dimention.DEVICE_WIDTH/5-10}}
         />
              <Text style={{textAlign:'center',color:'black',fontWeight:'bold',marginLeft:5,marginRight:5}}>{fromSubDichVu? item.serviceName:item.name}</Text>
          </View>}

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