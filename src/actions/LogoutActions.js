
import {
    AsyncStorage
} from 'react-native'
import {LOGOUT} from "../actions/ActionTypes";
export const resetRedux = () => {
    
    return {
        type: LOGOUT,
        payload:[],
      }
}