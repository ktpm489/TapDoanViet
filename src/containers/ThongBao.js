import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    AsyncStorage 
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Entypo'
import ThongBaoItem from '../components/ThongBaoItem';
import * as URL from '../Constants'
import * as Dimention from '../configs/Dimention'

export default class ThongBao extends Component {
    static navigationOptions = ({ navigation}) => {
        const {state} = navigation;
        return {
            headerLeft:
                <TouchableOpacity onPress={() => {
                    navigation.navigate('DrawerOpen')
                }}>
                    <Icon name="menu" size={30} style={{marginLeft: 7}} color="white"/>
                </TouchableOpacity>,
            headerStyle: { backgroundColor: '#23b34c' },
            headerTitleStyle:{ color: 'white'},
        }

    }


    constructor(props){
        super(props)

        this.state = {
            listNoti:[]
        }

    }

    callApi = (page,pageSize)=>{
         

        AsyncStorage.getItem('token').then((value)=> {
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
                    this.setState({listNoti:data.data})
                }


               
            }).catch(e => {
                console.log('exception',e)
            })
        });
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
                        />
                    )
                }}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={this.renderSeparator}
            />
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