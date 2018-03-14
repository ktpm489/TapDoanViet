import * as ActionType from '../actions/ActionTypes';

const initState = {socket: null, isJoinChat: false, userSocket: null};
const SocketReducers = (state = initState, action) => {
        switch (action.type) {
            case ActionType.CONNECTED:
                return {
                    ...state, socket: action.socket
                }
                    ;

            case ActionType.DISCONECT:
                return {
                    ...state, socket: null,isJoinChat: false, userSocket: null
                };

            case ActionType.JOIN_CHAT_SUCCESS:
                return {
                    ...state,
                    isJoinChat: true,
                    userSocket:
                    action.dataJoin
                }
                    ;
            default:
                return state;
        }

    }
;

export default SocketReducers;