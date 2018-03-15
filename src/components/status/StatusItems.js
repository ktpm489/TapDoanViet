import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,

} from 'react-native'
import Dimensions from 'Dimensions';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/EvilIcons';
class StatusItems extends Component {
    render (){
        const {item} = this.props.dataItem;
        const {navigation} = this.props;
        // console.log('item', item.comments.length)
        return (
            <View>
                <View>
                    <View style  = {{flexDirection:'row', marginTop: 15}}>
                        <Image source={require('../../images/chieu-cao-va-tieu-su-cua-phuong-ly-12-e1482887471940.jpg')}
                               style = {styles.image_circle}
                               resizeMode="cover"
                        >
                        </Image>
                        <View style = {{marginLeft: 10}}>
                            <Text style = {{color: 'black', fontWeight:'bold'}}>{item.createdBy.userName}</Text>
                            <Text>{moment(item.createdAt).startOf("hour").fromNow()}</Text>
                        </View>
                    </View>
                    <View style = {{marginHorizontal: 10, marginTop:10}}>
                        <Text style = {{color: '#212121'}}>{item.content}</Text>
                    </View>
                    <View style = {{flexDirection:'row', marginTop:20, justifyContent:'space-between'}}>
                        <View style = {{flexDirection:'row', marginLeft:10}}>
                            <Icon1 name="like" size={25} color="#424242" />
                            <Text>1</Text>
                        </View>
                        <View style = {{flexDirection:'row', marginRight:10}}>
                            {/*<Icon1 name="comment" size={25} color="#424242" />*/}
                            <Text> {item.comments.length} bình luận</Text>
                        </View>

                    </View>
                    <View style={{height: 1, backgroundColor: '#cccccc', marginTop: 5}}/>
                    <View style ={{flexDirection:'row', marginTop:5, justifyContent:'space-between'}}>
                        <View style = {{flexDirection:'row', marginLeft:20 }}>
                            <Icon1 name="like" size={25} color="#424242" />
                            <TouchableOpacity>
                                <Text style = {{color : '#424242'}}>Thích</Text>
                            </TouchableOpacity>
                        </View>
                        <View style = {{flexDirection:'row', marginRight:20}}>
                            <Icon1 name="comment" size={25} color="#424242" />
                            <TouchableOpacity onPress = {() => navigation.navigate('BinhLuan', {itemCmt: item.comments, idRoom: item.id})}>
                                <Text style = {{color: '#424242'}}>Bình luận</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{flexDirection: 'row', marginTop: 5, marginRight: 15, alignItems:'center'}}>
                        <Image
                            source={require('../../images/chieu-cao-va-tieu-su-cua-phuong-ly-12-e1482887471940.jpg')}
                            style={styles.image_circle}
                            resizeMode="cover">
                        </Image>
                        <TouchableOpacity
                            // onPress={() => {
                            // this.BinhLuan(item.PostID)}}
                                          style={{
                                              marginLeft: 10, flex: 1,
                                              backgroundColor: '#F5F5F5', borderRadius: 50,
                                              borderWidth:1,
                                              borderColor:'#757575',
                                              paddingLeft: 10,
                                              paddingRight: 10,
                                              paddingTop: 10,
                                              paddingBottom: 10,
                                          }}>
                            <View>
                                <Text>Viết bình luận ...</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{height: 5, backgroundColor: '#cccccc', marginTop: 10}}/>
            </View>
        )
    }
}

export default StatusItems
const DEVICE_WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
    image_circle: {
        height: DEVICE_WIDTH / 10,
        width: DEVICE_WIDTH / 10,
        borderRadius: DEVICE_WIDTH / 20,
        marginLeft: 10,
        // marginTop: 10

    },
})