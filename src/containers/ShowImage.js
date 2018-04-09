import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';

import * as Dimention from '../configs/Dimention'
import * as Const from '../Constants'

export default class ShowImage extends Component {


    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            title:'Ảnh hóa đơn',
            headerStyle: {backgroundColor: '#23b34c'},
            headerTitleStyle: {color: 'white'},
            headerTintColor: 'white',

        }
    }
    
    constructor(props) {
        super(props);

        
    }

    shouldComponentUpdate(nextProps, nextState) {
        
            return true;
    }
    componentWillReceiveProps(){
        
    }
    
    render() {
       
    
        console.log("AaaA",this.props.navigation.state.params);
        
        return (
           <View style={{flex:1,backgroundColor:'black'}}>
               <Image
                    source= {{uri: this.props.navigation.state.params.url}}
                    style={{width:Dimention.DEVICE_WIDTH,height:Dimention.DEVICE_HEIGHT,
                        flex: 1,
                        alignSelf: 'stretch',
                    }}
                    resizeMode={'contain'} 
               />
            </View>
            )
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