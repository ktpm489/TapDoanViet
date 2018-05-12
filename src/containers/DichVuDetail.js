import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    WebView,
    ActivityIndicator
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
            isDisabled:false,
            isLoading:false
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }
    componentDidMount(){
        
    }

    childCloseModal = ()=>{
        this.refs.modal.close();
        this.setState({isLoading:true});
    }

    onCallApiDone = ()=>{
        this.setState({isLoading:false});
    }

    render() {
        const item = this.props.navigation.state.params.dataItem;
        
        return (
            <View style={{flex:1}}>

                
                 
                <Modal  style={{
                    height: Dimention.DEVICE_HEIGHT-200,
                    width: Dimention.DEVICE_WIDTH-50,
                    
                    
                }}
                    swipeArea={20}
                    position={"center"} ref={"modal"} isDisabled={false}
                >
                   <ModalDichVu
                        id_dichvu={item.id}
                        closeModal = {this.childCloseModal}
                        onCallApiDone = {this.onCallApiDone}
                   />
                </Modal>

                <View style ={{flex:1}}>
                    <Image style={{height: Dimention.DEVICE_WIDTH*(450/800), width: "100%", alignSelf: 'stretch',}}
                           resizeMode="cover"
                           source={{uri: item.imageUrl}}/>

                    <View style={{
                        flexDirection: 'row',
                        padding: 10,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text style={{
                            textAlign: 'left',
                            fontWeight: 'bold',
                            fontSize: 20,
                            color: 'black',
                            flex: 1,
                        }}> {item.serviceName}</Text>
                        <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                            <TouchableOpacity
                            onPress={()=>this.refs.modal.open()}
                            style={{borderRadius: 5,
                                borderWidth: 0.5,
                                borderColor: '#fc9b03',
                                backgroundColor: '#fc9b03',}}

                            >
                                <Text style={{
                                    textAlign: 'center',
                                    
                                    color: '#ffffff',
                                    padding: 10,
                                    
                                }}>Đặt lịch ngay</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                
                    <WebView
                        source={{ html: item.content,baseUrl:'' }}
                        style = {{flex:1}}
                    />
                    
                       
                </View>

                {this.state.isLoading?
                    <View style={{top:-10,bottom:-10,left:-10,right:-10, justifyContent: 'center', alignItems: 'center',position:'absolute',zIndex:1,backgroundColor: 'rgba(52, 52, 52, 0.3)'}}>
                        <ActivityIndicator size="large" color="green"/>
                    </View>:null
                }
                
                

            </View>
            

        )
    }
};
