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

export default class ItemServiceHistory extends Component {

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
        const item = this.props.dataItem;
        console.log("key:",item.key);
        var arrImages = [];
        if(item.images !== ""){
            arrImages = item.images.split(",");
        }

       var imgRender = [];
        for(var i = 0; i < arrImages.length;i++){
            imgRender.push(<TouchableOpacity

                key={i}
                style={{
                    marginLeft:10,
                    borderColor:'grey',borderRadius:4,borderWidth:2,
                }}
            
                onPress={()=>alert(1)}
            >
                <Image
                source={{uri:arrImages[i]}}
                ref="image1"
                style={{ width: (Dimention.DEVICE_WIDTH-100)/3, height: (Dimention.DEVICE_WIDTH-100)/3,  }}

                />
            </TouchableOpacity>)
        }
        

       
        return (

            <TouchableOpacity
                    key={item.index}
                onPress={() => {
                    //navigation.navigate('DichVuDetail', {dataItem: item});
                }}
            >
                <View 
                   
                      >
                    <Text>Họ tên: {item.fullName}</Text>
                    <Text>Số điện thoại: {item.phoneNumber}</Text>
                    <Text>Address: {item.address}</Text>
                    <Text>Đặt lịch: {item.orderAt}</Text>
                    <Text>Yêu cầu lúc: {item.createdAt}</Text>
                    <Text>Dịch vụ đăng ký: {item.service.serviceName}</Text>

                    <View style={{marginTop:10,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                               {imgRender}
                    </View>

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