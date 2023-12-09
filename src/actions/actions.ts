export const REPLACE = 'REPLACE';
export const SET_IS_SELECTING = 'SET_IS_SELECTING';
export const SET_LAST_ENTER_IDX = 'SET_LAST_ENTER_IDX'
export const OUTSIDE_MOUSE_UP = 'OUTSIDE_MOUSE_UP'

export const replace = (grid) => ({
    type: REPLACE,
    payload: {grid}
});

export const setIsSelecting = (isSelecting) => ({
    type: SET_IS_SELECTING,
    payload: {isSelecting}
});

export const setLastEnterIdx = (row, column) => ({
    type: SET_LAST_ENTER_IDX,
    payload: {row, column}
});

export const outSideMouseUp = () => ({
    type: OUTSIDE_MOUSE_UP,
    payload: {}
});


