import React, {Component} from 'react';
import {
    View,
    Text,
    AsyncStorage,
    TouchableOpacity,
    FlatList,ScrollView,
    ActivityIndicator,
    Image,
    StyleSheet
} from 'react-native';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {callApiDichVu} from "../actions/DichvuActions";
import {connectToSocket, disConnectToSocket, joinToChat} from '../actions/SocketActions';
import {callApiProfile} from "../actions/ProfileActions";
import SocketIOClient from 'socket.io-client';
import * as URL from '../Constants'
import Icon from 'react-native-vector-icons/dist/Entypo'
import DichVuItem from '../components/DichVuItem'
import SlideImage from '../components/SlideImage';
import logout from '../components/TokenExpired'


class CongDong extends Component {
    static navigationOptions = ({ navigation}) => {
        const {state} = navigation;
        return {
            headerLeft: <TouchableOpacity onPress={() => {
                navigation.navigate('DrawerOpen')
            }}>
                <Icon name="menu" size={30} style={{marginLeft: 7}} color="white"/>
            </TouchableOpacity>,
        tabBarIcon: () => (
            <Image
                source={require('../images/iconhome.png')}
                style = {styles.iconTab}
            />
        ),
        headerStyle: { backgroundColor: '#23b34c' },
        headerTitleStyle:{ color: 'white'},
            title: 'Cộng đồng',
            

        }

    }

    constructor(props) {
        super(props);

        this.state = {
          
            listCongDong: [],
            isLoading:false

        };


        console.ignoredYellowBox = [
            'Setting a timer'
        ];

       

    }


    componentWillMount() {
       this.getListCongDong();
        
    }

    getListCongDong =  ()=>{
        AsyncStorage.getItem('token').then((value)=> {
            this.setState({isLoading:true})
            fetch(URL.BASE_URL + URL.CONGDONG_CATEGORY, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': value,
                },
                

            }).then((response) => {
                return response.json();
            }).then(data => {
                console.log('get congdong category response', data);
                if(data && data.errorCode == 0){
                    this.setState({listCongDong:data.data,isLoading:false})
                }else if(data.errorCode && data.errorCode === "401"){
                    logout(AsyncStorage,this.props)
                    return;
                }
               
            }).catch(e => {
                console.log('exception',e)
            })
        });
    }

    componentWillUnmount() {
    
    }

    
   
    render() {
        const {navigation} = this.props;

        return (
            
                    <View style={{justifyContent:'center',alignItems:'center',margin:10,flex:1}}>
                    < FlatList
                         showsHorizontalScrollIndicator={false}
                         showVerticalScrollIndicator={false}
                        data={this.state.listCongDong}
                        renderItem={(item) => {
                            return (
                                <DichVuItem
                                    dataItem={item}
                                    navigation={navigation}
                                    fromCongDong= {true}
                                />
                            )
                        }}
                        numColumns={3}
                        keyExtractor={(item, index) => index.toString()}
                        style={{marginBottom: 100,}}
                    />
                    {this.state.isLoading?
                        <View style={{top:-10,bottom:-10,left:-10,right:-10, justifyContent: 'center', alignItems: 'center',position:'absolute',zIndex:1,backgroundColor: 'rgba(52, 52, 52, 0.3)'}}>
                            <ActivityIndicator size="large" color="green"/>
                        </View>:null
                    }
                    </View>

        );
    }
}


export default CongDong
const styles = StyleSheet.create({
    iconTab: {
        height:24,
        width:24,
    }
})