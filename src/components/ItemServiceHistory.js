import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Alert,
    AsyncStorage
} from 'react-native';

import * as Dimention from '../configs/Dimention'
import * as Const from '../Constants'
import moment from 'moment';
import { BASE_URL, CREATE_REQUEST, UPLOAD_IMAGE, UPDATE_HISTORY,DELETE_SERVICE_REQUEST } from "../Constants";
import PickerImage from "../components/PickerImage"

import logout from '../components/TokenExpired'
export default class ItemServiceHistory extends Component {

    constructor(props) {
        super(props)
        var i1 = require('../images/camera.png');
        this.state = {
            image1: i1,
            dataImage1: null,
            image2: i1,
            dataImage2: null,
            image3: i1,
            dataImage3: null,
        }

        this.countImageUpload = 0;
        this.countImageUploadDone = 0;
        this.urlUpload = "";


    }

    shouldComponentUpdate(nextProps, nextState) {

        return true;
    }


    showPicker = (type) => {
        //console.log("click button type",type);
        PickerImage((source, data) => {
            if (type == 1) {
                this.setState({ image1: source, dataImage1: data })
            }
            else if (type == 2) {
                this.setState({ image2: source, dataImage2: data })
            } else {
                this.setState({ image3: source, dataImage3: data })
            }


        }, true)

    }

