const ProfileReducers = (state = [], action) => {
    switch (action.type) {
        case 'GET_POST':
            return [
                ...state,
                {
                  userInfo:action.payload
                }
            ]
        default:
            return state
    }
}

export default ProfileReducers