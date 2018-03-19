import React, { Component } from 'react';
import {
    View,
    Text,
    AsyncStorage,
    FlatList,
    WebView,
    Image, TouchableOpacity,
    ScrollView
} from 'react-native'
import { BASE_URL, GET_SERVICE } from "../Constants";

class TienIchDetail extends Component {

    constructor(props) {
        super(props);


    }



    render() {
        const { item } = this.props.navigation.state.params;
        return (
                <View style = {{flex:1}}>
                    <WebView
                        source={{uri: 'https://github.com/facebook/react-native'}}
                    />
                </View>

        )

    }
}
export default TienIchDetail;