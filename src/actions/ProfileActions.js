
import {
    AsyncStorage
} from 'react-native'

import {BASE_URL, GET_INFO,} from "../Constants";

export const callApiProfile = () => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            
            AsyncStorage.getItem('token').then((value)=> {
                console.log('token---call profile', value);
                fetch(BASE_URL + GET_INFO, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': value,
                    },

                }).then((response) => {
                   

                    try{
                        return response.json();
                    } catch(e) {
                        console.log('eee', e);
                    }
                }).then(data => {
                    
                    dispatch({
                        type: 'GET_INFO',
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

