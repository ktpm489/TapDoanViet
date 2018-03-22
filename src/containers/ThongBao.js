import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Entypo'
import ThongBaoItem from '../components/ThongBaoItem';
import * as URL from '../Constants'
import * as Dimention from '../configs/Dimention'

export default class ThongBao extends Component {
    static navigationOptions = ({ navigation}) => {
        const {state} = navigation;
        return {
            headerLeft:
                <TouchableOpacity onPress={() => {
                    navigation.navigate('DrawerOpen')
                }}>
                    <Icon name="menu" size={30} style={{marginLeft: 7}} color="white"/>
                </TouchableOpacity>,
            headerStyle: { backgroundColor: '#23b34c' },
            headerTitleStyle:{ color: 'white'},
        }

    }


    constructor(props){
        super(props)

        this.state = {
            listNoti:[
                {
                    img:'',
                    title:'title1',
                    body:'body1',
                    content:'abcd',
                    isSeen:false,
                    time:'2017-03-01 8:00'
                },
                {
                    img:'',
                    title:'title1',
                    body:'body1',
                    content:'abcd',
                    isSeen:true,
                    time:'2017-03-01 8:00'
                },{
                    img:'',
                    title:'title1',
                    body:'body1',
                    content:'abcd',
                    isSeen:false,
                    time:'2017-03-01 8:00'
                }
            ]
        }

    }
    render (){
        const {navigation} = this.props;
        return (
            <View style={{flex:1}}>
               <FlatList
                data={this.state.listNoti}
                renderItem={(item) => {
                    return (
                        <ThongBaoItem
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
}