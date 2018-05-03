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

class TienIch extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
    

        return {
            title:params.nameCategory,
            headerStyle: {backgroundColor: '#23b34c'},
            headerTitleStyle: {color: 'white'},
            headerTintColor: 'white',

        }
    }
    constructor(props){
        super(props);

        // this.props.navigation.setParams({ title: this.props.navigation.state.params.nameCategory})
    }


    componentWillMount(){
       
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
                    <Text style={{color:'white',fontWeight:'bold',fontSize:20,marginLeft:5}}>{item.utilityName}</Text>
                </View>
            </TouchableOpacity>
        )
    

    


    render (){

        
        var dataItem = this.props.navigation.state.params.dataItem;
        console.log("data pass",dataItem);
        return (
            
            
           <View style = {{flex:1}}>
                <FlatList 
                    data={dataItem}
                    renderItem={
                        this.itemTienIch
                    }
                    keyExtractor={(item, index) => index.toString()}
                    style={{flex:1}}
                />

            </View>
            
        )

    }
}
export default TienIch;