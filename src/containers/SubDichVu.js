import React, { Component } from 'react';
import {
    View,
    Text,
    AsyncStorage,
    FlatList,
    TextInput,
    Image,TouchableOpacity,
    ActivityIndicator
} from 'react-native'

import DichVuItem from '../components/DichVuItem'

class SubDichVu extends Component {
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state

        return {
            title:'Dịch vụ',
            headerStyle: {backgroundColor: '#23b34c'},
            headerTitleStyle: {color: 'white'},
            headerTintColor: 'white',

        }
    }
    constructor(props){
        super(props);

        this.state = {
            listTienIch:[],
            isLoading:false
        }
    }


    componentWillMount(){
       
    }

    
    

    


    render (){
        this.data = [];
        this.data.push(this.props.navigation.state.params.dataItem);
        console.log("subdichvu",this.data);
        return (
            
          
            < FlatList
                    showsHorizontalScrollIndicator={false}
                    showVerticalScrollIndicator={false}
                    data={this.data}
                    renderItem={(item) => {
                        return (
                            <DichVuItem
                                dataItem={item}
                                navigation={this.props.navigation}
                                fromSubDichVu = {true}
                            />
                        )
                    }}
                    numColumns={3}
                    keyExtractor={(item, index) => index.toString()}
                    style={{marginBottom: 100, marginLeft: 10, marginRight: 10, marginTop: 10}}
       />
              
            
        )

    }
}
export default SubDichVu;