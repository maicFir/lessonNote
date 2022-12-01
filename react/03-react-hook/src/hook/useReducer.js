import { useState } from 'react'
// 自定义一个reducer
export function useReducer(reducer, initState) {
    const [state, setState] = useState(initState);
    function dispatch(action) {
        const nextState = reducer(state, action);
        setState(nextState);
    }
    return [state, dispatch]
}