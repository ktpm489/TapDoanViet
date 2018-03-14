/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import SocketIOClient from 'socket.io-client';
import Icon from 'react-native-vector-icons/Ionicons'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
    constructor(props){
        super(props)
        this.socket = SocketIOClient("http://222.252.16.186:9061/");
        console.log('socket', this.socket)
        // this.socket = SocketIOClient("http://192.168.1.68:6888" ,
        //     {query: 'token=eyJhbGciOiJIUzI1NiJ9.NWE5ZWIyZjA1ZTM1ODcxYjE1ZmRiZTJm.hXLTc3OtgBD5QilkTeh_Olr_tgfE72QmxuQ8hF82tog'}
        // );
        // console.log('socket', this.socket)
        this.socket = SocketIOClient("http://backend.thinhnv.net?token=eyJhbGciOiJIUzI1NiJ9.NWE5YmQ3N2E1ODc3YjY0YzE1MjgxNTFm.HIWMzAJXmauqu1tPH6px24Mr93hDHNCCkTGXIdCUAO4" ,
            // {
            //     jsonp: false,
            //     transports: ['websocket']
            // }
        );
        console.log('socket', this.socket)

    }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
          <Icon name="ios-person" size={30} color="#4F8EF7" />
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>

        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
