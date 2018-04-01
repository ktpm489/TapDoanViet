import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    FlatList,
    AsyncStorage,
    ActivityIndicator,
    ScrollView, Alert
} from "react-native";

import * as Dimention from "../configs/Dimention";
import * as URL from '../Constants'
import TinNhanItem from '../components/TinNhanItem';
import {BASE_URL} from "../Constants";
import {CREATE_GROUP} from "../Constants";

export default class CreateGroup extends Component {


    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state

        return {
            headerRight: <TouchableOpacity style={{marginRight: 10}}
                                           onPress={() => params.actionCreate()}>
                <Text style={{color: "#1565C0", fontWeight: '600'}}>Xong</Text>
            </TouchableOpacity>,
            title: params.title,
            headerStyle: {backgroundColor: '#23b34c'},
            headerTitleStyle: {color: 'white'},
            headerTintColor: 'white',
        }
    }

    constructor(props) {
        super(props);


        this.state = {
            resultSearch: [],
            userGroup: [],
            isLoading: false,
            TenGroup: '',
            IdGroup: '',
        };

        this.timeout = 0;
        this.groupname = "";
        this.fromEdit = false;
        this.groupnameOld = "";


    }

    componentWillMount() {
        console.log("params", this.props.navigation.state.params);
        if (this.props.navigation.state.params && this.props.navigation.state.params.userGroup && this.props.navigation.state.params.groupname) {
            this.groupnameOld = this.props.navigation.state.params.groupname;
            this.setState({userGroup: this.props.navigation.state.params.userGroup});
            this.fromEdit = true;
            this.props.navigation.setParams({title: "Thêm thành viên"});

        } else {
            this.props.navigation.setParams({title: "Tạo nhóm"})
        }
        AsyncStorage.getItem("token").then(value => {
            this.token = value;

            //console.log("value", this.token);
            // this.getListMessage();
        });


        this.props.navigation.setParams({actionCreate: this.actionCreate});
    }
    CreateGroup = () => {
        // console.log('thí.state.tenG', this.state.TenGroup)
        AsyncStorage.getItem("token").then(value => {

            fetch(BASE_URL + CREATE_GROUP, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": value
                },
                body: JSON.stringify({
                    groupName: this.state.TenGroup,


                })
            }).then(response => {
                return response.json()
            }).then(dataRes => {
                this.setState({
                    IdGroup: dataRes.group._id

                }, ()=> {
                    this.props.navigation.navigate("AddMember", {IdGroup: this.state.IdGroup, groupname: this.state.TenGroup})
                })

            }).catch(e => {
                    console.log("exception", e);
            });
        });
    }

    actionCreate = () => {
        if (this.fromEdit) {
            Alert.alert("Thông báo", "Chỉnh sửa click");
            return;
        }

        if (this.state.TenGroup === "") {
            Alert.alert("Thông báo", "Tên nhóm không được để trống");
            return;
        }
        // if (this.state.userGroup.length < 2) {
        //     Alert.alert("Thông báo", "Nhóm phải có ít nhất 3 thành viên");
        //     return;
        // }
        this.CreateGroup()

        // Alert.alert("Thông báo","Tạo nhóm thành công");

    }


    render() {

        const {navigation} = this.props;
        return (
            <ScrollView style={{flex: 1, margin: 10}}>
                <TextInput
                    style={{
                        borderWidth: 1,
                        borderRadius: 4,
                        borderColor: "#000",
                        shadowColor: "#000",
                        paddingLeft: 5,
                        marginBottom: 10,
                        minHeight: 50

                    }}
                    placeholder="Nhập tên nhóm"
                    underlineColorAndroid="transparent"
                    onChangeText = {(TenGroup)=>this.setState({TenGroup})}
                    defaultValue={this.groupnameOld}
                />


            </ScrollView>
        );
    }
}
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
});
