import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    Picker,
    TouchableOpacity,
    AsyncStorage,
    ActivityIndicator
} from 'react-native';

import * as Dimention from '../configs/Dimention'
import PhiDichVuItem from '../components/PhiDichVuItem'
import Modal from 'react-native-modalbox';
import { BASE_URL, COST } from "../Constants";
import logout from '../components/TokenExpired'
export default class PhiDichVu extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            title: 'Phí Dịch Vụ',
            headerStyle: { backgroundColor: '#23b34c' },
            headerTitleStyle: { color: 'white' },
            headerTintColor: 'white',

        }
    }

    constructor(props) {
        super(props);

        this.arrYear = [];
        let currentDate = new Date();
        this.arrYear.push(currentDate.getFullYear());
        this.arrYear.push(currentDate.getFullYear() - 1);
        this.arrYear.push(currentDate.getFullYear() - 2);

        this.state = {
            dataSum:[],
            listDepartment: [],
            listCost:[],
            departmebtSelect: "Chọn căn hộ",
            yearSelect: this.arrYear[0],
            isLoading: false,
            clickOpenDialogType: 1
        }





    }

    callApiChiPhi = (year_select) => {
        // console.log("yearrrrrrrr=======", year_select);
        this.setState({ isLoading: true,dataSum:[],listDepartment:[],listCost:[] })
        console.log('url',BASE_URL + COST + year_select);
        AsyncStorage.getItem('token').then((value) => {
            fetch(BASE_URL + COST + year_select, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': value,
                },


            }).then((response) => {
                return response.json();
            }).then(data => {
                console.log('get list chi phi: ', data);
                if (data && data.errorCode == 0) {
                    let listDepartment = [];
                    let departmebtSelect = "Chọn căn hộ";
                    if (data.data && data.data.length > 0) {
                        listDepartment = data.data.map((item, i) => {
                            return item.apartment.apartmentName;
                        })
                        departmebtSelect = listDepartment[0];
                    }
                    this.setState({ isLoading: false, 
                        dataSum: data.data, listDepartment: listDepartment, 
                        departmebtSelect: departmebtSelect,
                        listCost:(data.data)[0].costs
                    })
                } else if(data.errorCode && data.errorCode === "401"){
                    logout(AsyncStorage,this.props)
                    return;
                }else {
                    this.setState({ isLoading: false })
                }



            }).catch(e => {
                console.log('exception', e)
                this.setState({ isLoading: false })
            })
        });
    }
    componentWillMount() {
        this.callApiChiPhi(this.state.yearSelect);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;

    }





    renderModalContent = (arrData) => {


        // console.log("arr",arrData);
        // console.log("type",this.state.clickOpenDialogType);
        let sourceItems = arrData.map((s, i) => {

            return <View key={i} style={{ flex: 1, flexDirection: 'column' }}>
                <TouchableOpacity
                    style={{ justifyContent: 'center', alignItems: 'center', flex: 1, minHeight: 40 }}
                    onPress={() => {

                        this.refs.modal.close();


                        if (this.state.clickOpenDialogType === 1) {
                            if (this.state.yearSelect !== s) {
                                this.setState({ yearSelect: s });
                                this.callApiChiPhi(s);
                            }
                        }
                        else if (this.state.clickOpenDialogType === 2){
                            
                            let index = this.state.listDepartment.indexOf(s);
                            if(index > -1){
                                this.setState({ departmebtSelect: s,listCost:this.state.dataSum[index].costs });
                            }

                        }

                       
                    }}

                >
                    <Text>{s}</Text>

                </TouchableOpacity>
                <View style={{ height: 1, backgroundColor: 'gray' }}></View>
            </View>

        });
        return sourceItems;


    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ backgroundColor: "green", flexDirection: 'row', margin: 10, justifyContent: 'center', alignItems: 'center', minHeight: 40 }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', marginRight: 10, marginLeft: 10, fontSize: 16, width: 60 }}>Năm: </Text>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({ clickOpenDialogType: 1 });
                            this.refs.modal.open()

                        }}

                        style={{ flex: 1, backgroundColor: 'white', marginRight: 5, minHeight: 30, justifyContent: 'center' }}
                    >
                        <Text style={{ marginLeft: 10 }}>{this.state.yearSelect}</Text>
                    </TouchableOpacity>


                </View>
                <View style={{ backgroundColor: "green", flexDirection: 'row', marginLeft: 10, marginRight: 10, justifyContent: 'center', alignItems: 'center', minHeight: 40 }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', marginRight: 10, marginLeft: 10, fontSize: 16, width: 60 }}>Căn hộ: </Text>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({ clickOpenDialogType: 2 });
                            this.refs.modal.open()
                        }}

                        style={{ flex: 1, backgroundColor: 'white', marginRight: 5, minHeight: 30, justifyContent: 'center' }}
                    >
                        <Text style={{ marginLeft: 10 }}>{this.state.departmebtSelect}</Text>
                    </TouchableOpacity>


                </View>


                <FlatList
                    data={this.state.listCost}
                    extraData={this.state.listCost}
                    renderItem={(item) => {
                        return (
                            <PhiDichVuItem

                                dataItem={item}


                            />
                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}

                />
                <Modal style={{
                    height: this.state.clickOpenDialogType === 2 ? this.state.listDepartment.length * 40 : this.arrYear.length * 40,
                    width: Dimention.DEVICE_WIDTH - 50,

                }}
                    swipeArea={20}
                    position={"center"} ref={"modal"} isDisabled={false}
                    onClosed={() => {
                        this.setState({ clickOpenDialogType: 0 });
                    }}

                >
                    {this.state.clickOpenDialogType === 2 ? this.renderModalContent(this.state.listDepartment) : this.renderModalContent(this.arrYear)}
                </Modal>
                {this.state.isLoading ?
                    <View style={{ top: -10, bottom: -10, left: -10, right: -10, justifyContent: 'center', alignItems: 'center', position: 'absolute', zIndex: 1, backgroundColor: 'rgba(52, 52, 52, 0.3)' }}>
                        <ActivityIndicator size="large" color="green" />
                    </View> : null
                }
            </View>
        )

    }


    componentDidMount() {
    }

    componentDidUpdate() {
    }

}
