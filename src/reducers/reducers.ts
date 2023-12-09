// reducers.js
import {REPLACE} from '../actions/actions';

const initialState = {
    grid: new Array(7).fill(0).map(() => new Array(48).fill(0)),
    isSelecting: false
};

const gridReducer = (state = initialState, action) => {
    // console.log(action)
    switch (action.type) {
        case REPLACE:
            return {
                ...state,
                grid: action.payload.grid,
            };
        default:
            return state;
    }
};

export default gridReducer;
