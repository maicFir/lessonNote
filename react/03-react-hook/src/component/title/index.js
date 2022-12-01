import React, { useState, useEffect, useRef, useReducer, useCallback, memo, useMemo } from "react";
// import { useReducer } from '../../hook/useReducer'
function addReducer(state, action) {
    console.log(state, 'state')
    switch (action.type) {
        case 'add':
            return [...state, {
                ...action.payload
            }];
        default:
            return state;
    }
}

function Title() {
    const [count, setCount] = useState(0);
    const prevCount = useRef(0);
    const [data, dispatch] = useReducer(addReducer, []);
    const [val, setValue] = useState('Web技术学苑');
    const inputRef = useRef();
    const add = () => {
        console.log(count, 'before count1')
        setCount(count + 1);
        console.log(count, 'before count2')
    }
    const dispatchAdd = () => {
        dispatch({
            type: 'add',
            payload: {
                name: inputRef.current.value
            }
        })
    }
    useEffect(() => {
        console.log(count, 'after count title')
        document.title = count;
        prevCount.current = count;
        // const timer = setInterval(() => {
        //     setCount(count => count + 1);
        // }, 1000)
        return () => {
            // clearInterval(timer)
            console.log('清除副作用')
        }
    })

    const renderText = () => {
        console.log(count, 'render')
        return count
    }
    const renderData = () => {
        console.log(data)
        return data.map((v, index) => <p key={index}>{v.name}-{index}</p>)
    }
    const Pom = (props) => props.data.map((v, index) => <p key={index}>{v.name}-{index}</p>)
    const List = memo(() => <Pom data={data}></Pom>)
    // const handleChangeVal = (e) => {
    //     setValue(e.target.value)
    // }
    const handleChangeVal = useCallback((e) => {
        setValue(e.target.value)
    }, [])

    const input = useMemo(() => <input placeholder="请输入内容..." ref={inputRef} value={val} onChange={handleChangeVal} />, [val])
    // console.log(input, 'input')
    return (<>
        <p>prev:{prevCount.current}</p>
        <p>now: {renderText()}</p>
        <button onClick={add}>添加</button>
        {/* <input placeholder="请输入内容..." ref={inputRef} value={val} onChange={handleChangeVal} /> */}
        {input}
        <button onClick={dispatchAdd}>dispatchAdd</button>

        {/* {renderData()} */}
        <List></List>
    </>)
}

export default Title