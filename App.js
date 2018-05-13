/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    View,
    Text,
    AsyncStorage,
    TouchableOpacity,
    Platform
} from 'react-native';
import {Provider} from 'react-redux'
import store from './src/store'
import RootStack from './src/routers/Navigation'

import PhiDichVu from './src/containers/PhiDichVu'
import DichVu from './src/containers/DichVu'
import DichVuDetail from './src/containers/DichVuDetail'
import * as Consts from './src/Constants';
import {Tab} from './src/routers/Navigation'
import ThongTinCaNhan from "./src/containers/ThongTinCaNhan";
import logout from './src/components/TokenExpired'

export default class App extends Component<{}> {

    constructor(props) {
        super(props);
        

    }

    render() {
        console.log("go to app");
        return (


            <Provider store={store}>
                <RootStack/>
            </Provider>

        );
    }
}

