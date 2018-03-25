import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';

import * as Dimention from '../configs/Dimention';
import ImageSlider from 'react-native-image-slider';

export default class SildeImage extends Component {
    constructor(props) {
        super(props);

        this.state ={
            position: 1,
            interval: null,
        }
    }


    shouldComponentUpdate(nextProps, nextState) {
       
        // if (JSON.stringify(nextProps.imageSlider) === JSON.stringify(this.props.imageSlider)) {
        //     return false;
        // }

        // else
            return true;
    }

    componentWillUnmount(){
        clearInterval(this.state.interval);
    }

    componentWillMount(){
        this.setState({
            interval: setInterval(() => {
                this.setState({position: this.state.position === 2 ? 0 : this.state.position + 1});
                
            }, 4000)
        });
    }
   
    
    render() {
        const {imageSlider} = this.props;
        var imgs = [];
        for(var i = 0;i < imageSlider.length;i++){
            imgs.push(imageSlider[i].thumbnail);
        }
        console.log("anh:",imgs);


        
        if (imageSlider.length <= 0) {
            return null;
        }else{
            return (
               <View
               style={{height:150}}
               >
                    <ImageSlider images={imgs}
                    position={this.state.position}
                    onPositionChanged={position => this.setState({position})}
                    
                    />
                </View>
                
            )
        }
    }


    componentDidMount() {
    }

    componentDidUpdate() {
    }

}

