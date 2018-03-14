import React, {Component} from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Image,
    AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Entypo'
import TinNhanItem from '../components/TinNhanItem';
import * as URL from '../Constants'
import * as Dimention from '../configs/Dimention'
export default class TinNhan extends Component {
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
            dataMSG: []

        }
    }

    getListMessage = async () => {

            var data = await fetch(URL.BASE_URL + URL.PAHT_GET_MESSAGE, {
                headers: {
                    'Authorization': 'Bearer '+this.token,
                    'Content-Type': 'application/json'
                }
            }).then((data) => data.json());
            // console.log("list message",data);
            if(data.errorCode === 0){
                this.setState({dataMSG:data.data});
            }
    }

    componentWillMount(){
        AsyncStorage.getItem('token').then((value)=> {
            this.token = value;

            console.log('value', this.token)
            this.getListMessage();
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

    render() {
        const {navigation} = this.props;
        return (
            <FlatList
                data={this.state.dataMSG}
                renderItem={(item) => {
                    return (
                        <TinNhanItem
                            dataItem={item}
                            navigation={navigation}
                        />
                    )
                }}
                keyExtractor={(item, index) => index}
                ItemSeparatorComponent={this.renderSeparator}
            />
        );
    }

}

