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

import DichVuItem from '../components/DichVuItem'
import * as URL from '../Constants'
import logout from '../components/TokenExpired'
class SubDichVu extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            title:params.title,
            headerStyle: {backgroundColor: '#23b34c'},
            headerTitleStyle: {color: 'white'},
            headerTintColor: 'white',

        }
    }
    constructor(props){
        super(props);

        this.state = {
            listSubDichVu:[],
            isLoading:false
        }

        this.idItem = this.props.navigation.state.params.idItem;
        this.props.navigation.setParams({title:this.props.navigation.state.params.subtitle});
    }


    componentWillMount(){
        this.getListDichVu();
       
    }

    getListDichVu =  ()=>{
        AsyncStorage.getItem('token').then((value)=> {
            this.setState({isLoading:true})
            fetch(URL.BASE_URL + URL.GET_SUB_SERVICE+this.idItem, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': value,
                },
                

            }).then((response) => {
                return response.json();
            }).then(data => {
                console.log('get sub dichvu response', data);
                if(data && data.errorCode == 0){
                    this.setState({listSubDichVu:data.data,isLoading:false})
                }else if(data.errorCode && data.errorCode === "401"){
                    logout(AsyncStorage,this.props)
                    return;
                }
               
            }).catch(e => {
                console.log('exception',e)
            })
        });
    }

    
    

    


    render (){
        
        return (
            
          <View>
            < FlatList
                    showsHorizontalScrollIndicator={false}
                    showVerticalScrollIndicator={false}
                    data={this.state.listSubDichVu}
                    renderItem={(item) => {
                        return (
                            <DichVuItem
                                dataItem={item}
                                navigation={this.props.navigation}
                                fromSubDichVu = {true}
                            />
                        )
                    }}
                    numColumns={3}
                    keyExtractor={(item, index) => index.toString()}
                    style={{marginBottom: 100, marginLeft: 10, marginRight: 10, marginTop: 10}}
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
export default SubDichVu;