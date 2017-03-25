import { createStore ,combineReducers} from 'redux';
var ADD_TODO="ADD_TODO";

function todos(state = [], action) {
    switch (action.type) {
        case 'ADD_TODO':
            return state.concat([action.text])
        default:
            return state
    }
}
function counter(state = 0, action) {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1
        case 'DECREMENT':
            return state - 1
        default:
            return state
    }
}

var combineReducer=combineReducers({
    todos,
    counter
});


var store = createStore(combineReducer);

store.dispatch({
    type: 'ADD_TODO',
    text: 'Use Redux'
});

store.dispatch({
    type: 'INCREMENT'
});

console.log('改变后的 state :', store.getState())