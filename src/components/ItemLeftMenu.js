import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import ImageLeftMenu from "../images/ImageLeftMenu";
export default class ItemLeftMenu extends Component {
    render(){
        return(
            <TouchableOpacity
                onPress={()=>this.props.onPress}
                style={{flexDirection: 'row',marginTop:20}}>
                <View style = {{marginLeft: 5, flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Image style = {styles.img}
                           source={this.props.source}
                    />
                </View>
                <Text style={{flex:5, fontSize:17, color:'white'}}>{this.props.title}</Text>
            </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({
    img : {
        height:25,
        width:25,
    }
})