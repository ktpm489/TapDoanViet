
// import {SLIDER, URL} from "../components/Api";
import {
    AsyncStorage
} from 'react-native'

import {BASE_URL, SLIDER} from "../Constants";
let nextTodoId = 0;

export const callApiDichVu = () => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem('token').then((value)=> {
                fetch(BASE_URL + SLIDER, {
                    method: "GET",
                    headers: {
                        'x-access-token': value,
                        'Content-Type': 'application/json'
                    }
                }).then((response) => {
                    return response.json();
                }).then(data => {
                    // console.log('data response', data);
                    dispatch({
                        type: 'DICH_VU',
                        payload: data.data
                    })
                    resolve(data);
                }).catch(e => {
                    console.log('exception')
                })
            });
        })
    }
}