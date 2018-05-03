import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    TextInput
} from 'react-native';

import * as Dimention from '../configs/Dimention'
import * as Const from '../Constants'
import Icon from 'react-native-vector-icons/Ionicons'

export default class TextInputChat extends Component {

    constructor(props) {
        super(props);

        this.state = {
            textSubmit:'',
        }


    }

    shouldComponentUpdate(nextProps, nextState) {
        // console.log("nextProps",nextProps)
        // console.log("next state",nextState)
        // if(this.state.isRender === false){
        //     return false;
        // }

        return true;
    }
    componentWillReceiveProps() {

    }


    onClickSend = ()=>{
        
        console.log("data",this.state.textSubmit)
        this.props.onReceiveTextInputClick(this.state.textSubmit);
        // this.refs.textInput.clear();
        this.setState({textSubmit:""});
       
    }

    render() {

        console.log("render---",this.state.textSubmit)
        return (
            <View style={{
                height:42,
                // flexWrap: 'wrap',
                flexDirection: 'row',
                // alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                borderTopColor:'gray',
                borderTopWidth:1
                
            
                // backgroundColor:'gray'
            }}>
                
                <TextInput
                    style={{
                        flex: 1,
                        // borderWidth: 1,
                        // borderRadius: 4,
                        // borderBottomLeftRadius:4,
                        // borderTopLeftRadius:4,
                        // marginLeft: 1,
                        // borderColor: "#000",
                        // shadowColor: "#000",
                        paddingLeft: 5,
                        minHeight: 42,
                    }}
                    placeholder={"Nhập vào đây..."}
                    underlineColorAndroid="transparent"
                    value={this.state.textSubmit}
                    returnKeyType={"done"}
                    onChangeText={
                        (text) => 
                        {
                            this.setState({textSubmit:text});
                            
                        this.input_msg = text
                    }
                    }
                    ref={input => {
                        this.textInput = input
                    }}


                />
                <TouchableOpacity
                    onPress={this.onClickSend}
                    style={{justifyContent: 'center', alignItems: 'center',width:50,height:42, backgroundColor:'gray'}}
                >

                <Icon name="ios-send" size={40} color="#33ccff"
                    style={{flex:1}}
                />
                    
                </TouchableOpacity>
            </View>
        )
    }
};
