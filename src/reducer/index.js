import { combineReducers } from "redux";
import headerReducer from "./header-reducer";
import lotHistoryReducer from "./lot-history-reducer";

export default combineReducers({
    headerReducer: headerReducer,
    lotHistoryReducer
})