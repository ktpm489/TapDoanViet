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
import ItemServiceHistory from '../components/ItemServiceHistory';
import * as URL from '../Constants'
import * as Dimention from '../configs/Dimention'
import Modal from 'react-native-modalbox';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
export default class ServiceHistory extends Component {
    static navigationOptions = ({ navigation}) => {
        const {state} = navigation;
        return {
            headerLeft: <TouchableOpacity onPress={() => {
                    navigation.navigate('DrawerOpen')
                }}>
                    <Icon name="menu" size={30} style={{marginLeft: 7}} color="white"/>
                </TouchableOpacity>,
            headerStyle: { backgroundColor: '#23b34c' },
            headerTitleStyle:{ color: 'white'},
        }

    }
    constructor(props) {
        super(props)
        this.token = '';
        this.state = {
            listHistory: [],
        };
       
    }

    getServiceHistory = async()=>{
        var data = await fetch(URL.BASE_URL + URL.GET_REQUEST, {
            headers: {
                'Authorization': 'Bearer '+this.token,
                'Content-Type': 'application/json'
            }
        }).then((data) => data.json());
             console.log("list history services",data);
        if(data.errorCode === 0){
            this.setState({listHistory:data.data});
        }
        
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

    render() {
        const {navigation} = this.props;
        return (
            <View style={{flex:1,flexDirection:'column',margin:10}}>
        
                    <FlatList
                        data={this.state.listHistory}
                        renderItem={({item}) => {
                            return (
                                <ItemServiceHistory
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

