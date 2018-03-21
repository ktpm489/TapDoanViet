const ProfileReducers = (state = [], action) => {
    switch (action.type) {
        case 'GET_INFO':
            return {
                    ...state,userInfo:action.payload.data[0]
                }
            
        default:
            return state
    }
}

export default ProfileReducers