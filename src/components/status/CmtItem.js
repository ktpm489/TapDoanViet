import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';
import Dimensions from 'Dimensions';

class CmtItem extends Component {
    render (){
        const {item} = this.props.dataItem;
        const {navigation} = this.props;
        return (
            <View style = {{flex:1}}>
                <View style = {{flexDirection: 'row'}}>
                    <Image style={styles.image_circle}

                           source={{
                               uri: item.avt
                           }}
                           resizeMode="cover"
                    >
                    </Image>
                    <Text style = {styles.textName}>{item.fullName}</Text>
                </View>
                <View style = {styles.viewCmt}>
                    <Text style = {styles.textCmt}>{item.cmt}</Text>
                    <View style = {{flexDirection:'row'}}>
                        <Text>1 giờ</Text>
                        <Text style = {{marginLeft:15, color:'black'}}>Like</Text>
                        <Text style = {{marginLeft:15, color: 'black'}}>Reply</Text>
                    </View>

                </View>
                <View style = {{height:1, backgroundColor:'#E0E0E0', marginLeft: DEVICE_WIDTH / 10 + 10, marginTop:10}}>
                </View>

            </View>

        );

    }
}
export default CmtItem
const DEVICE_WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
    image_circle: {
        height: DEVICE_WIDTH / 10,
        width: DEVICE_WIDTH / 10,
        borderRadius: DEVICE_WIDTH / 20,
        marginLeft: 10,
        marginTop: 10

    },
    textCmt: {
        fontSize: 15,
        marginRight:20,
        color: 'black',
    },
    textName: {
        color: 'black', fontWeight:'bold', fontSize:16, marginLeft:5, marginTop:DEVICE_WIDTH / 20
    },
    viewCmt: {
        marginLeft: DEVICE_WIDTH / 10 + 15,
    }
})