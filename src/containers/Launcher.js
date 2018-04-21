import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    AsyncStorage,
    NetInfo,
    TouchableOpacity
} from 'react-native';
import Communications from 'react-native-communications';
import { NavigationActions } from 'react-navigation'

export default class Launcher extends Component{
    constructor(props) {
        super(props)
        this.state = {
            isTime: false,
            isNetWork:null
        }

        NetInfo.getConnectionInfo().then((connectionInfo) => {
            console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
            if(connectionInfo.type === "none" || connectionInfo.type ==="unknown"){
                this.setState({isNetWork:false});

            }else{
                this.setState({isNetWork:true});
                setTimeout(()=> {
                    this.setState({
                        isTime: true
                    })
                    this.pushScreen();
                },500)
                
            }
          });
        
    }
    componentWillMount(){
        
    }
    pushScreen(){
        AsyncStorage.getItem('isFirstLogin').then((isFirstLogin)=>{
            
            if(isFirstLogin){
                AsyncStorage.getItem('token').then((value)=>{
                    console.log("token",value);
                    if(value){ // co van de
                        // this.props.navigation.navigate('Tab')
                        const resetAction = NavigationActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({
                                    routeName: 'Tab',
                                }),
                            ]
                        });
                        this.props.navigation.dispatch(resetAction)
                    }
                    else {
                        const resetAction = NavigationActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({
                                    routeName: 'Login',
                                }),
                            ]
                        });
                        this.props.navigation.dispatch(resetAction)
                    }
                })
            }else{
                const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({
                            routeName: 'FirstScreen',
                        }),
                    ]
                });
                this.props.navigation.dispatch(resetAction)
            }
        });


        
    }
    render (){

        return (
            <View style = {{ flex:1, backgroundColor:'white', justifyContent:'center', alignItems:'center'}}>
                <Image
                    source={require('../../src/images/logo.png')}
                />
                {this.state.isNetWork !== null && this.state.isNetWork===false?
                        <View>
                        <Text style={{color:'red',textAlign:'center',alignSelf:'center',fontWeight:'400',fontSize:20}}>Không có kết nối Internet</Text>
                        <TouchableOpacity onPress={() => Communications.phonecall('0902703073', true)}>
                            <Text style={{color:'red',textAlign:'center',alignSelf:'center',fontWeight:'400',fontSize:20}}>
                                Hotline: 0902.703.073
                            </Text>
                        </TouchableOpacity>
                        </View>
                    :null
                }
            </View>
        )

    }
}