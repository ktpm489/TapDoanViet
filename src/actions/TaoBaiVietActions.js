
// import {SLIDER, URL} from "../components/Api";
import {
    AsyncStorage
} from 'react-native'

import {BASE_URL, CREATE_NEW, UPLOAD_IMAGE} from "../Constants";

export const callApiUploadImg = (imgdata, imageType) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem('token').then((value)=> {
                fetch(BASE_URL + UPLOAD_IMAGE, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': value,
                    },
                    body: JSON.stringify({
                        imageData: imgdata,
                        imageType: imageType,
                    })

                }).then((response) => {
                    return response.json();
                }).then(data => {
                    console.log('data response', data);
                    dispatch({
                        type: 'TAO_BAI_VIET',
                        payload: data
                    })
                    resolve(data);
                }).catch(e => {
                    console.log('exception')
                })
            });
        })
    }
}



export const callApiCreatePost = (content, image,id_category) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem('token').then((value)=> {
                fetch(BASE_URL + CREATE_NEW, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': value,
                    },
                    body: JSON.stringify({
                        content: content,
                        images: image,
                        category:id_category


                    })

                }).then((response) => {
                    return response.json();
                }).then(data1 => {
                    console.log('data response', data1);
                    dispatch({
                        type: 'TAO_BAI_VIET',
                        payload1: data1
                    })
                    resolve(data1);
                }).catch(e => {
                    console.log('exception')
                })
            });
        })
    }
}