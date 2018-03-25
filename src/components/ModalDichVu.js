import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
    FlatList
} from 'react-native';

import * as Dimention from '../configs/Dimention'
import * as Const from '../Constants'
import { Pages } from 'react-native-pages';
import PickerImage from "../components/PickerImage"
import SelectDate from'../components/SelectDate';
import {BASE_URL, CREATE_REQUEST, UPLOAD_IMAGE} from "../Constants";

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

class ModalDichVu extends Component {






    constructor(props) {
        super(props);

        var i1 = require('../images/camera.png');
        this.state = {
            page1_sellect: true,
            page2_sellect: false,
            page3_sellect: false,
            image1:i1,
            dataImage1:null,
            image2:i1,
            dataImage2:null,
            image3:i1,
            dataImage3:null,
            
            
            

        }

        this.name = '';
        this.phone = '';
        this.address = '';
        this.description = '';
        this.fullDate = '';
        this.countImageUpload = 0;
        this.countImageUploadDone = 0;
        this.urlUpload = "";
       
        
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true
    }


    styleButton = (page_select) => {
        if (page_select) {
            return { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }
        } else {
            return { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }
        }
    }

    styleButtonBottom = () => {


        if (this.state.page3_sellect) {
            return (
                <Text style={{ color: 'blue', fontSize: 20, flexShrink: 1 }}>Gửi</Text>
            )
        } else {
            return (
                <Text style={{ color: 'red', fontSize: 20, flexShrink: 1 }}>Tiếp theo</Text>
            )
        }
    }

    setCurrentPage = (pageIndex) => {
        if (pageIndex == 0) {
            this.setState({
                page1_sellect: true,
                page2_sellect: false,
                page3_sellect: false,


            })
        } else if (pageIndex == 1) {
            this.setState({
                page1_sellect: false,
                page2_sellect: true,
                page3_sellect: false,


            })
        } else if (pageIndex == 2) {
            this.setState({
                page1_sellect: false,
                page2_sellect: false,
                page3_sellect: true,


            })
        }
    }

    showPicker = (type)=>{
        //console.log("click button type",type);
        PickerImage((source, data) => {
            if(type == 1){
                this.setState({image1: source, dataImage1: data})
                }   
            else if(type == 2){
                this.setState({image2: source, dataImage2: data})
            }else{
                this.setState({image3: source, dataImage3: data})
            }
        },true)
        
    }

