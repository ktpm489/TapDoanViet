import * as ActionType from './ActionTypes';
import * as URL from '../Constants'

export const getListUserChat = (token, page, pageSize) => {
    return (dispatch) => {
        fetch(URL.BASE_URL + PAHT_GET_MESSAGE + '?page=' + page + '&pageSize=' + pageSize, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }).then((data) => data.json()).then(data => {
          dispatch({
              type:ActionType.GET_USER_CHAT,
              listUserChat:data
          })
        })
    }
};