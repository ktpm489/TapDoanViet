import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    AsyncStorage,
    ActivityIndicator,
    WebView,
    Platform
} from 'react-native';

import * as Dimention from '../configs/Dimention'
import moment from 'moment';
import logout from '../components/TokenExpired'
import * as URL from '../Constants'
export default class ThongBaoDetail extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            title:'Chi tiết thông báo',
            headerStyle: {backgroundColor: '#23b34c'},
            headerTitleStyle: {color: 'white'},
            headerTintColor: 'white',

        }
    }

    constructor(props) {
        super(props);

        this.state = {
            isLoading:false,
            dataDetail:''
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (JSON.stringify(nextProps.dataItem) === JSON.stringify(this.props.dataItem)) {
            return false;
        }

        else
            return true;
    }

    componentWillMount(){
        this.callApiDetailNoti();
        setTimeout(()=>{
            this.setState({
                isLoading:false
            })
        },3000)
        
}

callApiDetailNoti = ()=>{
    AsyncStorage.getItem('token').then((value)=> {
        this.setState({
            isLoading:true
        })
        fetch(URL.BASE_URL + URL.GET_DETAIL_NOTI, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': value,
            },
        

        }).then((response) => {
            return response.json();
        }).then(data => {
            console.log('get detail noti', data);
            if(data && data.errorCode == 0){
                this.setState({
                    isLoading:false,
                    dataDetail:data.data
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





    componentWillUnmount(){
       
        const item = this.props.navigation.state.params.dataItem;
        const reloadDataFromBack = this.props.navigation.state.params.reloadDataFromBack;
        if(item.status === 1){
           
            reloadDataFromBack();
        }
    }

   
    render() {
        const item = this.props.navigation.state.params.dataItem;
        var convertTime =  moment(item.createdAt).format("DD-MM-YYYY HH:mm");
        return (

        
                // <View 
                //       style={{flex: 1, flexDirection: 'column',margin:10 , alignItems: 'center'}}>
                //     <Image style={myStyle.image_circle}
                //         source={require('../../src/images/logo.png')}
                //            resizeMode="cover"
                //     >
                //     </Image>
                   
                //     <Text style={{fontWeight: '600',fontSize:16}} >{item.title}</Text>
                //         <Text>{item.content}</Text>
                //         <Text>{convertTime}</Text>
                   
                // </View>
                

            <View style={{flex:1}}>
            <WebView
                    source={{ html: item.content,baseUrl:'' }}
                    javaScriptEnabledAndroid={true}
                    mixedContentMode='always'
                    scalesPageToFit={(Platform.OS === 'ios') ? false : true}
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
};
const myStyle = StyleSheet.create({
    image_circle: {
        height: Dimention.DEVICE_WIDTH / 6,
        width: Dimention.DEVICE_WIDTH / 6,
        borderRadius: 0,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        marginTop: 10

    }
})