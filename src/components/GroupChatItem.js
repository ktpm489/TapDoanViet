import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    AsyncStorage,
    Alert
} from 'react-native';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as Dimention from '../configs/Dimention'
import * as URL from '../Constants'
import logout from './TokenExpired'
 class GroupChatItem extends Component {

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
        console.log("url",URL.BASE_URL + URL.UPDATE_READ+chatId+"?isGroup=true");
        AsyncStorage.getItem('token').then((value)=> {
            fetch(URL.BASE_URL + URL.UPDATE_READ+chatId+"?isGroup=true", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': value,
                },
                

            }).then((response) => {
                
                return response.json();
            }).then(data => {
                if(data.errorCode && data.errorCode === "401"){
                    logout(AsyncStorage,this.props)
                    return;
                }
                console.log('update read message: ', data);
                
            }).catch(e => {
                console.log('exception',e)
            })
        });
       
    }

    AddMember = (item) => {
        if(this.props.userInfo && this.props.userInfo.id){
            AsyncStorage.getItem("token").then(value => {

                this.props.onLoading(true)
                fetch(URL.BASE_URL + URL.ADD_MEMBER +item._id , {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": value
                    },
                    body: JSON.stringify({
                        memberIds: [this.props.userInfo.id]
    
    
                    })
                }).then(response => {
                    return response.json()
                }).then(data => {
                    console.log('add member', data)
                    this.props.onLoading(false)
    
                    if(data.errorCode && data.errorCode === "401"){
                        logout(AsyncStorage,this.props)
                        return;
                    }

                    if(data && data.errorCode === 0){
                        if (this.props.SocketRef.socket && this.props.SocketRef.socket.connected){
                            this.props.SocketRef.socket.emit("join_group", data);
                        }
                        this.props.navigation.navigate('ChatGroup', {groupname: item.groupName, IdGroup: item._id,onReloadBack:this.props.onReloadBack});

                    }else{
                        Alert.alert("Có lỗi sảy ra",data.message)
                    }
                    
    
                }).catch(e => {
                    console.log("exception", e);
                    this.props.onLoading(false)
                    Alert.alert("Lỗi kết nối","Vui lòng thử lại sau !")
                });
            });

        }else{
            Alert.alert("Thông báo","Có lỗi sảy ra, vui lòng thử lại sau !")
        }
        
    }

    render() {
        const {navigation} = this.props;
        const {item,index} = this.props.dataItem;
        console.log("item groups----",item)

       
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
                    }else{
                        this.AddMember(item);
                    }
                       
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



const mapStateToProps = (state) => {
    return {
        
         SocketRef: state.SocketRef
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        
    };
}

GroupChatItem = connect(mapStateToProps, mapDispatchToProps)(GroupChatItem);

export default GroupChatItem
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