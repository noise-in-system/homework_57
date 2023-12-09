// reducers.js
import {REPLACE} from '../actions/actions';

const initialState = {
    grid: [],
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
