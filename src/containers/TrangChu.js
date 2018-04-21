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
import Dimensions from 'Dimensions';
import StatusItems from "../components/status/StatusItems";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {callApiGetPost} from "../actions/GetPostActions";


class TrangChu extends Component {
    static navigationOptions = ({ navigation}) => {
        const {state} = navigation;
        const { params = {} } = navigation.state
        return {
            headerStyle: {backgroundColor: '#23b34c'},
            headerTitleStyle: {color: 'white'},
            headerTintColor: 'white',
            title: params.title,
            headerTintColor: 'white',
            


        }

    }
    constructor(props){
        super(props)

        
        this.state = {
            dataItem : [],
            refresh: false,
            isLoading: true,

        }
        this.item = this.props.navigation.state.params.dataItem;
        this.props.navigation.setParams({title:this.item.name})
        console.log("item----", this.item);

    }
    componentWillMount(){
        
       this.GetPost()
    }
    GetPost = ()=> {                                                                                                                                                                                                                                                                                            
        const { callApiGetPost } = this.props
        callApiGetPost(this.item.id).then(dataRes => {
            console.log('dataRes trang chu', dataRes)
            this.setState({
                isLoading: false,
                dataItem: dataRes.data
            })
        })
    }
    onReloadBack = (isReload)=>{
        this.GetPost();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
    }
    

    render (){
        const {navigation, InfoUser} = this.props;
        if (InfoUser.length <= 0){
            return null
        }
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(52, 52, 52, 0.3)'}}>
                    <ActivityIndicator size="large" color="white"/>
                </View>
            );
        }
        return (
            <ScrollView>
                <View>
                    <View style  = {{flexDirection:'row', marginTop: 15}}>
                        <Image style={styles.image_circle}
                               source={
                                   ! InfoUser.userInfo.avatar ? require("../images/noavatar.png") : {
                                       uri:InfoUser.userInfo.avatarUrl
                                   }}
                               resizeMode="cover"
                        >
                        </Image>
                        <View style = {{marginLeft: 10, borderWidth: 1, borderColor: '#cccccc', borderRadius:20, flex:1,justifyContent:'center' ,alignItems:'center'}}>
                            <TouchableOpacity onPress = {()=>this.props.navigation.navigate('TaoBaiViet',{id_category:this.item.id,onReloadBack:this.onReloadBack, })}>
                                <Text>Soạn đăng bản tin cho KĐT</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
                <View style={{height: 3, backgroundColor: '#cccccc', marginTop: 10,}}/>

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
                                onReloadBack ={this.onReloadBack}
                                navigation={navigation}/>
                        )
                    }
                    }
                    keyExtractor={(item, index) => index.toString()}
                    
                />


            </ScrollView>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        InfoUser: state.ProfileReducers
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        callApiGetPost : bindActionCreators(callApiGetPost, dispatch),
    }
};

TrangChu = connect(mapStateToProps, mapDispatchToProps)(TrangChu);
export default TrangChu;
const DEVICE_WIDTH = Dimensions.get('window').width;
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
        },
    image_circle: {
        height: DEVICE_WIDTH / 10,
        width: DEVICE_WIDTH / 10,
        borderRadius: DEVICE_WIDTH / 20,
        marginLeft: 10,
        // marginTop: 10

    },

})