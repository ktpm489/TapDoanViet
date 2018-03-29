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
      "20:00"
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
      next: true,
      prev: false
    };

    this.listDate = [];
    this.hourSelect = "";
    this.positionHourSelect = "";
    this.date = "";
  }

  onHourSelect = positionHourSelect => {
    let tempList = [...this.state.listHours];

    if (this.positionHourSelect !== "") {
      tempList[this.positionHourSelect].select = false;
    }
    tempList[positionHourSelect].select = true;

    this.setState({
      listHours: tempList
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
        dayOfWeek: dayOfWeek
      };
      this.listDate.push(objDate);
      currentDate.setDate(date + 1);
      // this.setState({
      //   currentPost: 0
      // });
      console.log("component willmount select date",this.state.currentPost);
      this.date = this.listDate[this.state.currentPost];
    }
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
        <Text
          style={{
            alignSelf: "center",
            color: "red",
            margin: 10,
            fontSize: 20,
            fontWeight: "600"
          }}
        >
          Đặt lịch
        </Text>
        <View style={{ height: 1, backgroundColor: "white" }} />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <TouchableOpacity
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
          </TouchableOpacity>
        </View>

        <View
          style={{ height: 1, backgroundColor: "white", flexDirection: "row" }}
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
