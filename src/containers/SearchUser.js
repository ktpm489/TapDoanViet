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
import TinNhanItem from '../components/TinNhanItem';
import * as URL from '../Constants'
import * as Dimention from '../configs/Dimention'
import Modal from 'react-native-modalbox';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
export default class SearchUser extends Component {
    constructor(props) {
        super(props)
        this.token = '';
        this.state = {
            resultSearch: [],
            isLoading:false
        };
        this.timeout = 0;
    }

    apiSearch = (text)=>{
        console.log("text",text);
    }

    componentWillMount(){
        AsyncStorage.getItem('token').then((value)=> {
            this.token = value;

            console.log('value', this.token)
            // this.getListMessage();
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
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: Dimention.DEVICE_WIDTH / 5
                }}
            />
        );
    }

    debounce = (func, wait)=> {
        var context = this,
            args = arguments;
        var executeFunction = function() {
            func.apply(context, args);
            this.timeout = 0;
        };

        if(this.timeout) {
            clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(executeFunction, wait);
    }

    callApi = (textSearch)=>{
        this.setState({isLoading:true})
        if(textSearch === ""){
            this.setState({resultSearch:[],isLoading:false})
            return;
        }

        console.log('text',textSearch);
        AsyncStorage.getItem('token').then((value)=> {
            fetch(URL.BASE_URL + URL.SEARCH_USER+textSearch, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': value,
                },
                

            }).then((response) => {
                return response.json();
            }).then(data => {
                console.log('search user data: ', data);
                if(data && data.errorCode == 0){
                    this.setState({resultSearch:data.data,isLoading:false})
                }


               
            }).catch(e => {
                console.log('exception',e)
            })
        });
    }

    render() {


        
        const {navigation} = this.props;
        return (
            <View style={{flex:1,flexDirection:'column',margin:10}}>
            <TextInput style={{
                                borderWidth:1,
                                borderRadius:4,
                                borderColor:'#000',
                                shadowColor: '#000',
                                paddingLeft:5,
                                marginBottom:10,
                                minHeight:50
                                
                            }}
                            onChangeText={(text)=>this.debounce(function(e){
                                   
                                   this.callApi(text);
                            }.bind(this), 1000)}
                            underlineColorAndroid='transparent'
                            placeholder="Nhập tên"
            
            />
            
                    <Text style={{height:20,textAlign:'center'}}>{this.state.resultSearch.length == 0?"Dữ liệu rỗng":""}</Text>
                    <FlatList
                        data={this.state.resultSearch}
                        renderItem={(item) => {
                            return (
                                <TinNhanItem
                                    dataItem={item}
                                    navigation={navigation}
                                />
                            )
                        }}
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={this.renderSeparator}
                    />
                    {this.state.isLoading?
                        <View style={{top:50,bottom:-10,left:-10,right:-10, justifyContent: 'center', alignItems: 'center',position:'absolute',zIndex:1,backgroundColor: 'rgba(52, 52, 52, 0.3)'}}>
                            <ActivityIndicator size="large" color="green"/>
                        </View>:null
                    }

                   
                    
                </View>
        );
    }

}

