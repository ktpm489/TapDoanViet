import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    AsyncStorage,
    StyleSheet,
    Image,
    
} from 'react-native';
import Modal from "react-native-modal";
import ItemLeftMenu from "../components/ItemLeftMenu";
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import images from "../components/images";

class MenuLeft extends Component {
    constructor(props){
        super(props)
        this.state = {
            visibleModal: null
        };
    }
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
            <ScrollView style ={{backgroundColor:'#eaa33f'}}>
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
                                  source = {images.chiphi}
                                  onPress = {() => this.props.navigation.navigate('PhiDichVu')}
                    />
                    <ItemLeftMenu title ="Lịch sử yêu cầu dịch vụ"
                                  source = {images.lichsu}
                                  onPress = {()=>this.props.navigation.navigate('ServiceHistory')}
                    />
                    <ItemLeftMenu title ="Tiện ích"
                                  source = {images.tienich}
                                  onPress = {()=>this.props.navigation.navigate('TienIch')}
                    />

                    {/*<ItemLeftMenu title ="Báo cáo khẩn cấp"*/}
                                  {/*source = {images.baocao}*/}
                                  {/*onPress = {()=> this.props.navigation.navigate('BaoCaoKhanCap')}*/}
                    {/*/>*/}

                    <ItemLeftMenu title ="Báo cáo sai phạm"
                                  source = {images.gopy}
                                  onPress = {()=> this.props.navigation.navigate('GopYPhanHoi')}
                    />


                    <ItemLeftMenu title ="Điều khoản"
                                  source = {images.baocao}
                                  onPress = {()=> this.props.navigation.navigate('DieuKhoan')}
                    />
                    <ItemLeftMenu title ="Về chúng tôi"
                                  source = {images.vechungtoi}
                                  onPress = {()=> this.props.navigation.navigate('AboutUs')}
                    />
                    {/* <ItemLeftMenu title ="Chia sẻ"
                                  source = {images.chiase}
                                  onPress = {()=> alert("click chia sẻ")}
                    /> */}
                    <TouchableOpacity
                        // onPress = {this.Logout.bind(this)}
                        onPress = {()=> this.setState({ visibleModal: 5 })}
                        style={{flexDirection: 'row',marginTop:20, marginBottom:20}}>
                        <View style = {{marginLeft: 5, flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Image style = {styles.img}
                                   source={images.logout}
                            />
                        </View>
                        <Text style={{flex:5, fontSize:17, color:'white'}}>Đăng xuất</Text>
                    </TouchableOpacity>
                </View>
                {/*<Modal*/}
                    {/*isVisible={this.state.visibleModal === 5}*/}
                    {/*style={styles.bottomModal}*/}
                {/*>*/}
                    {/*<View>*/}
                        {/*<TouchableOpacity onPress =  {()=> {*/}
                            {/*AsyncStorage.removeItem('token')*/}
                            {/*const resetAction = NavigationActions.reset({*/}
                                {/*index: 0,*/}
                                {/*actions: [*/}
                                    {/*NavigationActions.navigate({*/}
                                        {/*routeName: 'Login',*/}
                                    {/*}),*/}
                                {/*]*/}
                            {/*});*/}
                            {/*this.props.navigation.dispatch(resetAction)}}>*/}
                            {/*<View style = {styles.modalContent}>*/}
                                {/*<Text style = {{fontSize:11}}>Bạn có muốn đăng xuất tài khoản này?</Text>*/}
                                {/*<View style = {{height:1, backgroundColor: 'red'}}/>*/}
                                {/*<Text style = {{color: 'red', fontSize:18, marginTop: 15}}>*/}
                                    {/*Đăng xuất*/}
                                {/*</Text>*/}
                            {/*</View>*/}
                        {/*</TouchableOpacity>*/}
                        {/*<TouchableOpacity onPress = { ()=> this.setState({ visibleModal: null })}>*/}
                            {/*<View style = {[styles.modalContent, {marginTop: 10}]}>*/}
                                {/*<Text style = {{fontSize:18, color: '#2196F3'}}>*/}
                                    {/*Hủy*/}
                                {/*</Text>*/}
                            {/*</View>*/}
                        {/*</TouchableOpacity>*/}
                    {/*</View>*/}
                {/*</Modal>*/}
                <Modal
                    isVisible={this.state.visibleModal === 5}
                    style={styles.bottomModal}
                >
                    <View>
                        <TouchableOpacity onPress =  {()=> {
                            this.setState({ visibleModal: null })
                            // this.UnSubcribe()
                            AsyncStorage.removeItem('token')
                            const resetAction = NavigationActions.reset({
                                index: 0,
                                actions: [
                                    NavigationActions.navigate({
                                        routeName: 'Login',
                                    }),
                                ]
                            });
                            this.props.navigation.dispatch(resetAction)}}>
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
export default MenuLeft;
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
    }
})