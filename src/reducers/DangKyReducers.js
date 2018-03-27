const DangKyReducers = (state = [], action) => {
    switch (action.type) {
        case 'REGISTER':
            return {
                payload : action.payload,
            }
        default:
            return state
    }
}

export default DangKyReducers