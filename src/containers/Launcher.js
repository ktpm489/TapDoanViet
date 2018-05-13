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
            isNetWork:null,
            status:null
        }
        this.isCallPush = false;
        // NetInfo.getConnectionInfo().then((connectionInfo) => {
        //     console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
        //     if(connectionInfo.type === "none" || connectionInfo.type ==="unknown"){
        //         this.setState({isNetWork:false});

        //     }else{
        //         this.setState({isNetWork:true});
        //         setTimeout(()=> {
        //             this.setState({
        //                 isTime: true
        //             })
        //             this.pushScreen();
        //         },500)
                
        //     }
        //   });
        
    }
    componentWillMount(){
        
    }

    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
    
        NetInfo.isConnected.fetch().done(
          (isConnected) => { this.setState({ status: isConnected }); 
          
        
        }
        );
    }
    componentWillUnmount() {
        
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
    }
    
    handleConnectionChange = (isConnected) => {
            this.setState({ status: isConnected });
            console.log(`is connected: ${this.state.status}`);
            // console.log("push---",this.state)
            
    }
    pushScreen(){
        this.isCallPush = true;
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
        
        if(this.state.status !== null && this.state.status===true && this.isCallPush === false){
           
                this.pushScreen();
        }

        return (
            <View style = {{ flex:1, backgroundColor:'white', justifyContent:'center', alignItems:'center'}}>
                <Image
                    source={require('../../src/images/logo2.png')}
                />
                {this.state.status !== null && this.state.status===false?
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