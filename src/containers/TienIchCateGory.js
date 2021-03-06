import React, { Component } from 'react';
import {
    View,
    Text,
    AsyncStorage,
    FlatList,
    TextInput,
    Image,TouchableOpacity,
    ActivityIndicator
} from 'react-native'
import {BASE_URL, GET_UTILITY} from "../Constants";
import logout from '../components/TokenExpired'
import ItemTienIchCateGory from '../components/ItemTienIchCateGory';

class TienIchCateGory extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            title:'Tiện ích',
            headerStyle: {backgroundColor: '#23b34c'},
            headerTitleStyle: {color: 'white'},
            headerTintColor: 'white',

        }
    }
    constructor(props){
        super(props);

        this.state = {
            listTienIch:[],
            isLoading:false
        }
    }


    componentWillMount(){
        AsyncStorage.getItem('token').then((value)=> {
            this.setState({isLoading:true})
            fetch(BASE_URL + GET_UTILITY, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': value,
                },

            }).then((response) => {
                return response.json();
            }).then(data => {
                console.log('data response utility', data);
                if(data && data.errorCode == 0){
                    this.setState({listTienIch:data.data,isLoading:false})
                    console.log('statte',this.state.listTienIch)
                }else if(data.errorCode && data.errorCode === "401"){
                    logout(AsyncStorage,this.props)
                    return;
                }
                
                else{
                    this.setState({isLoading:false})
                }
                
            }).catch(e => {
                this.setState({isLoading:false})
                console.log('exception', e)
            })
        });
    }



    render (){
        return (
            
            
           <View style = {{flex:1}}>
                <FlatList 
                    data={this.state.listTienIch}
                    renderItem={(item)=>{
                        return(
                            <ItemTienIchCateGory
                                dataItem={item}
                                navigation={this.props.navigation}
                            />
                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    style={{flex:1,marginTop:10}}
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
export default TienIchCateGory;