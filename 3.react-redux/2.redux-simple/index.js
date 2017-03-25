import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

// Reducer
function reducer(state =0 , action) {
  switch (action.type) {
    case 'increase':
      return ++state;
    default:
      return state
  }
}

// Action
const increaseAction = { type: 'increase' };

// Store
let store = createStore(reducer);

// 这是一个展示型组件 Counter
class Counter extends Component {
  render() {
    const { state, dispatch } = this.props;
    return (
        <div>
          <span>{state}</span>
          <button onClick={()=>{
              dispatch(increaseAction);
          }}>戳我加1</button>
        </div>
    )
  }
}

// Map Redux state to component props
function mapState(state) {
  return {
    state
  }
}

// Connected Component
let RootApp = connect(
  mapState
)(Counter);

ReactDOM.render(
  <Provider store={store}>
    <RootApp />
  </Provider>,
  document.getElementById('app')
);
