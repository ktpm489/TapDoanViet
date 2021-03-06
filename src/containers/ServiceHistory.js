import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Image,
    Picker,
    AsyncStorage,
    ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Entypo'
import ItemServiceHistory from '../components/ItemServiceHistory';
import * as URL from '../Constants'
import * as Dimention from '../configs/Dimention'
import Modal from 'react-native-modalbox';
import logout from '../components/TokenExpired'
// import Icon from 'react-native-vector-icons/FontAwesome';
// import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
export default class ServiceHistory extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            title:'Lịch sử dịch vụ',
            headerStyle: {backgroundColor: '#23b34c'},
            headerTitleStyle: {color: 'white'},
            headerTintColor: 'white',

        }
    }


    
    constructor(props) {
        super(props)
        this.token = '';
        this.state = {
            listHistory: [],
            isLoading:false
        };
        console.log("goto constructer");
       
    }

    getServiceHistory = async()=>{
        this.setState({isLoading:true})
        
        var data = await fetch(URL.BASE_URL + URL.GET_REQUEST, {
            headers: {
                'Authorization': this.token,
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            return response.json();
        }).catch(e=>{
            console.log("exception",e);
            this.setState({isLoading:false})
        });
             console.log("list history services",data);
        if(data.errorCode === 0){
            this.setState({listHistory:data.data,isLoading:false});
        }else if(data.errorCode && data.errorCode === "401"){
            logout(AsyncStorage,this.props)
            return;
        }else
            this.setState({isLoading:false})
        
    }

    componentWillMount(){
        AsyncStorage.getItem('token').then((value)=> {
            this.token = value;

          this.getServiceHistory();
        })

    }

    shouldComponentUpdate() {
        return true;
    }


    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#CED0CE",
                    marginLeft: 0
                }}
            />
        );
    }

    updateStateLoading = (state)=>{
        this.setState({isLoading:state})
    }
    reloadData = ()=>{
        this.setState({listHistory:[]})
        this.getServiceHistory();
    }
    render() {
        const {navigation} = this.props;
        return (
            <View style={{flex:1,flexDirection:'column',padding:10}}>
        
                    <FlatList
                        data={this.state.listHistory}
                        renderItem={(item) => {
                            return (
                                <ItemServiceHistory
                                    dataItem={item}
                                    navigation={navigation}
                                    updateStateLoading={this.updateStateLoading}
                                    reloadData = {this.reloadData}

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

}

