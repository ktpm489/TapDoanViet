import React, { Component } from 'react';
import {
    View,
    Text,
    AsyncStorage,
    FlatList,
    TextInput,
    Image,TouchableOpacity,
    ActivityIndicator,
    WebView
} from 'react-native'

import logout from '../components/TokenExpired'
import * as URL from '../Constants'
class AboutUs extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            title:'Về chúng tôi',
            headerStyle: {backgroundColor: '#23b34c'},
            headerTitleStyle: {color: 'white'},
            headerTintColor: 'white',

        }
    }
    
    constructor(props){
        super(props);

        this.state = {
            isLoading:false,
            dataAboutUs:''
        }
        
    }


    componentWillMount(){
        this.callApiAboutUs();
    
        
}

callApiAboutUs = ()=>{
    AsyncStorage.getItem('token').then((value)=> {
        this.setState({
            isLoading:true
        })
        fetch(URL.BASE_URL + URL.GET_ABOUT_US, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': value,
            },
        

        }).then((response) => {
            return response.json();
        }).then(data => {
            console.log('get about us', data);
            if(data && data.errorCode == 0){
                this.setState({
                    isLoading:false,
                    dataAboutUs:data.data
                })
                
            }else if(data.errorCode && data.errorCode === "401"){
                logout(AsyncStorage,this.props)
                return;
            }


           
        }).catch(e => {
            console.log('exception',e)
            this.setState({
                isLoading:false
            })
        })
    });
}


    render (){
        return (
            
            <View style={{flex:1}}>
             <WebView
            source={{ html: this.state.dataAboutUs.content,baseUrl:'' }}
            // source={{ uri: "https://dayngheso1.vn/" }}
            style = {{flex: 1,}}
            />
            {this.state.isLoading?
                    <View style={{top:-10,bottom:-10,left:-10,right:-10, justifyContent: 'center', alignItems: 'center',position:'absolute',zIndex:1,backgroundColor: 'rgba(52, 52, 52, 0.3)'}}>
                        <ActivityIndicator size="large" color="green"/>
                    </View>:null
                }
            </View>
           
            
        )

    }
}
export default AboutUs;