    render() {
        const { navigation } = this.props;
        if(this.props.userInfo && this.props.userInfo.userInfo){
            const userInfo = this.props.userInfo.userInfo;
            this.name = userInfo.firstName;
            console.log("userInfo",userInfo);
        }
        return (
            <View style={{ flex: 1 }}>
                <View style={{ height: 50, flexDirection: 'row' }} >
                    <TouchableOpacity style={this.styleButton(this.state.page1_sellect)}
                        onPress={() => {
                            this.refs.pages.scrollToPage(0, true)

                        }}
                    >
                        <Text>Bước 1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={this.styleButton(this.state.page2_sellect)}
                        onPress={() => {
                            this.refs.pages.scrollToPage(1, true)


                        }}
                    >
                        <Text>Bước 2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={this.styleButton(this.state.page3_sellect)}
                        onPress={() => {
                            this.refs.pages.scrollToPage(2, true)


                        }}
                    >
                        <Text>Bước 3</Text>
                    </TouchableOpacity>

                </View>
                <Pages style={{ flex: 1 ,backgroundColor:'#cccccc'}}
                    ref={"pages"}
                    indicatorColor={'rgba(0, 0, 0, 0)'}
                    onScrollEnd={(index) => {

                        this.setCurrentPage(index);

                    }}>
                    <ScrollView style={{ flex: 1, }} >
                        <Text style={{ alignSelf: 'center', color: 'red', margin: 10, fontSize: 20, fontWeight: '600' }}>Thông tin khách hàng</Text>
                        <View style={{
                            borderWidth: 1,
                            borderRadius: 5,
                            borderColor: 'white',
                            shadowColor: '#000',
                            margin: 10,
                            backgroundColor: 'grey',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
                        }}>
                            <Image
                                source={require('../images/info.png')}
                                style={{ width: 25, height: 25, margin: 10, }}

                            />
                            <TextInput style={{ backgroundColor: 'white', flex: 1, paddingLeft: 10,alignSelf:'stretch' }}
                                underlineColorAndroid='transparent'
                                placeholder={"Họ và tên"}
                                value={this.name}
                                onChangeText={(text)=>this.name = text}
                            />

                        </View>

                        <View style={{
                            borderWidth: 1,
                            borderRadius: 5,
                            borderColor: 'white',
                            shadowColor: '#000',
                            margin: 10,
                            backgroundColor: 'grey',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
                        }}>
                            <Image
                                source={require('../images/phone_white.png')}
                                style={{ width: 25, height: 25, margin: 10, }}

                            />
                            <TextInput style={{ backgroundColor: 'white', flex: 1, paddingLeft: 10,alignSelf:'stretch' }}
                                underlineColorAndroid='transparent'
                                placeholder={"Số điện thoại"}
                                keyboardType='numeric'
                                onChangeText={(text)=>this.phone = text}
                            />

                        </View>


                        <View style={{
                            borderWidth: 1,
                            borderRadius: 5,
                            borderColor: 'white',
                            shadowColor: '#000',
                            margin: 10,
                            backgroundColor: 'grey',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
                        }}>
                            <Image
                                source={require('../images/location.png')}
                                style={{ width: 25, height: 25, margin: 10, }}

                            />
                            <TextInput style={{ backgroundColor: 'white', flex: 1, paddingLeft: 10,alignSelf:'stretch' }}
                                underlineColorAndroid='transparent'
                                placeholder={"Địa chỉ"}
                                onChangeText={(text)=>this.address = text}
                            />

                        </View>


                    </ScrollView>
                    
                    <View style={{ flex: 1, backgroundColor:'#cccccc' }} >
                    <SelectDate

                        ref="SelectDate"
                        
                        />
                         

                    </View>
                    <View style={{ flex: 1, backgroundColor:'#cccccc'}} >
                        <ScrollView >
                            <TextInput 
                                style={{
                                    borderWidth: 1,
                                    borderRadius: 5,
                                    borderColor: 'white',
                                    shadowColor: '#000',
                                    margin: 10,
                                    flex:1,
                                    backgroundColor: 'white',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.8,
                                    padding:5,
                                    minHeight:100,
                                    alignSelf:'stretch'
                                }}
                                onChangeText={(text)=>this.description = text}
                                multiline={true}
                                numberOfLines={5}
                                placeholder={"Thêm thông tin mô tả rõ hơn yêu cầu của bạn..."}

                            />
                            <Text style={{marginLeft:10,fontSize:16,fontWeight:'600'}}>Thêm ảnh mô tả</Text>
                            <View style={{marginTop:10,flexDirection:'row'}}>
                                <TouchableOpacity
                                    style={{
                                        marginLeft:10,
                                        borderColor:'grey',borderRadius:4,borderWidth:2,
                                    }}
                                
                                    onPress={()=>this.showPicker(1)}
                                >
                                    <Image
                                    source={this.state.image1}
                                    ref="image1"
                                    style={{ width: (Dimention.DEVICE_WIDTH-100)/3, height: (Dimention.DEVICE_WIDTH-100)/3,  }}

                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                         style={{
                                            marginLeft:10,
                                            borderColor:'grey',borderRadius:4,borderWidth:2,
                                        }}
                                        onPress={()=>this.showPicker(2)}
                                >
                                    <Image
                                    source={this.state.image2}
                                    ref="image2"
                                    style={{ width: (Dimention.DEVICE_WIDTH-100)/3, height: (Dimention.DEVICE_WIDTH-100)/3 }}

                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                     style={{
                                        marginLeft:10,marginRight:10,
                                        borderColor:'grey',borderRadius:4,borderWidth:2,
                                    }}
                                    onPress={()=>this.showPicker(3)}

                                >
                                    <Image
                                    source={this.state.image3}
                                    ref={"image3"}
                                    style={{ width: (Dimention.DEVICE_WIDTH-100)/3, height: (Dimention.DEVICE_WIDTH-100)/3, }}

                                    />
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </Pages>
                <TouchableOpacity
                    style={{ height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => {
                        // console.log("page",this.refs.pages)
                        // console.log("ref",this.refs.SelectDate)
                        if (this.refs.pages.progress < 2) {
                        
                            this.refs.pages.scrollToPage(this.refs.pages.progress + 1, true);
                        } else if (this.refs.pages.progress == 2) {
                            if(this.refs.SelectDate.date && this.refs.SelectDate.date !=="" && this.refs.SelectDate.hourSelect &&  this.refs.SelectDate.hourSelect !== "" ){
                                
                                var objDate = this.refs.SelectDate.date;
                                var objHour = this.refs.SelectDate.hourSelect;
                                this.fullDate = objDate.year+"-"+objDate.month+"-"+objDate.date+" "+objHour.time;
                            }else{
                                alert("Bạn chưa chọn thời gian đặt lịch");
                                return 0;
                            }

                            if(this.name === "" || this.phone === "" || this.address == "" ){
                                alert("Bạn phải nhập đầy đủ thông tin");
                                return 0;
                            }

                            if(this.description === ""){
                                alert("Bạn phải nhập mô tả");
                                return 0;
                            }

                        //    console.log("name ",this.name);
                        //    console.log("phone ",this.phone);
                        //    console.log("address ",this.address);
                        //    console.log("description ",this.description);
                        //    console.log("fullDate ",this.fullDate);
                           this.callApiRegister();
                           this.props.closeModal();
                        }

                    }}
                >

                    {this.styleButtonBottom()}

                </TouchableOpacity>
            </View>

        )
    }



    uploadImage = (imgdata)=>{
        AsyncStorage.getItem('token').then((value)=> {
            fetch(BASE_URL + UPLOAD_IMAGE, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': value,
                },
                body: JSON.stringify({
                    imageData: imgdata,
                    imageType: 'post',
                })

            }).then((response) => {
                return response.json();
            }).then(data => {
                console.log('upload image response', data);
                if(data && data.errorCode == 0){
                    this.countImageUploadDone++;
                    if(this.urlUpload === "")
                        this.urlUpload = data.data.imageUrl;
                    else
                        this.urlUpload = this.urlUpload +","+data.data.imageUrl;
                    if(this.countImageUploadDone == this.countImageUpload){
                        this.sendInfoToServer();
                    }
                }


               
            }).catch(e => {
                console.log('exception',e)
            })
        });
    }

    callApiRegister = ()=>{
        if(this.state.dataImage1 != null){
            this.uploadImage(this.state.dataImage1);
            this.countImageUpload = this.countImageUpload+1;
        }
        if(this.state.dataImage2 != null){
            this.uploadImage(this.state.dataImage2);
            this.countImageUpload = this.countImageUpload+1;
        }
        if(this.state.dataImage3 != null){
            this.uploadImage(this.state.dataImage3);
            this.countImageUpload = this.countImageUpload+1;
        }

    }

    sendInfoToServer=()=>{

        console.log("url_image",this.urlUpload);
        
        AsyncStorage.getItem('token').then((value)=> {
            fetch(BASE_URL + CREATE_REQUEST, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': value,
                },
                body: JSON.stringify({
                    
                        fullName: this.name,
                        phoneNumber: this.phone,
                        address: this.address,
                        images: this.urlUpload,
                        description: this.description,
                        serviceId: this.props.id_dichvu,
                        orderAt: '2018-03-22 08:00'
                        
                })

            }).then((response) => {
                return response.json();
            }).then(data => {
                console.log('create service response', data);
                if(data && data.errorCode == 0){
                    alert("Gửi yêu cầu thành công")
                }else{
                    alert(data.message);
                }

            }).catch(e => {
                console.log('exception',e)
            })
        });


       


    }

};
const mapStateToProps = (state) => {
    console.log("state redux:",state);
    return {
        userInfo: state.ProfileReducers,
        
    }
};

const mapDispatchToProps = (dispatch) => {

    return {
       

    }
};

ModalDichVu = connect(mapStateToProps, mapDispatchToProps)(ModalDichVu);

export default ModalDichVu

