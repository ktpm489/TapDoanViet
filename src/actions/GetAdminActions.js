
import {
    AsyncStorage
} from 'react-native'

import {BASE_URL, GET_ADMIN,} from "../Constants";
import  * as ACTION_TYPE from './ActionTypes'


export const getAdmin = ()=>{
    return dispatch => {  
        AsyncStorage.getItem("token").then(value => {
            
            console.log("get admin");
        fetch(BASE_URL + GET_ADMIN , {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": value
            },
        }).then(response => {
            return response.json()
        }).then(data => {
            console.log('get admin success', data)
            if(data.errorCode === 0){
               return dispatch({
                    type: ACTION_TYPE.GET_ADMIN,
                    payload: data
                })
            }else if(data.errorCode && data.errorCode === "401"){
                alert('Tài khoản bị khóa hoặc token hết hạn, Vui lòng đăng nhập lại');
            }

        }).catch(e => {
            console.log("exception", e);
        });
    })
}
}
