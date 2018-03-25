import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    AsyncStorage,
    StyleSheet,
    Image
} from 'react-native';
import ItemLeftMenu from "../components/ItemLeftMenu";
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import images from "../components/images";

class MenuLeft extends Component {
    Logout() {
        AsyncStorage.removeItem('token')
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: 'Login',
                }),
            ]
        });
        this.props.navigation.dispatch(resetAction)
    }
    render (){
        return(
            <View style = {{flexDirection:'column', backgroundColor:'white', flex:1}}>
                <View style = {{alignItems:'center', justifyContent:'center', minHeight:130, flex:1}}>
                    <Icon name="user-circle" size={70} color="#424242" />
                    <Text style = {{fontSize: 25, fontWeight: 'bold', color: '#212121', marginTop:10}}>Nguyễn Văn A</Text>
                </View>
                <View style = {{backgroundColor:'#eaa33f', flex:5}}>
                    <ItemLeftMenu title ="Thông tin cá nhân"
                                  source = {images.info}
                                  onPress = {()=> this.props.navigation.navigate('ThongTinCaNhan')}
                    />
                    <ItemLeftMenu title ="Chi Phí"
                                  source = {images.tienich}
                                  onPress = {() => this.props.navigation.navigate('PhiDichVu')}
                    />

                    <ItemLeftMenu title ="Dịch vụ"
                                  source = {images.info}
                                  onPress = {()=>this.props.navigation.navigate('DichVu')}
                    />
                    <ItemLeftMenu title ="Lịch sử yêu cầu dịch vụ"
                                  source = {images.info}
                                  onPress = {()=>this.props.navigation.navigate('ServiceHistory')}
                    />
                    <ItemLeftMenu title ="Tiện Ích"
                                  source = {images.tienich}
                                  onPress = {()=>this.props.navigation.navigate('TienIch')}
                    />

                    <ItemLeftMenu title ="Báo cáo khẩn cấp"
                                  source = {images.baocao}
                                  onPress = {()=> this.props.navigation.navigate('BaoCaoKhanCap')}
                    />

                    <ItemLeftMenu title ="Góp ý phản hồi"
                                  source = {images.gopy}
                                  onPress = {()=> this.props.navigation.navigate('GopYPhanHoi')}
                    />
                    <TouchableOpacity
                        onPress = {this.Logout.bind(this)}
                        style={{flexDirection: 'row',marginTop:20, marginBottom:20}}>
                        <View style = {{marginLeft: 5, flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Image style = {styles.img}
                                   source={images.logout}
                            />
                        </View>
                        <Text style={{flex:5, fontSize:17, color:'white'}}>Đăng xuất</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}
export default MenuLeft;
const styles = StyleSheet.create({
    img : {
        height:25,
        width:25,
    }
})