import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';

import * as Dimention from '../configs/Dimention'
import * as URL from '../Constants'
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

    updateStateSeen = (id_noti)=>{
        AsyncStorage.getItem('token').then((value)=> {
            
            fetch(URL.BASE_URL + URL.UPDATE_NOTI_SEEN+id_noti, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': value,
                },
                

            }).then((response) => {
                return response.json();
            }).then(data => {
                console.log('cap nhat trang thai da xem ', data);
                if(data && data.errorCode == 0){
                    
                }
               
            }).catch(e => {
                console.log('exception',e)
            })
        });
    }

    

   
    render() {
       
        const {item} = this.props.dataItem;
        const{reloadDataFromBack,navigation}=this.props;
        var convertTime =  moment(item.createdAt).format("DD-MM-YYYY HH:mm");

        return (

            <TouchableOpacity
                onPress={() => {
                    if(item.status && item.status === 1){
                        this.updateStateSeen(item.id);
                    }
                   navigation.navigate('ThongBaoDetail', {dataItem: item,reloadDataFromBack:reloadDataFromBack});
                }}
            >
                <View key={item.index}
                      style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',backgroundColor:item.status === 2?'white':'#b2ebf2'}}>
                    <Image style={myStyle.image_circle}
                        source={require('../../src/images/logo.png')}
                           resizeMode="cover"
                    >
                    </Image>
                    <View style={{flex: 4, flexDirection: 'column', marginLeft: 10, marginTop: 10, marginBottom: 10}}>
                    <Text style={{flex: 2,fontWeight:'600'}} numberOfLines={1}
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