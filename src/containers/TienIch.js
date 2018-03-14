import React, { Component } from 'react';
import {
    View,
    Text,
    AsyncStorage,
    FlatList,
    TextInput,
    Image,TouchableOpacity
} from 'react-native'
import {BASE_URL, GET_SERVICE} from "../Constants";

class TienIch extends Component {

    constructor(props){
        super(props);

        this.state = {
            listTienIch:[{a:"1"},{a:"2"},{a:"3"}]
        }
    }


    componentWillMount(){
        AsyncStorage.getItem('token').then((value)=> {
            fetch(BASE_URL + GET_SERVICE, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': value,
                },

            }).then((response) => {
                return response.json();
            }).then(data => {
                console.log('data response service', data);
                if(data && data.errorCode == 0){
                    this.setState({listTienIch:data.data})
                    console.log('statte',this.state.listTienIch)
                }
                
            }).catch(e => {
                console.log('exception', e)
            })
        });
    }

    itemTienIch = ({item})=>

        (
            
            <TouchableOpacity  style={{margin:10}} 
                    onPress={()=>this.props.navigation.navigate("TienIchDetail",{item:item})}
            >
                <Image style={{flex: 1, height: 180, width: "100%", alignSelf: 'stretch',}}
                           resizeMode="cover"
                           source={{uri: item.imageUrl}}/>

                <View style={{flex:1,height:50, backgroundColor:"rgba(0,0,0,0.5)",zIndex:1,marginTop:-50,justifyContent:'center',alignItems:'flex-start'}}>
                    <Text style={{color:'white',fontWeight:'bold',fontSize:20,marginLeft:5}}>{item.serviceName}</Text>
                </View>
            </TouchableOpacity>
        )
    

    


    render (){
        return (
            
            
           
                <FlatList 
                    data={this.state.listTienIch}
                    renderItem={
                        this.itemTienIch
                    }
                    keyExtractor={(item, index) => index}
                />
            
        )

    }
}
export default TienIch;