const GetPostReducers = (state = [], action) => {
    switch (action.type) {
        case 'GET_POST':
            return [
                {
                    payload : action.payload,
                }
            ]
        default:
            return state
    }
}

export default GetPostReducers