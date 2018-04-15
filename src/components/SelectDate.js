import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList
} from "react-native";

import * as Dimention from "../configs/Dimention";
import * as Const from "../Constants";
import HoursItem from "./HoursItem";

export default class SelectDate extends Component {
  constructor(props) {
    super(props);

    var arrHourse = [
      "8:00",
      "9:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
    ];
    var listHours = [];
    for (var i = 0; i < arrHourse.length; i++) {
      listHours.push({
        position: i,
        time: arrHourse[i],
        select: false
      });
    }

    this.state = {
      listHours: listHours,
      currentPost: 0,
      listDateState:[],
      next: true,
      prev: false
    };

    this.listDate = [];
    this.hourSelect = "";
    this.positionHourSelect = "";
    this.date = "";
    // this.positionDateSelect = 0;
  }

  onHourSelect = positionHourSelect => {
    let tempList = [...this.state.listHours];

    if (this.positionHourSelect !== "") {
      tempList[this.positionHourSelect].select = false;
    }
    tempList[positionHourSelect].select = true;

    this.setState({
      listHours: tempList,
      
    });
    this.positionHourSelect = positionHourSelect;
    this.hourSelect = this.state.listHours[positionHourSelect];
  };

  shouldComponentUpdate(nextProps, nextState) {
    // if (JSON.stringify(nextProps.dataItem) === JSON.stringify(this.props.dataItem)) {
    //   return false;
    // } else 
    return true;
  }

  componentDidMount() {}

  componentWillMount() {
    var currentDate = new Date();
// console.log("selection",this.positionDateSelect)
    this.listDate = [];
    for (var i = 0; i < 7; i++) {
      var dayOfWeek = currentDate.getDay(); //0-6,0:sunday
      var date = currentDate.getDate();
      var month = currentDate.getMonth() + 1; //0-11
      var year = currentDate.getFullYear();
      var nameDate = "";
      if (dayOfWeek == 0) {
        nameDate = "Chủ nhật";
      } else if (dayOfWeek == 1) {
        nameDate = "Thứ 2";
      } else if (dayOfWeek == 2) {
        nameDate = "Thứ 3";
      } else if (dayOfWeek == 3) {
        nameDate = "Thứ 4";
      } else if (dayOfWeek == 4) {
        nameDate = "Thứ 5";
      } else if (dayOfWeek == 5) {
        nameDate = "Thứ 6";
      } else if (dayOfWeek == 6) {
        nameDate = "Thứ 7";
      }

      var objDate = {
        date: date,
        month: month,
        year: year,
        nameDate: nameDate,
        dayOfWeek: dayOfWeek,
        selected:i===this.state.currentPost?true:false
      };
      this.listDate.push(objDate);
      currentDate.setDate(date + 1);

      // // this.setState({
      // //   currentPost: 0
      // // });
      // console.log("component willmount select date",this.state.currentPost);
      // this.date = this.listDate[this.state.currentPost];
    }
    this.setState({listDateState:this.listDate})
  }
  render() {
    // const { navigation } = this.props;
    // const { item } = this.props.dataItem;
    var dateSelect = this.listDate[this.state.currentPost];
    this.date = this.listDate[this.state.currentPost];
    var titleDate =
      dateSelect.nameDate + " " + dateSelect.date + "/" + dateSelect.month;

    return (
      <View style={{ flex: 1 }}>
      <View style={{flexDirection:'row',height:110,  }}>
        <Text
          style={{
            
            color: "red",
            flex:1,
            alignSelf:'center',
            textAlign:'center',

            margin: 10,
            fontSize: 20,
            fontWeight: "600"
          }}
        >
          Đặt lịch:
        </Text>
        {/* <View style={{ height: 1, backgroundColor: "white" }} /> */}
        <View
          style={{
            flex:1,
            marginTop:5,
            marginBottom:5,
            borderRadius:4,
            marginRight:5,
            borderRadius:1,
            borderColor:'gray',
            borderWidth:1

          }}
        >
        <FlatList
                    data={this.state.listDateState}
                    extraData={this.state.listDateState}
                    horizontal={false}
                    
                    renderItem={( item ) => {
                      return (
                        <TouchableOpacity
                        onPress={()=>{
                        
                          // this.positionDateSelect = item.index;
                          this.state.listDateState.forEach((a,i)=>{
                            if(i === item.index){
                              a.selected = true;
                            }else{
                              a.selected = false;
                            }
                          })
                          this.setState({listDateState:this.state.listDateState,currentPost:item.index});
                          this.date = this.state.listDateState[item.index];
                          console.log("data",item.index);
                          // console.log("pos",this.positionDateSelect);
                          console.log("date---",this.date);
                        }}
                          style={{backgroundColor:item.item.selected?'red':'white',padding:10,justifyContent:'center',alignItems:'center'}}
                        >
                          <Text style={{backgroundColor:item.item.selected?'red':'white',minWidth:70,alignSelf:'center',flex:1,}}>{item.item.nameDate + " " + item.item.date + "/" + item.item.month}</Text>
                        </TouchableOpacity>
                      );
                    }}
                    numColumns={1}
                    keyExtractor={(item, index) => index.toString()}
                   style={{flex:1,height:100}}

                  />
        </View>

          {/* <TouchableOpacity
            onPress={() => {
              if (this.state.currentPost == 1) {
                this.setState({
                  next: true,
                  prev: false,
                  currentPost: this.state.currentPost - 1
                });

               
              } else if (this.state.currentPost == 0) {
               
                return 0;
              } else {
                this.setState({
                  currentPost: this.state.currentPost - 1,
                  next: true,
                  prev: true
                });
               
              }
            }}
          >
            <Image
              source={
                this.state.prev
                  ? require("../images/arrow-left-blue.png")
                  : require("../images/arrow-left-gray.png")
              }
              style={{ width: 25, height: 25, margin: 10 }}
            />
          </TouchableOpacity>
          <View
              style={{flex:1,alignSelf:'center',justifyContent:'center',alignItems:'center'}}
          >
          <Text
            style={{
              
              alignSelf: "center",
              textAlign: "center",
              textAlignVertical: "center"
            }}
          >
            {titleDate}
          </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              if (this.state.currentPost == 5) {
                this.setState({
                  next: false,
                  prev: true,
                  currentPost: this.state.currentPost + 1
                });
                
              } else if (this.state.currentPost == 6) {
               
                return 0;
              } else {
                this.setState({
                  currentPost: this.state.currentPost + 1,
                  next: true,
                  prev: true
                });
                
              }
            }}
          >
            <Image
              source={
                this.state.next
                  ? require("../images/arrow-right-blue.png")
                  : require("../images/arrow-right-gray.png")
              }
              style={{ width: 25, height: 25, margin: 10 }}
            />
          </TouchableOpacity> */}
        </View>

        <View
          style={{ height: 1, backgroundColor: "gray", flexDirection: "row" }}
        />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <FlatList
            data={this.state.listHours}
            extraData={this.state.listHours}
            renderItem={({ item }) => {
              return (
                <HoursItem
                  dataItem={item}
                  onHourSelect={hour => this.onHourSelect(hour)}
                />
              );
            }}
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
            snapToAlignment={"center"}
          />
        </View>
      </View>
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
