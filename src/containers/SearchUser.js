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
    AsyncStorage
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

    render() {
        const {navigation} = this.props;
        return (
            <View style={{flex:1,flexDirection:'column',margin:10}}>
            <TextInput style={{
                                borderWidth:1,
                                borderRadius:1,
                                borderColor:'#000',
                                shadowColor: '#000',
                                paddingLeft:5,
                                marginBottom:10
                                
                            }}
                            onChangeText={(text)=>this.debounce(function(e){
                                   console.log('text');
                            }, 1000)}
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
                    
                </View>
        );
    }

}

