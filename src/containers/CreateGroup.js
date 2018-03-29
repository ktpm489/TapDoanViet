import React, { Component } from "react";
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
  ScrollView,Alert
} from "react-native";

import * as Dimention from "../configs/Dimention";
import * as URL from '../Constants'
import TinNhanItem from '../components/TinNhanItem';
export default class CreateGroup extends Component {


  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state

    return {
        headerRight: <TouchableOpacity style = {{marginRight:10}}
                                       onPress={() => params.actionCreate()}>
            <Text style = {{color: "#1565C0",fontWeight:'600'}}>Xong</Text>
        </TouchableOpacity>,
        title:params.title,
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
      isLoading: false
    };

    this.timeout = 0;
    this.groupname = "";
    this.fromEdit = false;
    this.groupnameOld = "";

    
    

  }

  componentWillMount() {
    console.log("params",this.props.navigation.state.params);
    if(this.props.navigation.state.params && this.props.navigation.state.params.userGroup && this.props.navigation.state.params.groupname){
      this.groupnameOld = this.props.navigation.state.params.groupname;
      this.setState({userGroup:this.props.navigation.state.params.userGroup});
      this.fromEdit = true;
      this.props.navigation.setParams({title:"Thêm thành viên"});
      
    }else{
      this.props.navigation.setParams({title:"Tạo nhóm"})
    }
    AsyncStorage.getItem("token").then(value => {
      this.token = value;

      //console.log("value", this.token);
      // this.getListMessage();
    });


    this.props.navigation.setParams({ actionCreate: this.actionCreate});
  }

  actionCreate = ()=>{
    if(this.fromEdit){
      Alert.alert("Thông báo","Chỉnh sửa click");
      return;
    }

    if(this.groupname === ""){
        Alert.alert("Thông báo","Tên nhóm không được để trống");
        return;
    }
    if(this.state.userGroup.length < 2){
      Alert.alert("Thông báo","Nhóm phải có ít nhất 3 thành viên");
      return;
    }
    this.props.navigation.navigate("ChatGroup",{userGroup:this.state.userGroup,groupname:this.groupname})
    Alert.alert("Thông báo","Tạo nhóm thành công");

  }

  shouldComponentUpdate() {
    return true;
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: Dimention.DEVICE_WIDTH / 5
        }}
      />
    );
  };

  debounce = (func, wait) => {
    var context = this,
      args = arguments;
    var executeFunction = function() {
      func.apply(context, args);
      this.timeout = 0;
    };

    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(executeFunction, wait);
  };

  callApi = textSearch => {
    this.setState({ isLoading: true });
    if (textSearch === "") {
      this.setState({ resultSearch: [], isLoading: false });
      return;
    }

    console.log("text", textSearch);
    AsyncStorage.getItem("token").then(value => {
       
      fetch(URL.BASE_URL + URL.SEARCH_USER + textSearch, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": value
        }
      })
        .then(response => {
           
          return response.json();
        })
        .then(data => {
          console.log("search user data: ", data);
          if (data && data.errorCode == 0) {
           
          //   Array.prototype.diff = function(a) {
          //     return this.filter(function(i){ return JSON.stringfy(a).indexof(JSON.stringfy(i)) < 0;});
          // };

          Array.prototype.diff = function(a) {
            return this.filter(function(i) {return a.map(function(e) { return JSON.stringify(e); }).indexOf(JSON.stringify(i)) < 0;});
        };
          var fillter = data.data;
            if(this.state.userGroup.length > 0)
              fillter = data.data.diff(this.state.userGroup);

              console.log("fillter",fillter);
            this.setState({ resultSearch: fillter, isLoading: false });
          }
        })
        .catch(e => {
          console.log("exception", e);
        });
    });
  };

  

  clickItemSearch = (userSelect,index)=>{
      //console.log("user select",userSelect);
      console.log("user index",index);
      var addNew = [...this.state.userGroup,userSelect];
      this.setState({userGroup:addNew});
      console.log("this.state.resultSearch.length",this.state.resultSearch.length);
      if(this.state.resultSearch.length == 1){
        this.setState({resultSearch:[]});
      }else{
        this.state.resultSearch.splice(index,1);
        this.setState({resultSearch:this.state.resultSearch});
      }
      

  }

  render() {

    const {navigation} = this.props;
    return (
      <ScrollView style={{ flex: 1, margin: 10 }}>
        <TextInput
          style={{
            borderWidth: 1,
            borderRadius: 4,
            borderColor: "#000",
            shadowColor: "#000",
            paddingLeft: 5,
            marginBottom: 10,
            minHeight:50
            
          }}
          placeholder="Nhập tên nhóm"
          underlineColorAndroid="transparent"
          onChangeText = {(text)=>{this.groupname = text}}
          defaultValue={this.groupnameOld}
        />
        <TextInput
          style={{
            borderWidth: 1,
            borderRadius: 4,
            borderColor: "#000",
            shadowColor: "#000",
            paddingLeft: 5,
            marginBottom: 10,
            minHeight:50
          }}
          onChangeText={text =>
            this.debounce(
              function(e) {
                this.callApi(text);
              }.bind(this),
              1000
            )
          }
          underlineColorAndroid="transparent"
          placeholder="Thêm thành viên"
        />
        <FlatList
          showsHorizontalScrollIndicator={false}
          showVerticalScrollIndicator={false}
          contentContainerStyle={{margin:4}}
          data={this.state.userGroup}
          renderItem={(item) => (
              <View 
                style={{
                  borderRadius: 5,
                  padding:5,
                  margin:5,
                  borderWidth:1,
                  borderColor: "green",
                  shadowColor: "green",
                  backgroundColor:'green',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.8,
                  flexDirection:'row',
                  justifyContent:"center",
                  alignItems:'center',
                  
                }}
                >
                <Text style={{color:'white'}}>{item.item.firstName} {item.item.lastName}</Text>
                <View style={{flex:1}}/>
                <TouchableOpacity
                    style={{alignSelf:'flex-end',justifyContent:"center",
                    alignItems:'center'}}
                    onPress={()=>{
                      this.state.userGroup.splice(item.index,1);
                      this.setState({userGroup: this.state.userGroup});
                    }}

                >
                  <Image
                    source={require("../images/close.png")}
                    style={{ width: 20, height: 20,alignSelf:'center' }}
                  />
                </TouchableOpacity>
              </View>
            )
          }
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          
        />
        <View style={{flex:1}}>
            <FlatList
              data={this.state.resultSearch}
              renderItem={(item) => {

              
                return <TinNhanItem dataItem={item} navigation={navigation} fromSearch={true} sendDataClick={this.clickItemSearch} index={item.index} />;
              }}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={this.renderSeparator}
            />
              {this.state.isLoading ? (
                <View
                  style={{
                    top: 100,
                    bottom: -10,
                    left: -10,
                    right: -10,
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    zIndex: 1,
                    backgroundColor: 'rgba(52, 52, 52, 0.3)'
                  }}
                >
                  <ActivityIndicator size="large" color="green" />
                </View>
              ) : null}

        </View>
        
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
