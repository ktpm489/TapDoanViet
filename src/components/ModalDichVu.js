import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TextInput,
    TouchableOpacity
} from 'react-native';

import * as Dimention from '../configs/Dimention'
import * as Const from '../Constants'
import { Pages } from 'react-native-pages';
export default class ModalDichVu extends Component {






    constructor(props) {
        super(props);

        this.state = {
            page1_sellect: true,
            page2_sellect: false,
            page3_sellect: false,


        }

        this.name = '';
        this.phone = '';
        this.address = '';
        this.description = '';
        this.image1 = null;
        this.image2 = null;
        this.image3 = null;
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
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

    render() {
        const { navigation } = this.props;
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
                            <TextInput style={{ backgroundColor: 'white', flex: 1, paddingLeft: 10 }}
                                underlineColorAndroid='transparent'
                                placeholder={"Họ và tên"}
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
                            <TextInput style={{ backgroundColor: 'white', flex: 1, paddingLeft: 10 }}
                                underlineColorAndroid='transparent'
                                placeholder={"Số điện thoại"}
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
                            <TextInput style={{ backgroundColor: 'white', flex: 1, paddingLeft: 10 }}
                                underlineColorAndroid='transparent'
                                placeholder={"Địa chỉ"}
                                onChangeText={(text)=>this.address = text}
                            />

                        </View>


                    </ScrollView>
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
                                    padding:5
                                }}

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
                                
                                >
                                    <Image
                                    source={require('../images/camera.png')}
                                    ref="image1"
                                    style={{ width: (Dimention.DEVICE_WIDTH-100)/3, height: (Dimention.DEVICE_WIDTH-100)/3,  }}

                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                         style={{
                                            marginLeft:10,
                                            borderColor:'grey',borderRadius:4,borderWidth:2,
                                        }}
                                >
                                    <Image
                                    source={require('../images/camera.png')}
                                    ref="image2"
                                    style={{ width: (Dimention.DEVICE_WIDTH-100)/3, height: (Dimention.DEVICE_WIDTH-100)/3 }}

                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                     style={{
                                        marginLeft:10,marginRight:10,
                                        borderColor:'grey',borderRadius:4,borderWidth:2,
                                    }}
                                    onPress={()=>{
                                        
                                        console.log("refer image",this.refs.image3)
                                        this.refs.image3.setNativeProps({
                                            source: require('../images/giasu.png')
                                          })
                                    }}

                                >
                                    <Image
                                    source={require('../images/camera.png')}
                                    ref={"image3"}
                                    style={{ width: (Dimention.DEVICE_WIDTH-100)/3, height: (Dimention.DEVICE_WIDTH-100)/3, }}

                                    />
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                    <ScrollView style={{ flex: 1, backgroundColor:'#cccccc' }} >
                        <Text style={{ alignSelf: 'center', color: 'red', margin: 10, fontSize: 20, fontWeight: '600' }}>Đặt lịch</Text>
                        <View style={{height:1,backgroundColor:'white'}}/>
                        <View>

                        </View>

                    </ScrollView>
                </Pages>
                <TouchableOpacity
                    style={{ height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => {
                        // console.log("page",this.refs.pages)
                        if (this.refs.pages.progress <= 2) {
                            this.refs.pages.scrollToPage(this.refs.pages.progress + 1, true);
                        } else if (this.refs.pages.progress == 3) {
                            this.refs.pages.scrollToPage(this.refs.pages.progress + 1, true);
                        }

                    }}
                >

                    {this.styleButtonBottom()}

                </TouchableOpacity>
            </View>

        )
    }
};


