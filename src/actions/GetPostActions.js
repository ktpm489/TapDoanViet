
import {
    AsyncStorage
} from 'react-native'

import {BASE_URL, GET_POST} from "../Constants";

export const callApiGetPost = (id) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem('token').then((value)=> {
                fetch(BASE_URL + GET_POST+"/category/"+id, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': value,
                    },

                }).then((response) => {
                    return response.json();
                }).then(data => {
                    console.log('data response', data);
                    dispatch({
                        type: 'GET_POST',
                        payload: data
                    })
                    resolve(data);
                }).catch(e => {
                    console.log('exception', e)
                })
            });
        })
    }
}

