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
  ScrollView
} from "react-native";

import * as Dimention from "../configs/Dimention";
import * as URL from '../Constants'
import TinNhanItem from '../components/TinNhanItem';
export default class CreateGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resultSearch: [],
      userGroup: [],
      isLoading: false
    };

    this.timeout = 0;
  }

  componentWillMount() {
    AsyncStorage.getItem("token").then(value => {
      this.token = value;

      //console.log("value", this.token);
      // this.getListMessage();
    });
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
            this.setState({ resultSearch: data.data, isLoading: false });
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
            marginBottom: 10
          }}
          placeholder="Nhập tên nhóm"
        />
        <TextInput
          style={{
            borderWidth: 1,
            borderRadius: 4,
            borderColor: "#000",
            shadowColor: "#000",
            paddingLeft: 5,
            marginBottom: 10
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
              top: 50,
              bottom: 0,
              left: 0,
              right: 0,
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              zIndex: 1
            }}
          >
            <ActivityIndicator size="large" color="green" />
          </View>
        ) : null}
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
