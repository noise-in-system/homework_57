import {OUTSIDE_MOUSE_UP, REPLACE, SET_IS_SELECTING, SET_LAST_ENTER_IDX} from '../actions/actions';

const initialState = {
    grid: new Array(7).fill(0).map(() => new Array(48).fill(0)),
    isSelecting: false,
    lastEnterRow: -1,
    lastEnterColumn: -1
};

const gridReducer = (state = initialState, action) => {
    switch (action.type) {
        case REPLACE:
            return {
                ...state,
                grid: action.payload.grid,
            };
        case SET_IS_SELECTING:
            return {
                ...state,
                isSelecting: action.payload.isSelecting
            }
        case SET_LAST_ENTER_IDX:
            return {
                ...state,
                lastEnterRow: action.payload.row,
                lastEnterColumn: action.payload.column,
            }
        case OUTSIDE_MOUSE_UP:
            // console.log('reducer', state.grid)
            return {
                ...state,
                isSelecting: false,
                lastEnterRow: -1,
                lastEnterColumn: -1,
                grid: state.grid.map(row => row.map(column => {
                    if (column === 0) return 0
                    return 2
                }))
            }
        default:
            return state;
    }
};

export default gridReducer;
