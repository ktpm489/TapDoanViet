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
import moment from 'moment';
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
        var orderAt = moment(item.orderAt).format("DD-MM-YYYY HH:MM");
        var createdAt = moment(item.createdAt).format("DD-MM-YYYY HH:MM");


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
            
               // onPress={()=>alert(1)}
            >
                <Image
                source={{uri:arrImages[i]}}
                ref="image1"
                style={{ width: (Dimention.DEVICE_WIDTH-100)/3, height: (Dimention.DEVICE_WIDTH-100)/3,  }}

                />
            </TouchableOpacity>)
        }
        console.log("img",arrImages);
        

       
        return (

            <TouchableOpacity
                    key={item.index}
                onPress={() => {
                    //navigation.navigate('DichVuDetail', {dataItem: item});
                }}
            >
                <View 
                   
                      >
                    <Text >
                        <Text style={{fontWeight: "bold"}}>Họ tên: </Text>
                        <Text>{item.fullName}</Text>
                    </Text>
                    <Text>
                        <Text style={{fontWeight: "bold"}}>Số điện thoại: </Text>
                        <Text>{item.phoneNumber}</Text>
                    </Text>
                    <Text>
                        <Text style={{fontWeight: "bold"}}>Địa chỉ: </Text>
                        <Text>{item.address}</Text>
                    </Text>
                    <Text>
                        <Text style={{fontWeight: "bold"}}>Đặt lịch: </Text>
                        <Text>{orderAt}</Text>
                    </Text>
                    <Text>
                        <Text style={{fontWeight: "bold"}}>Yêu cầu lúc: </Text>
                        <Text>{createdAt}</Text>
                    </Text>
                    <Text>
                        <Text style={{fontWeight: "bold"}}>Dịch vụ đăng ký: </Text>
                        <Text>{item.service.serviceName}</Text>
                    </Text>

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