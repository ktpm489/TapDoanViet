import {
    AsyncStorage
} from 'react-native'
import {BASE_URL, CREATE_CMT} from "../Constants";


export const callApiCreateCmt = (postId, comment) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem('token').then((value)=> {
                fetch(BASE_URL + CREATE_CMT, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': value,
                    },
                    body: JSON.stringify({
                        postId: postId,
                        comment: comment


                    })

                }).then((response) => {
                    return response.json();
                }).then(data => {
                    console.log('data response', data1);
                    dispatch({
                        type: 'CREATE_CMT',
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