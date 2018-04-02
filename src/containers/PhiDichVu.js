import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    Picker,
    TouchableOpacity
} from 'react-native';

import * as Dimention from '../configs/Dimention'
import PhiDichVuItem from '../components/PhiDichVuItem'
import Modal from 'react-native-modalbox';
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

        this.state = {
            listPhiThanhToan: [
                {
                    time: 'Tháng 4/2017',
                    status: 'Chưa thanh toán',
                    total_cost: 1665000,
                    details: [
                        {
                            icon: 'abc.jpg',
                            name_chiphi: 'Phí dịch vụ',
                            value_chiphi: 800000
                        },
                        {
                            icon: 'bcd.jpg',
                            name_chiphi: 'Phí tiền nước',
                            value_chiphi: 465000
                        }
                    ]
                },
                {
                    time: 'Tháng 5/2017',
                    status: 'Chưa thanh toán',
                    total_cost: 1665000,
                    details: [
                        {
                            icon: 'abc.jpg',
                            name_chiphi: 'Phí dịch vụ',
                            value_chiphi: 800000
                        },
                        {
                            icon: 'bcd.jpg',
                            name_chiphi: 'Phí tiền nước',
                            value_chiphi: 465000
                        }
                    ]
                },
                {
                    time: 'Tháng 6/2017',
                    status: 'Chưa thanh toán',
                    total_cost: 1665000,
                    details: [
                        {
                            icon: 'abc.jpg',
                            name_chiphi: 'Phí dịch vụ',
                            value_chiphi: 800000
                        },
                        {
                            icon: 'bcd.jpg',
                            name_chiphi: 'Phí tiền nước',
                            value_chiphi: 465000
                        }
                    ]
                }
            ],
            listDepartment: ["CT0", "CT1", "CT2"],
            listYear: ["2017", "2018", "2019"],
            departmebtSelect: 'Chọn căn hộ',
            yearSelect: 'Chọn năm'
        }

    }


    shouldComponentUpdate(nextProps, nextState) {
        return true;

    }


    renderPickerItemSource = (listData) => {
        let sourceItems = listData.map((s, i) => {
            return <Picker.Item key={i} value={s} label={s} />
        });
        return sourceItems;
    }


    renderModalContent = ()=>{

        const data = [];
        let sourceItems = data.map((s, i) => {
            return <TouchableOpacity key={i} >
            </TouchableOpacity>
        });
        return sourceItems;


    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ backgroundColor: "green", flexDirection: 'row', margin: 10, justifyContent: 'center', alignItems: 'center', maxHeight: 40 }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', marginRight: 10, marginLeft: 10, fontSize: 16, width: 60 }}>Căn hộ: </Text>
                    {/* <Picker
                    style={{backgroundColor:"#ffffff",flex:1}}
                    selectedValue={this.state.departmebtSelect}
                    onValueChange={(itemValue, itemIndex) => this.setState({departmebtSelect: itemValue})}>
                    {this.renderPickerItemSource(this.state.listDepartment)}
                </Picker> */}


                </View>

                <View style={{ backgroundColor: "green", flexDirection: 'row', marginLeft: 10, marginRight: 10, justifyContent: 'center', alignItems: 'center', maxHeight: 40 }}>

                    <Text style={{ color: 'white', fontWeight: 'bold', marginLeft: 10, marginRight: 10, fontSize: 16, width: 60 }}>Năm: </Text>

                    {/* <Picker
                    style={{backgroundColor:"#ffffff",flex:1}}
                    selectedValue={this.state.yearSelect}
                    onValueChange={(itemValue, itemIndex) => this.setState({yearSelect: itemValue})}
                    >
                    
                    {this.renderPickerItemSource(this.state.listYear)}
                </Picker> */}

                </View>

                <FlatList
                    data={this.state.listPhiThanhToan}
                    extraData={this.state.listPhiThanhToan}
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
                    height: 100,
                    width: Dimention.DEVICE_WIDTH - 50,
                }}
                    swipeArea={20}
                    position={"center"} ref={"modal"} isDisabled={false}


                >

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
