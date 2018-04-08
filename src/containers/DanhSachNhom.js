import React, {Component} from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Image,
    Picker,
    AsyncStorage,ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Entypo'
import TinNhanItem from '../components/TinNhanItem';
import * as URL from '../Constants'
import * as Dimention from '../configs/Dimention'
import Modal from 'react-native-modalbox';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
export default class DanhSachNhom extends Component {
    // static navigationOptions = ({ navigation}) => {
    //     const {state} = navigation;
    //     return {
    //         // headerLeft: <TouchableOpacity onPress={() => {
    //         //         navigation.navigate('DrawerOpen')
    //         //     }}>
    //         //         <Icon name="menu" size={30} style={{marginLeft: 7}} color="white"/>
    //         //     </TouchableOpacity>,
    //         // headerStyle: { backgroundColor: '#23b34c' },
    //         // headerTitleStyle:{ color: 'white'},
    //     }

    // }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            title:'Thành viên',
            headerStyle: {backgroundColor: '#23b34c'},
            headerTitleStyle: {color: 'white'},
            headerTintColor: 'white',

        }
    }
    constructor(props) {
        super(props)
      
       
    }

    

    

    componentWillMount(){
        

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
            <View style={{flex:1,flexDirection:'column'}}>
                    <FlatList
                        data={this.props.navigation.state.params.userGroup}
                        renderItem={(item) => {
                            return (
                                <TinNhanItem
                                    dataItem={item}
                                    fromDachSach={true}
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

