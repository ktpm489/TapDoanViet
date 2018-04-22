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
        this.setState({textSubmit:""});
       
    }

    render() {

        console.log("render---",this.state.textSubmit)
        return (
            <View style={{
                flexWrap: 'wrap',
                flexDirection: 'row',
                paddingBottom: 1,
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop:2
                // backgroundColor:'gray'
            }}>
                
                <TextInput
                    style={{
                        flex: 1,
                        borderWidth: 1,
                        // borderRadius: 4,
                        borderBottomLeftRadius:4,
                        borderTopLeftRadius:4,
                        marginLeft: 1,
                        borderColor: "#000",
                        shadowColor: "#000",
                        paddingLeft: 1,
                        marginTop: 1,
                        marginBottom:1,
                        minHeight: 42
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
                    style={{ justifyContent: 'center', alignItems: 'center',backgroundColor:'gray',width:42,marginBottom:1 }}
                >

                <Icon name="ios-send" size={40} color="#33ccff"/>
                    
                </TouchableOpacity>
            </View>
        )
    }
};
