import {
    AsyncStorage
} from 'react-native'
import {BASE_URL, LOGIN} from "../Constants";

let nextTodoId = 0
// export const addTodo = text => {
//     return {
//         type: 'ADD_TODO',
//         id: nextTodoId++,
//         text
//     }
// }

export const callApiLogin = (sdt, mk) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            fetch(BASE_URL+LOGIN, {
                method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            userName: sdt,
                            password: mk,
                        })
            }).then((response) => {
                return response.json();
            }).then(data => {
                // console.log('data response', data);
                dispatch({
                    type: 'LOGIN',
                    id: nextTodoId++,
                    text: 'call api'
                })
                resolve(data);
            }).catch(e => {
                console.log('exception',e)
            })
        })
    }
}