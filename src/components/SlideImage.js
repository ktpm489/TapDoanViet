import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
} from 'react-native';

import * as Dimention from '../configs/Dimention';
import ImageSlider from 'react-native-image-slider';

export default class SildeImage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstPost: 0,
        }
        // this.isRun = false;
        this.currentPos = 0;
    }


    shouldComponentUpdate(nextProps, nextState) {

        // if (JSON.stringify(nextProps.imageSlider) === JSON.stringify(this.props.imageSlider)) {
        //     return false;
        // }

        // else
        return true;
    }

    componentWillUnmount() {
        // clearInterval(this.state.interval);
    }

    componentWillMount() {

    }
    componentWillReceiveProps(nextProps, nextState) {
        console.log("props", nextProps);
        // if (nextProps.imageSlider.length > 0) {
        //     const  imageSlider  = nextProps.imageSlider;
            
        //     if (!this.isRun) {
        //         this.isRun = true;
        //         this.setState({
        //             interval: setInterval(() => {
        //                 this.setState({ position: this.state.position === imageSlider.length ? 0 : this.state.position + 1 });
                        

        //             }, 4000)
        //         });

        //     }
        // }
    }


    render() {
        console.log("state",this.state);
        const { imageSlider } = this.props;
        var imgs = [];
        for (var i = 0; i < imageSlider.length; i++) {
            imgs.push(imageSlider[i].thumbnail);
        }




        if (imageSlider.length <= 0) {
            return null;
        } else {
            return (
                <View
                    style={{ height: 200 }}
                >
                    <ImageSlider images={imgs}
                        
                        loopBothSides
                        loop = {true}
                        autoPlayWithInterval={4000}
                         onPositionChanged={position => {
                        
                            //   console.log("pos nhay",position)
                            // if(position !== this.state.position)
                            //     this.setState({ position:position })
                            }
                         }

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

