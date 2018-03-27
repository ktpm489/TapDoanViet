import {
    AsyncStorage
} from 'react-native'
import {BASE_URL, REGISTER} from "../Constants";


export const callApiDangKy = (firstName, lastName, email, phoneNumber, password, confirmPassword) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
                fetch(BASE_URL + REGISTER, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        firstName : firstName,
                        lastName : lastName,
                        userName : "",
                        email : email,
                        avatar : "",
                        phoneNumber : phoneNumber,
                        password : password,
                        confirmPassword: confirmPassword,
                        gender : 1,



                    })

                }).then((response) => {
                    return response.json();
                }).then(data => {
                    // console.log('data response', data);
                    dispatch({
                        type: 'REGISTER',
                        payload: data
                    })
                    resolve(data);
                }).catch(e => {
                    console.log('exception', e)
                })
            });
    }
}