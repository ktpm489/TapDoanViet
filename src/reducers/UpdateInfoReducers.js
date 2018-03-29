const UpdateInfoReducers = (state = [], action) => {
    switch (action.type) {
        case 'UPDATE_INFO':
            return {
                payload : action.payload,
            }
        default:
            return state
    }
}

export default UpdateInfoReducers