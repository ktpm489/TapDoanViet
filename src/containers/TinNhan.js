import React, {Component} from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Image,
    Picker,
    AsyncStorage, ActivityIndicator,
    Platform,
    ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Entypo'
import TinNhanItem from '../components/TinNhanItem';
import * as URL from '../Constants'
import * as Dimention from '../configs/Dimention'
import Modal from 'react-native-modalbox';
import {BASE_URL} from "../Constants";
import {SEARCH_USER} from "../Constants";
import {GET_GROUPCHAT} from "../Constants";
import GroupChatItem from "../components/GroupChatItem";
// import Icon from 'react-native-vector-icons/FontAwesome';
// import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
export default class TinNhan extends Component {
    static navigationOptions = ({ navigation}) => {
        const {state} = navigation;
        return {
            headerLeft: <TouchableOpacity onPress={() => {
                    navigation.navigate('DrawerOpen')
                }}>
                    <Icon name="menu" size={30} style={{marginLeft: 7}} color="white"/>
                </TouchableOpacity>,
            tabBarIcon: () => (
                <Image
                    source={require('../images/icontinnhan.png')}
                    style = {styles.iconTab}
                />
            ),
            headerStyle: { backgroundColor: '#23b34c' },
            headerTitleStyle:{ color: 'white'},
            title: 'Tin nhắn'

        }

    }

    constructor(props) {
        super(props)
        this.token = '';
        this.state = {
            dataUsers: [],
            isLoading: false,
            dataGroupChat: [],

        }
    }

    getListMessage = async () => {
        this.setState({isLoading: true})

        var data = await fetch(URL.BASE_URL + URL.PAHT_GET_MESSAGE, {
            headers: {
                'Authorization': 'Bearer ' + this.token,
                'Content-Type': 'application/json'
            }
        }).then((data) => data.json());
         console.log("list client",data);
        if (data.errorCode === 0) {
            this.setState({dataGroupChat: data.data.groups, dataUsers:data.data.users,isLoading: false});
        } else {
            this.setState({isLoading: false})
        }
    }


    componentWillMount() {
        AsyncStorage.getItem('token').then((value) => {
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

    onReloadBack = ()=>{
        this.getListMessage();
    }


    render() {
        const {navigation} = this.props;
        return (

            <View style={{flex:1}}>
            <ScrollView style={{flex: 1, flexDirection: 'column'}}>
                <FlatList
                    data={this.state.dataUsers}
                    renderItem={(item) => {
                        return (
                            <TinNhanItem
                                dataItem={item}
                                navigation={navigation}
                                onReloadBack ={this.onReloadBack}
                            />
                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={this.renderSeparator}
                />
                <FlatList
                    data={this.state.dataGroupChat}
                    renderItem={(item) => {
                        return (
                            <GroupChatItem
                                dataItem={item}
                                navigation={navigation}
                                onReloadBack ={this.onReloadBack}
                            />
                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={this.renderSeparator}
                />
                

                
                {this.state.isLoading ?
                    <View style={{
                        top: -10,
                        bottom: -10,
                        left: -10,
                        right: -10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        zIndex: 1,
                        backgroundColor: 'rgba(52, 52, 52, 0.3)'
                    }}>
                        <ActivityIndicator size="large" color="green"/>
                    </View> : null
                }


            </ScrollView>
            <TouchableOpacity
                    style={{
                        borderWidth: 1,
                        borderColor: '#01a699',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 70,
                        position: 'absolute',
                        bottom: 10,
                        right: 10,
                        height: 70,
                        backgroundColor: '#fff',
                        borderRadius: 100,
                    }}

                    onPress={() => this.refs.modal.open()}

                >
                    <Icon name="plus" size={30} color="#01a699"/>
                </TouchableOpacity>
                <Modal style={{
                    height: 100,
                    width: Dimention.DEVICE_WIDTH - 50,
                }}
                       swipeArea={20}
                       position={"center"} ref={"modal"} isDisabled={false}


                >
                    <TouchableOpacity
                        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}

                        onPress={() => {


                            this.refs.modal.close()
                            if (Platform.OS === "ios") {
                                setTimeout(() => {
                                    navigation.navigate("SearchUser",{onReloadBack:this.onReloadBack});
                                }, 500);
                            } else {
                                navigation.navigate("SearchUser",{onReloadBack:this.onReloadBack});
                            }


                        }}

                    >
                        <Text style={{color: 'black'}}>Tin nhắn mới</Text>
                    </TouchableOpacity>
                    <View style={{height: 1, backgroundColor: 'gray'}}></View>
                    <TouchableOpacity
                        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
                        onPress={() => {
                            this.refs.modal.close()
                            if (Platform.OS === "ios") {
                                setTimeout(() => {
                                    navigation.navigate("CreateGroup",{onReloadBack:this.onReloadBack});
                                }, 500);
                            } else {
                                navigation.navigate("CreateGroup",{onReloadBack:this.onReloadBack});
                            }


                        }}

                    >
                        <Text style={{color: 'black'}}>Nhóm mới</Text>
                    </TouchableOpacity>
                </Modal>
            </View>
        );
    }

}
const styles = StyleSheet.create({
    iconTab: {
        height:24,
        width:24,
    }
})

