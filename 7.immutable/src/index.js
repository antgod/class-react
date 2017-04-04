import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Map, is } from 'immutable'
import _ from 'lodash'

let root = document.getElementById('app')

class ShouldComponentUpdate extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    const thisProps = this.props || {};
    const thisState = this.state || {};

    if (Object.keys(thisProps).length !== Object.keys(nextProps).length ||
      Object.keys(thisState).length !== Object.keys(nextState).length) {
      return true;
    }

    for (const key in nextProps) {
      if (nextProps.hasOwnProperty(key) &&
        !is(thisProps[key], nextProps[key])) {
        return true;
      }
    }

    for (const key in nextState) {
      if (nextState.hasOwnProperty(key) &&
        !is(thisState[key], nextState[key])) {
        return true;
      }
    }

    return false;
  }
  render() {
    // 当节点的状态发生变化时，不会重新渲染ShouldComponentUpdate，只会渲染变化的节点以及父节点
    return <div>效果直接看代码注释</div>
  }
}

class SetState extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: { times: 0 },
    }
  }

  componentDidMount(){
    this.handleAdd()
  }

  handleAdd() {
    let data = _.cloneDeep(this.state.data)
    data.times = data.times + 1
    this.setState({ data: data })
    // 如果上面不做 cloneDeep，下面打印的结果会是加 1 后的值
    console.log(this.state.data.times)
  }

  render() {
    return <div>{this.state.data.times}</div>
  }
}

class SetStateImmutable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: Map({ times: 0 }),
    }
  }

  componentDidMount(){
    this.handleAdd()
  }

  handleAdd() {
    this.setState(({ data }) => ({
      data: data.update('times', v => v + 1),
    }))
    // 这时的 times 并不会改变
    console.log(this.state.data.get('times'))
  }

  render() {
    return <div>{this.state.data.get('times')}</div>
  }
}


ReactDOM.render(
  <div>
    <ShouldComponentUpdate />
    <SetState />
    <SetStateImmutable />
  </div>, root
)