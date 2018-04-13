
import {
    AsyncStorage
} from 'react-native'
import {BASE_URL, UPDATE_INFO} from "../Constants";

export const callApiUpdateInfo = (gender, email, lastName) => {
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
                        lastName: lastName,
                        // phoneNumber: phoneNumber
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
                    console.log('exception', e)
                })
            });
        })
    }
}


