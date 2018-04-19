import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image,
    AsyncStorage,
    ActivityIndicator, StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Entypo'
import ThongBaoItem from '../components/ThongBaoItem';
import * as URL from '../Constants'
import * as Dimention from '../configs/Dimention'
import logout from '../components/TokenExpired'

export default class ThongBao extends Component {
    static navigationOptions = ({ navigation}) => {
        const {state} = navigation;
        return {
            headerLeft: <TouchableOpacity onPress={() => {
                    navigation.navigate('DrawerOpen')
                }}>
                    <Icon name="menu" size={30} style={{marginLeft: 7}} color="white"/>
                </TouchableOpacity>,
            // tabBarIcon: () => (
            //     <Image
            //         source={require('../images/iconthongbao.png')}
            //         style = {styles.iconTab}
            //     />
            // ),
            headerStyle: { backgroundColor: '#23b34c' },
            headerTitleStyle:{ color: 'white'},
            title: 'Thông báo'

        }

    }

    


    constructor(props){
        super(props)

        this.state = {
            listNoti:[],
            isLoading:false
        }

    }

    callApi = (page,pageSize)=>{
         

        AsyncStorage.getItem('token').then((value)=> {
            this.setState({isLoading:true})
            fetch(URL.BASE_URL + URL.GET_NOTI, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': value,
                },
                

            }).then((response) => {
                return response.json();
            }).then(data => {
                console.log('get list noti ', data);
                if(data && data.errorCode == 0){
                    this.setState({listNoti:data.data,isLoading:false})
                }else if(data.errorCode && data.errorCode === "401"){
                    logout(AsyncStorage,this.props)
                    return;
                }else
                    this.setState({isLoading:false});


               
            }).catch(e => {
                console.log('exception',e)
            })
        });
    }

    reloadDataFromBack = ()=>{
        console.log("reload data");
        this.callApi();
    }

    componentWillMount(){
        this.callApi();
    }
    render (){
        const {navigation} = this.props;
        return (
            <View style={{flex:1}}>
               <FlatList
                data={this.state.listNoti}
                renderItem={(item) => {
                    return (
                        <ThongBaoItem
                            dataItem={item}
                            navigation={navigation}
                            reloadDataFromBack = {this.reloadDataFromBack}
                        />
                    )
                }}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={this.renderSeparator}
            />

            {this.state.isLoading?
                <View style={{top:-10,bottom:-10,left:-10,right:-10, justifyContent: 'center', alignItems: 'center',position:'absolute',zIndex:1,backgroundColor: 'rgba(52, 52, 52, 0.3)'}}>
                    <ActivityIndicator size="large" color="green"/>
                </View>:null
            }
            </View>
        );
    }


    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: Dimention.DEVICE_WIDTH / 5
                }}
            />
        );
    }
}
const styles = StyleSheet.create({
    iconTab: {
        height:24,
        width:24,
    }
})