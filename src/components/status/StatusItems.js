import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,

} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/EvilIcons';
class StatusItems extends Component {
    render (){
        const {item} = this.props.dataItem;
        const {navigation} = this.props;
        return (
            <View>
                <View>
                    <View style  = {{flexDirection:'row', marginTop: 15}}>
                        <Image source={require('../../images/chieu-cao-va-tieu-su-cua-phuong-ly-12-e1482887471940.jpg')}
                               style = {{ resizeMode: 'cover',height: 40, width:30, marginLeft:10}}>
                        </Image>
                        <View style = {{marginLeft: 10}}>
                            <Text style = {{color: 'black', fontWeight:'bold'}}>Nguyễn Văn A</Text>
                            <Text>1 giờ trước</Text>
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
                            <Text> 3 bình luận</Text>
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
                            <TouchableOpacity onPress = {() => navigation.navigate('BinhLuan')}>
                                <Text style = {{color: '#424242'}}>Bình luận</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {/*<View style={{height: 1, backgroundColor: '#cccccc', marginTop: 5}}/>*/}
                {/*<View style  = {{flexDirection:'row', marginTop: 15}}>*/}
                {/*<Image source={require('../../images/chieu-cao-va-tieu-su-cua-phuong-ly-12-e1482887471940.jpg')}*/}
                {/*style = {{ resizeMode: 'cover',height: 40, width:30, marginLeft:10}}>*/}
                {/*</Image>*/}
                {/*<View style = {{marginLeft: 10, borderWidth: 1, borderColor: '#cccccc', borderRadius:20, flex:1,justifyContent:'center' ,alignItems:'center'}}>*/}
                {/*<TouchableOpacity onPress = {()=>this.props.navigation.navigate('SoanTin')}>*/}
                {/*<Text>bài này hay quá anh ưi</Text>*/}
                {/*</TouchableOpacity>*/}
                {/*</View>*/}

                {/*</View>*/}
                <View style={{height: 5, backgroundColor: '#cccccc', marginTop: 10}}/>
            </View>
        )
    }
}

export default StatusItems