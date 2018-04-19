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
                                borderColor: '#cac6c6',
                                shadowColor: '#cac6c6',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.8,
                        backgroundColor:'#ffffff',
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
               <View style ={{flex:1,justifyContent: 'center',alignItems:'center',marginLeft:2,marginRight:2}}>
                    <Text style={{textAlign:'center',fontSize:10, alignSelf:'center',color:'#000000',fontWeight:'bold',}}>{fromSubDichVu? item.serviceName.toUpperCase():item.name.toUpperCase()}</Text>
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
              <Text style={{textAlign:'center',fontSize:10,color:'#000000',fontWeight:'bold',marginLeft:2,marginRight:2}}>{fromSubDichVu? item.serviceName.toUpperCase():item.name.toUpperCase()}</Text>
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