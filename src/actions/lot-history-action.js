import {
  SET_LOT_HISTORY_DATA
} from "../constants/action-type";

export const setLotHistoryData = (payload) => dispatch => {
  console.log("fetch posts");
  dispatch({
      type: SET_LOT_HISTORY_DATA,
      payload: payload,

  });
  return Promise.resolve();
}