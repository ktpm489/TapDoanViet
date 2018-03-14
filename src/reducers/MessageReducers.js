import * as ActionType from '../actions/ActionTypes';

const MessageReducers = (state = {listUserChat: []}, action) => {
    switch (action.type) {
        case ActionType.GET_USER_CHAT:
            return {
                ...state, listUserChat: action.listUserChat
            };

        default:
            return state;
    }

};

export default MessageReducers;