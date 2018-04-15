import * as ACTION_TYPE from '../actions/ActionTypes'

const GetAdminReducers = (state = {}, action) => {
    
    switch (action.type) {
        case ACTION_TYPE.GET_ADMIN:
       
            return {
                ...state,
                adminInfo:action.payload

            }
        default:
            return state
    }
}

export default GetAdminReducers