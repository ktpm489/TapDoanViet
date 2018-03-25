import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList
} from 'react-native';

import * as Dimention from '../configs/Dimention'
import PhiDichVuItem from '../components/PhiDichVuItem'

export default class PhiDichVu extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            title:'Phí Dịch Vụ',
            headerStyle: {backgroundColor: '#23b34c'},
            headerTitleStyle: {color: 'white'},
            headerTintColor: 'white',

        }
    }

    constructor(props) {
        super(props);

        this.state = {
            listPhiThanhToan:[
                {
                    time:'Tháng 4/2017',
                    status:'Chưa thanh toán',
                    total_cost:1665000,
                    details:[
                        {
                            icon:'abc.jpg',
                            name_chiphi:'Phí dịch vụ',
                            value_chiphi:800000
                        },
                        {
                            icon:'bcd.jpg',
                            name_chiphi:'Phí tiền nước',
                            value_chiphi:465000
                        }
                    ]
                },
                {
                    time:'Tháng 5/2017',
                    status:'Chưa thanh toán',
                    total_cost:1665000,
                    details:[
                        {
                            icon:'abc.jpg',
                            name_chiphi:'Phí dịch vụ',
                            value_chiphi:800000
                        },
                        {
                            icon:'bcd.jpg',
                            name_chiphi:'Phí tiền nước',
                            value_chiphi:465000
                        }
                    ]
                },
                {
                    time:'Tháng 6/2017',
                    status:'Chưa thanh toán',
                    total_cost:1665000,
                    details:[
                        {
                            icon:'abc.jpg',
                            name_chiphi:'Phí dịch vụ',
                            value_chiphi:800000
                        },
                        {
                            icon:'bcd.jpg',
                            name_chiphi:'Phí tiền nước',
                            value_chiphi:465000
                        }
                    ]
                }
            ]
        }
    }


    shouldComponentUpdate(nextProps, nextState) {

    }




    render() {
        return (
            <View style={{flex: 1}}>
                <Text style={{alignSelf:'center',color:'black',fontWeight:'bold'}}>Căn hộ CT1-A503</Text>
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
            </View>
        )

    }


    componentDidMount() {
    }

    componentDidUpdate() {
    }

}
