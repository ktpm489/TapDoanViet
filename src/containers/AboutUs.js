import React, { Component } from 'react';
import {
    View,
    Text,
    AsyncStorage,
    FlatList,
    TextInput,
    Image,TouchableOpacity,
    ActivityIndicator,
    WebView
} from 'react-native'


class AboutUs extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            title:'Về chúng tôi',
            headerStyle: {backgroundColor: '#23b34c'},
            headerTitleStyle: {color: 'white'},
            headerTintColor: 'white',

        }
    }
    
    constructor(props){
        super(props);

        
    }


    componentWillMount(){
        
    }


    render (){
        return (
            
            
            <WebView
            // source={{ html: item.content }}
            source={{ uri: "https://dayngheso1.vn/" }}
            style = {{flex: 1,}}
            // scrollEnabled={false}
            />
            
        )

    }
}
export default AboutUs;