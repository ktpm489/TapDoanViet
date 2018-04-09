import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    Image,
    TouchableOpacity,
    FlatList,
    ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Entypo'
import StatusItems from "../components/status/StatusItems";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {callApiGetPost} from "../actions/GetPostActions";


class TrangChu extends Component {
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
                    source={require('../images/iconhome.png')}
                    style = {styles.iconTab}
                />
            ),
            headerStyle: { backgroundColor: '#23b34c' },
            headerTitleStyle:{ color: 'white'},
            title: 'Trang chủ'

        }

    }
    constructor(props){
        super(props)
        this.state = {
            dataItem : [],
            refresh: false,
            isLoading: true,

        }
    }
    componentWillMount(){
       this.GetPost()
    }
    GetPost = ()=> {
        const { callApiGetPost } = this.props
        callApiGetPost().then(dataRes => {
            console.log('dataRes trang chu', dataRes)
            this.setState({
                isLoading: false,
                dataItem: dataRes.data
            })
        })
    }

    render (){
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(52, 52, 52, 0.3)'}}>
                    <ActivityIndicator size="large" color="white"/>
                </View>
            );
        }
        const {navigation} = this.props;
        return (
            <View>
                <View>
                    <View style  = {{flexDirection:'row', marginTop: 15}}>
                        <Image source={require('../images/chieu-cao-va-tieu-su-cua-phuong-ly-12-e1482887471940.jpg')}
                               style = {{ resizeMode: 'cover',height: 40, width:30, marginLeft:10}}>
                        </Image>
                        <View style = {{marginLeft: 10, borderWidth: 1, borderColor: '#cccccc', borderRadius:20, flex:1,justifyContent:'center' ,alignItems:'center'}}>
                            <TouchableOpacity onPress = {()=>this.props.navigation.navigate('TaoBaiViet')}>
                                <Text>Soạn đăng bản tin cho KĐT</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
                <View style={{height: 3, backgroundColor: '#cccccc', marginTop: 10}}/>

                <FlatList
                    refreshing={this.state.refresh}
                    onRefresh={() => {
                        this.GetPost()
                    }}
                    data = {this.state.dataItem}
                    renderItem={(item) => {
                        return (
                            <StatusItems
                                dataItem={item}
                                navigation={navigation}/>
                        )
                    }
                    }
                    keyExtractor={(item, index) => index.toString()}
                />


            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        callApiGetPost : bindActionCreators(callApiGetPost, dispatch),
    }
};

TrangChu = connect(mapStateToProps, mapDispatchToProps)(TrangChu);
export default TrangChu;
const styles = StyleSheet.create({
    viewItem: {
        flexDirection: 'row',
        borderWidth:1,
        alignItems:'center',
        justifyContent:'center',
        marginHorizontal: 20,
        marginTop:7,
        minHeight:50,
    },

        iconTab: {
            height:25,
            width:25,
        }

})