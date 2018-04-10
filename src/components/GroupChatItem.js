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
export default class GroupChatItem extends Component {

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

    callApiUpdateReaded = (chatId)=>{
        console.log("group id",chatId);
        AsyncStorage.getItem('token').then((value)=> {
            fetch(URL.BASE_URL + URL.UPDATE_READ+chatId, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': value,
                },
                

            }).then((response) => {
                
                return response.json();
            }).then(data => {
                console.log('update read message: ', data);
                


               
            }).catch(e => {
                console.log('exception',e)
            })
        });
       
    }

    render() {
        const {navigation} = this.props;
        const {item,index} = this.props.dataItem;
        console.log("item groups",item)

       
        const{fromDachSach,fromSearch,fromTinNhan} = this.props;

        return (

            <TouchableOpacity
                onPress={() => {

                    if(fromTinNhan && item.messUnread&&item.messUnread>0 ){
                       
                        this.callApiUpdateReaded(item._id)
                     }
                    if(fromDachSach)
                        return;
                    if(fromSearch){

                        this.props.sendDataClick(item,index);
                    }else
                        navigation.navigate('ChatGroup', {groupname: item.groupName, IdGroup: item._id,onReloadBack:this.props.onReloadBack});
                }}
            >
                <View key={index}
                      style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                    <Image style={myStyle.image_circle}

                        //    source={!item.avatar || item.avatar.length == 0?require("../images/logo.png"):{
                        //        uri:item.avatarUrl
                        //    }}
                           source={!item.avatar || item.avatar.length == 0?require("../images/logo.png"):{
                               uri:item.avatarUrl
                           }}

                           resizeMode="cover"
                    >
                    </Image>
                    {item.messUnread&&item.messUnread>0 ? 
                    <View style={{top:10,left:Dimention.DEVICE_WIDTH / 6-10, width:20,height:20,borderRadius:10,backgroundColor:'red',position:'absolute',zIndex:1,justifyContent:'center',alignItems:'center'}}>
                               <Text style = {{textAlign:'center',color:'white',fontSize:10}}>{item.messUnread>20?"20+":item.messUnread}</Text>
                    </View>:null}
                    <View style={{flex: 4, flexDirection: 'column', marginLeft: 10, marginTop: 10, marginBottom: 10}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <Text style={{flex: 2, fontWeight:'600'}} numberOfLines={1}
                                  ellipsizeMode={'tail'}>Nhóm: {item.groupName}</Text>
                            {/*<Text style={{flex: 1}}>{item.createdAt}</Text>*/}
                        </View>
                        <Text style={{flex: 1}} numberOfLines={1} ellipsizeMode={'tail'}>{item.members.length} thành viên</Text>
                    </View>
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
        marginTop: 10,
        borderColor:'white',
        borderWidth:1,

    }
})