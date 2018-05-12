import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    AsyncStorage,
    StyleSheet,
    Image, Alert,
    Share

} from 'react-native';
import Dimensions from 'Dimensions';
import Modal from "react-native-modal";
import ItemLeftMenu from "../components/ItemLeftMenu";
import { NavigationActions } from 'react-navigation';
import images from "../components/images";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {LogoutReducers} from '../reducers'
import {BASE_URL, DELETE_TOKEN_FIREBASE,GET_ADMIN,LOGOUT} from "../Constants";
class MenuLeft extends Component {
    constructor(props){
        super(props)
        this.state = {
            visibleModal: null
        };
    }
    DeteleTokenFirebase = () => {
        console.log("deletetoken")
        AsyncStorage.getItem("token").then(value => {
            AsyncStorage.getItem("token_firebase").then(value_firebase => {
                fetch(BASE_URL + DELETE_TOKEN_FIREBASE + value_firebase, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": value
                    },
                }).then(response => {
                    return response.json()
                }).then(data => {
                    console.log('datamenuleft', data)

                }).catch(e => {
                    console.log("exception", e);
                });
            })
        })
    }


    callApiLogout = () => {
        
        AsyncStorage.getItem("token").then(value => {
            
                fetch(BASE_URL + LOGOUT, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": value
                    },
                }).then(response => {
                    return response.json()
                }).then(data => {
                    console.log('logout success', data)

                }).catch(e => {
                    console.log("exception", e);
                });
            })
    
    }

    chatAdmin = ()=>{
        if(this.props.admin && this.props.admin.adminInfo && this.props.admin.adminInfo.data && this.props.admin.adminInfo.data.id){
            this.props.navigation.navigate('Chat', {dataUser: this.props.admin.adminInfo.data});
        }else{
            Alert.alert("Thông báo","Không tìm thấy admin");
        }
    }


    ShareMessage=()=>
    {
            Share.share(
            {
                
                title: "Chia sẻ",
                message: "http://homesun.vn",
            
            }).then(result => console.log("share result",result)).catch(errorMsg => console.log("share error",errorMsg));
    }

    renderHeader = ()=>{
        const {InfoUser } = this.props
        var hasInfo = true;
        if (InfoUser.length <= 0){
            hasInfo = false;
        }
            return (
                    <View style = {{alignItems:'center', justifyContent:'center', minHeight:130, flex:1}}>
                    <Image style={styles.image_circle}
                        source={!hasInfo || 
                            ! InfoUser.userInfo.avatar ? require("../images/noavatar.png") : {
                                uri:InfoUser.userInfo.avatarUrl
                            }}
                        resizeMode="cover"
                    >
                    </Image>
                    <Text style = {{fontSize: 25, fontWeight: 'bold', color: '#212121', marginTop:5}}>{hasInfo?InfoUser.userInfo.firstName:''} {hasInfo?InfoUser.userInfo.lastName:''}</Text>
                </View>
            )
        

    }

    render (){
       
        return(
            <ScrollView style ={{backgroundColor:'#fc9b03'}}>
            <View style = {{flexDirection:'column', backgroundColor:'white', flex:1}}>
               {this.renderHeader()}
                <View style = {{backgroundColor:'#fc9b03', flex:5, marginTop: 10}}>
                    <ItemLeftMenu title ="Thông tin cá nhân"
                                  source = {images.info}
                                  onPress = {()=> {
                                        this.props.navigation.navigate('DrawerClose')
                                        this.props.navigation.navigate('ThongTinCaNhan')

                                    }}
                    />
                    <ItemLeftMenu title ="Thông báo chi Phí"
                                  source = {images.chiphi}
                                  onPress = {() => {
                                    this.props.navigation.navigate('DrawerClose')
                                      this.props.navigation.navigate('PhiDichVu')
                                    }}
                    />
                    <ItemLeftMenu title ="Đã đặt - Thanh toán dịch vụ"
                                  source = {images.lichsu}
                                  onPress = {()=>{
                                        this.props.navigation.navigate('DrawerClose')
                                      this.props.navigation.navigate('ServiceHistory')
                                    }}
                    />
                    <ItemLeftMenu title ="Tiện ích"
                                  source = {images.tienich}
                                  onPress = {()=>{
                                    this.props.navigation.navigate('DrawerClose')
                                      this.props.navigation.navigate('TienIchCateGory')
                                    
                                    }}
                    />

                    {/*<ItemLeftMenu title ="Báo cáo khẩn cấp"*/}
                                  {/*source = {images.baocao}*/}
                                  {/*onPress = {()=> this.props.navigation.navigate('BaoCaoKhanCap')}*/}
                    {/*/>*/}

                    <ItemLeftMenu title ="Báo cáo sai phạm"
                                  source = {images.gopy}
                                  onPress = {()=> {
                                    this.props.navigation.navigate('DrawerClose')
                                      this.props.navigation.navigate('GopYPhanHoi')
                                    }}
                    />
                    <ItemLeftMenu title ="Báo Cháy"
                                  source = {images.gopy}
                                  onPress = {()=> {
                                    this.props.navigation.navigate('DrawerClose')
                                      this.props.navigation.navigate('BaoChay')
                                    }}
                    />


                    <ItemLeftMenu title ="Điều khoản"
                                  source = {images.baocao}
                                  onPress = {()=> {
                                    this.props.navigation.navigate('DrawerClose')
                                      this.props.navigation.navigate('DieuKhoan')
                                  }
                                    }
                    />
                    <ItemLeftMenu title ="Về chúng tôi"
                                  source = {images.vechungtoi}
                                  onPress = {()=> {
                                    this.props.navigation.navigate('DrawerClose')
                                      this.props.navigation.navigate('AboutUs')
                                    }}
                    />
                    <ItemLeftMenu title ="Chia sẻ"
                                  source = {images.chiase}
                                  onPress = {()=> {
                                    this.props.navigation.navigate('DrawerClose')
                                      this.ShareMessage()
                                    
                                    }}
                    />
                    <ItemLeftMenu title ="Chat với Ban Quản Trị"
                                  source = {images.admin}
                                  onPress = {()=> {
                                    this.props.navigation.navigate('DrawerClose')
                                      this.chatAdmin()
                                    }}
                    />
                    <TouchableOpacity
                        onPress = {()=> {

                            this.DeteleTokenFirebase()
                            this.callApiLogout();
                            this.props.navigation.navigate('DrawerClose')
                            this.setState({ visibleModal: 5 })
                        }}
                        style={{flexDirection: 'row',marginTop:20, marginBottom:20}}>
                        <View style = {{marginLeft: 5, flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Image style = {styles.img}
                                   source={images.logout}
                            />
                        </View>
                        <Text style={{flex:5, fontSize:17, color:'white'}}>Đăng xuất</Text>
                    </TouchableOpacity>
                </View>
                <Modal
                    isVisible={this.state.visibleModal === 5}
                    style={styles.bottomModal}
                >
                    <View>
                        <TouchableOpacity onPress =  {()=> {
                            this.setState({ visibleModal: null })
                            // this.UnSubcribe()
                            AsyncStorage.removeItem('token')
                            LogoutReducers([],{type:'LOGOUT'});
                            const resetAction = NavigationActions.reset({
                                index: 0,
                                actions: [
                                    NavigationActions.navigate({
                                        routeName: 'Login',
                                    }),
                                ]
                            });
                            this.props.navigation.dispatch(resetAction)
                                
                            }}>
                            <View style = {styles.modalContent}>
                                <Text style = {{fontSize:11}}>Bạn có muốn đăng xuất tài khoản này?</Text>
                                <View style = {{height:1, backgroundColor: 'red'}}/>
                                <Text style = {{color: 'red', fontSize:18, marginTop: 15}}>
                                    Đăng xuất
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = { ()=> this.setState({ visibleModal: null })}>
                            <View style = {[styles.modalContent, {marginTop: 10}]}>
                                <Text style = {{fontSize:18, color: '#2196F3'}}>
                                    Hủy
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Modal>

            </View>
            </ScrollView>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        LogoutReducers: state.LogoutReducers,
        InfoUser: state.ProfileReducers,
        admin:state.GetAdminReducers
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        // addTodo: bindActionCreators(addTodo, dispatch),
        // callResetRedux: bindActionCreators(resetRedux, dispatch)
    }
};

MenuLeft = connect(mapStateToProps, mapDispatchToProps)(MenuLeft);

export default MenuLeft;
const DEVICE_WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
    img : {
        height:25,
        width:25,
    },
    modalContent: {
        flexDirection:'column',
        backgroundColor: "white",
        padding: 22,
        // justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginHorizontal: 10,
        borderColor: "rgba(0, 0, 0, 0.1)"
    },
    button: {
        backgroundColor: "lightblue",
        padding: 12,
        margin: 16,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)"
    },
    bottomModal: {
        justifyContent: "flex-end",
        margin: 0
    },
    image_circle: {
        height: DEVICE_WIDTH / 3,
        width: DEVICE_WIDTH / 3,
        borderRadius: DEVICE_WIDTH / 6,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        marginTop: 20

    },
})