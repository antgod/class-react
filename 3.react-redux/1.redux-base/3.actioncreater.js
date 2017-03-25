import { createStore } from 'redux';
var ADD_TODO="ADD_TODO";
var reducer = function (state = 0, action) {
    switch (action.type) {
        case ADD_TODO:
            return action.text;
        default:
            return state
    }
};

var store = createStore(reducer);

var render = function () {
    document.body.innerHTML = store.getState();
};
render();

store.subscribe(render);



function addTodo(text) {
    return {
        type: ADD_TODO,
        text
    };
}
store.dispatch(addTodo('test'));

