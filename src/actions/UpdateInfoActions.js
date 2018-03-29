
import {
    AsyncStorage
} from 'react-native'

import {BASE_URL, UPDATE_INFO} from "../Constants";

export const callApiUpdateInfo = (gender, email, userName, lastName, firstName, phoneNumber) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem('token').then((value)=> {
                fetch(BASE_URL + UPDATE_INFO, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': value,
                    },
                    body: JSON.stringify({
                        gender: gender,
                        email: email,
                        userName: userName,
                        lastName: lastName,
                        firstName: firstName,
                        phoneNumber: phoneNumber
                    })

                }).then((response) => {
                    return response.json();
                }).then(data => {
                    console.log('data response', data);
                    dispatch({
                        type: 'UPDATE_INFO',
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


