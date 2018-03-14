import * as ActionType from '../actions/ActionTypes';

export const connectToSocket = (socket) => {
    return (dispatch) => {


        return new Promise((resolve,reject)=>{
            socket.on('connect', () => {
                dispatch({
                    type: ActionType.CONNECTED,
                    socket: socket
                });
                resolve();
            })
        });

    }
};

export const disConnectToSocket = (socket) => {
    return (dispatch) => {
        socket.on('disconnect', () => {
            dispatch({
                type: ActionType.DISCONECT
            })
            // alert("socket disconnect");
        })
    }
};
export const joinToChat = (socket) => {
    return (dispatch) => {
        socket.on('join_chat_successfully', (data) => {
            dispatch({
                type: ActionType.JOIN_CHAT_SUCCESS,
                dataJoin: data
            })
        })
    }
};
