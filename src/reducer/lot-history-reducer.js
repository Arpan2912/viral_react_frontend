import { SET_LOT_HISTORY_DATA } from '../constants/action-type';

const initialState = {
    lotHistory: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_LOT_HISTORY_DATA:
            return {
                ...state,
                lotHistory: action.payload,
            };

        default:
            return state;
    }
}