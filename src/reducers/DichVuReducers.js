const DichVuReducers = (state = [], action) => {
    // console.log("qqqqqqqqqqqqqqqq",action.type);
    switch (action.type) {
        case 'DICH_VU':
            return action.payload;
        default:
            return state
    }
}

export default DichVuReducers