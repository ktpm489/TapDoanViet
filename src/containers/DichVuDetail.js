import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity
} from 'react-native';

import * as Dimention from '../configs/Dimention'
import * as Const from '../Constants'
import Modal from 'react-native-modalbox';
import ModalDichVu from '../components/ModalDichVu'

export default class DichVuDetail extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            title:'Chi tiết dịch vụ',
            headerStyle: {backgroundColor: '#23b34c'},
            headerTitleStyle: {color: 'white'},
            headerTintColor: 'white',

        }
    }


    constructor(props) {
        super(props);

        this.state = {
            isDisabled:false
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }
    componentDidMount(){
        
    }

    render() {
        const {navigation} = this.props;
        return (
            <View style={{flex:1}}>

                
                 
                <Modal  style={{
                    height: Dimention.DEVICE_HEIGHT-200,
                    width: Dimention.DEVICE_WIDTH-50,
                    
                    
                }}
                    swipeArea={20}
                    position={"center"} ref={"modal"} isDisabled={false}
                >
                   <ModalDichVu/>
                </Modal>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <Image style={{flex: 1, height: 180, width: "100%", alignSelf: 'stretch',}}
                           resizeMode="cover"
                           source={{uri: 'http://www.trasauviettel.com/media/k2/items/cache/c79015a227b446e15f181d145a9ed4a7_XL.jpg'}}/>

                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        padding: 10,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text style={{
                            textAlign: 'left',
                            fontWeight: 'bold',
                            fontSize: 20,
                            color: 'black'
                        }}> Dịch vụ taxi</Text>
                        <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                            <TouchableOpacity
                            onPress={()=>this.refs.modal.open()}

                            >
                                <Text style={{
                                    textAlign: 'center',
                                    backgroundColor: 'red',
                                    color: 'white',
                                    padding: 10,
                                    borderRadius: 5,
                                    borderWidth: 0.5,
                                    borderColor: 'red'
                                }}>Gọi
                                    ngay</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={{flex: 1, flexDirection: 'row', marginLeft: 10}}>
                        <Image style={{width: 20, height: 20}}
                               resizeMode="cover"
                               source={require('../images/phone.png')}/>
                        <Text style={{marginLeft: 10}}>0249876456</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', marginLeft: 10}}>
                        <Image style={{width: 20, height: 20}}
                               resizeMode="cover"
                               source={require('../images/map_marker.png')}/>
                        <Text style={{marginLeft: 10}}>Tầng 1 - B5</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', marginLeft: 10}}>
                        <Image style={{width: 20, height: 20}}
                               resizeMode="cover"
                               source={require('../images/currency-usd.png')}/>
                        <Text style={{marginLeft: 10}}>10.000vnđ/1km</Text>
                    </View>
                    <View style={{flex: 1, height: 1, backgroundColor: 'black', margin: 10}}></View>

                    <Text style={{flex: 1, margin: 10}}>
                        Với mong muốn đáp ứng ngày càng tốt hơn nhu cầu của Quý khách, từ ngày 05/12/2017, taxi Mai
                        Linh chính thức đưa vào sử dụng số tổng đài 1055 thay cho các số tổng đài trước tại tất cả
                        các tỉnh thành trên toàn quốc.

                        Tổng đài duy nhất gọi taxi Mai Linh trên toàn hệ thống sẽ là 1055

                        Tổng đài có nhiệm vụ tiếp nhận và hỗ trợ mọi vấn đề của quý khách bao gồm:

                        Gọi xe taxi Mai Linh
                        Thông tin về các dịch vụ của Mai Linh
                        Chăm sóc khách hàng (tiếp nhận mọi ý kiến phản hồi của Quý khách)
                        Tiếp nhận và cung ứng các dịch vụ: Xe taxi, xe cho thuê, đặt xe đưa đón sân bay...
                        Tổng đài 1055 hoạt động 24h/7 ngày trong tuần
                        Thông tin chi tiết xin vui lòng truy cập website: https://mailinh.vn/
                    </Text>
                       
                </ScrollView>
                
                

            </View>
            

        )
    }
};
