import {combineReducers} from 'redux';
import { routeReducer } from 'react-router-redux'

const quilt = (state, action) => {
    switch (action.type) {
        case 'ADD_QUILT':
            return {
                id: action.id,
                text: action.text,
                completed: false
            };
        default:
            return state;
    }
};

const quilts = (state = [], action) => {
    switch (action.type) {
        case 'ADD_QUILT':
            return [
                ...state,
                quilt(undefined, action)
            ];
        default:
            return state;
    }
};


const app = combineReducers({
    routing: routeReducer,
    quilts
});

export default app;