    uploadImage = (imgdata) => {
        AsyncStorage.getItem('token').then((value) => {
            fetch(BASE_URL + UPLOAD_IMAGE, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': value,
                },
                body: JSON.stringify({
                    imageData: imgdata,
                    imageType: 'service',
                })

            }).then((response) => {
                return response.json();
            }).then(data => {
                console.log('upload image response', data);
                if (data && data.errorCode == 0) {
                    this.countImageUploadDone++;
                    if (this.urlUpload === "")
                        this.urlUpload = data.data.fileName;
                    else
                        this.urlUpload = this.urlUpload + "," + data.data.fileName;
                    if (this.countImageUploadDone == this.countImageUpload) {
                        console.log("imag invoice",this.urlUpload)
                        this.props.updateStateLoading(false);
                        this.updateStatus(this.props.dataItem.item.id);
                    }
                }
                else if(data.errorCode && data.errorCode === "401"){
                    logout(AsyncStorage,this.props)
                    return;
                }



            }).catch(e => {
                console.log('exception', e)
            })
        });
    }

    updateStatus = (id) => {
        console.log("id",id);
        AsyncStorage.getItem('token').then((value) => {
            fetch(BASE_URL + UPDATE_HISTORY, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': value,
                },
                body: JSON.stringify({
                    id: id,
                    invoice_imgs: this.urlUpload,
                })

            }).then((response) => {
                return response.json();
            }).then(data => {

                console.log("update history", data);
                if (data && data.errorCode == 0) {
                    // this.props.navigation.goBack();
                    this.props.reloadData();
                }else if(data.errorCode && data.errorCode === "401"){
                    logout(AsyncStorage,this.props)
                    return;
                }else{
                    alert(data.message)
                }
            }).catch(e => {
                console.log("exception", e);
            })
        });
    }

    callApiUpdate = () => {
        if (this.state.dataImage1 == null && this.state.dataImage1 == null && this.state.dataImage1 == null) {
            Alert.alert("", "Bạn phải chụp ít nhất một ảnh hóa đơn");
        } else {
            this.props.updateStateLoading(true);
            if (this.state.dataImage1 != null) {
                this.countImageUpload = this.countImageUpload + 1;
                this.uploadImage(this.state.dataImage1);

            }
            if (this.state.dataImage2 != null) {
                this.countImageUpload = this.countImageUpload + 1;
                this.uploadImage(this.state.dataImage2);

            }
            if (this.state.dataImage3 != null) {
                this.countImageUpload = this.countImageUpload + 1;
                this.uploadImage(this.state.dataImage3);

            }
        }
    }


    deleteService = (id)=>{
        AsyncStorage.getItem('token').then((value) => {
            console.log("url",BASE_URL + DELETE_SERVICE_REQUEST+id);
            fetch(BASE_URL + DELETE_SERVICE_REQUEST+id, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': value,
                },
                

            }).then((response) => {
                return response.json();
            }).then(data => {

                console.log("delete item history", data);
                if (data && data.errorCode == 0) {
                    // this.props.navigation.goBack();
                    this.props.reloadData();
                }else if(data.errorCode && data.errorCode === "401"){
                    logout(AsyncStorage,this.props)
                    return;
                }else{
                    alert(data.message)
                }
            }).catch(e => {
                console.log("exception", e);
            })
        });
    }
    render() {

        const { navigation } = this.props;
        const item = this.props.dataItem.item;
        const status = item.done;
        var orderAt = moment(item.orderAt).format("DD-MM-YYYY HH:mm");
        var createdAt = moment(item.createdAt).format("DD-MM-YYYY HH:mm");
        var updatedAt = moment(item.updatedAt).format("DD-MM-YYYY HH:mm");

        var arrImages = [];
        if (item.invoice_imgs_vitrual !== "") {
            arrImages = item.invoice_imgs_vitrual.split(",");
        }

        var imgRender = [];
        for (var i = 0; i < arrImages.length; i++) {
            if(!arrImages[i] ||  arrImages[i]=== "")
                break;

            let url = arrImages[i];
            imgRender.push(<TouchableOpacity

                key={i}
                style={{
                    marginLeft: 10,
                    borderColor: 'grey', borderRadius: 4, borderWidth: 2,
                }}

             onPress={()=>{
                 
                 this.props.navigation.navigate("ShowImage",{url:url})}
             }
            >
                <Image
                    source={{ uri:url }}
                    style={{ width: (Dimention.DEVICE_WIDTH - 100) / 3, height: (Dimention.DEVICE_WIDTH - 100) / 3, }}

                />
            </TouchableOpacity>)
        }



        return (

            <TouchableOpacity
                key={this.props.dataItem.index}
                onPress={() => {
                    //navigation.navigate('DichVuDetail', {dataItem: item});
                }}
            >
                <View

                >
                    <Text >
                        <Text style={{ fontWeight: "bold" }}>Mã đơn hàng: </Text>
                        <Text>0000{this.props.dataItem.index + 1}</Text>
                    </Text>
                    {/* <Text>
                        <Text style={{ fontWeight: "bold" }}>Số điện thoại: </Text>
                        <Text>{item.phoneNumber}</Text>
                    </Text>
                    <Text>
                        <Text style={{ fontWeight: "bold" }}>Địa chỉ: </Text>
                        <Text>{item.address}</Text>
                    </Text> */}
                    <Text>
                        <Text style={{ fontWeight: "bold" }}>Đặt lịch: </Text>
                        <Text>{orderAt}</Text>
                    </Text>
                    <Text>
                        <Text style={{ fontWeight: "bold" }}>{status ?"Hoàn thành:":"Yêu cầu lúc:"} </Text>
                        <Text>{status ?updatedAt:createdAt}</Text>
                    </Text>
                    <Text>
                        <Text style={{ fontWeight: "bold" }}>Dịch vụ đăng ký: </Text>
                        <Text>{!item.service ? "Không xác định" : item.service.serviceName}</Text>
                    </Text>
                    <Text>
                        <Text style={{ fontWeight: "bold" }}>Trạng thái: </Text>
                        <Text style={{ color: 'red' }}>{status ? "Đã thanh toán số tiền như bên dưới" : "Chưa thanh toán"}</Text>
                    </Text>

                    <Text style={{ flex: 1, textAlign: 'center', fontWeight: "bold", marginTop: 10, color: 'blue' }}>{status ? "Ảnh hóa đơn" : "Chụp ảnh hóa đơn để thanh toán"}</Text>


                    <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        {status ? imgRender : <View style={{flexDirection: 'row',flex:1,alignSelf:'center',}} >
                            <TouchableOpacity
                                style={{
                                    marginLeft: 10,
                                    flex:1,
                                    borderColor: 'grey', borderRadius: 4, borderWidth: 2,
                                }}

                                onPress={() => this.showPicker(1)}
                            >
                                <Image
                                    source={this.state.image1}
                                    ref="image1"
                                    style={{ width: (Dimention.DEVICE_WIDTH - 100) / 3, height: (Dimention.DEVICE_WIDTH - 100) / 3, }}

                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    marginLeft: 10,
                                    flex:1,
                                    borderColor: 'grey', borderRadius: 4, borderWidth: 2,
                                }}
                                onPress={() => this.showPicker(2)}
                            >
                                <Image
                                    source={this.state.image2}
                                    ref="image2"
                                    style={{ width: (Dimention.DEVICE_WIDTH - 100) / 3, height: (Dimention.DEVICE_WIDTH - 100) / 3 }}

                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    marginLeft: 10, marginRight: 10,
                                    flex:1,
                                    borderColor: 'grey', borderRadius: 4, borderWidth: 2,
                                }}
                                onPress={() => this.showPicker(3)}

                            >
                                <Image
                                    source={this.state.image3}
                                    ref={"image3"}
                                    style={{ width: (Dimention.DEVICE_WIDTH - 100) / 3, height: (Dimention.DEVICE_WIDTH - 100) / 3, }}

                                />
                            </TouchableOpacity>
                        </View>
                        }
                    </View>
                    {status ? null :
                    <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#FF9800', alignSelf: 'center', padding: 10,
                                borderRadius: 5,
                                borderColor: '#FF9800',
                                shadowColor: '#FF9800',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.8,
                                margin: 10,
                                flex:1
                            }}

                            onPress={() => {
                                this.callApiUpdate();
                            }}
                        >
                            <Text
                            style={{flex:1,textAlign:'center'}}
                            >Cập nhật thanh toán</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                backgroundColor: '#FF9800', alignSelf: 'center', padding: 10,
                                borderRadius: 5,
                                borderColor: '#FF9800',
                                shadowColor: '#FF9800',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.8,
                                margin: 10,
                                flex:1
                            }}

                            onPress={() => {
                                this.deleteService(this.props.dataItem.item.id);
                            }}
                        >
                            <Text
                            style={{flex:1,textAlign:'center'}}
                            >Xóa yêu cầu</Text>
                        </TouchableOpacity>

                        </View>
                    }
                    <View style={{ height: 1, backgroundColor: 'gray', margin: 10 }}></View>


                </View>

            </TouchableOpacity>)
    }
};
const myStyle = StyleSheet.create({
    image_circle: {
        height: Dimention.DEVICE_WIDTH / 6,
        width: Dimention.DEVICE_WIDTH / 6,
        borderRadius: Dimention.DEVICE_WIDTH / 12,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        marginTop: 10

    }
})