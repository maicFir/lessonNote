
import React from "react";
import Box from './Box'
const ExchangeInput = ({ price, handleChange, type }) => {
    return (<fieldset>
        <legend>{type === "RmbInput" ? '人民币' : '美元'}</legend>
        <input value={price}
            onChange={handleChange} />
    </fieldset>)
}
const initColor = {
    color: 'yellow',
    text: '黄色',
    changeColor: () => { }
}
export const ColorContext = React.createContext(initColor);

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            price: 0,
            type: 0, // 0 人民币 1 代表美元
            initColor: {
                ...initColor,
                changeColor: this.changeColor
            },

        }
    }
    changeColor = () => {
        this.setState((state, props) => {
            return {
                ...state,
                initColor: {
                    ...state.initColor,
                    color: this.state.initColor.color === 'yellow' ? 'blue' : 'yellow',
                    text: this.state.initColor.text === '黄色' ? '蓝色' : '黄色',

                }
            }
        })
    }
    handleAdd = () => {
        // console.log(this.setState)
        // this.setState({
        //     count: 2
        // })
        // console.log(1111)
        // console.trace()
        // this.setState({
        //     count: ++this.state.count
        // });
        this.setState(state => {
            return {
                ...state,
                count: state.count + 1
            }
        }, () => {
            // console.log(this.state, 'count')
        })
        // console.log(this.state, 'count')
    }
    handleReduce = () => {
        this.setState(state => {
            return {
                count: state.count - 1
            }
        })
    }
    handleRmbInput = (e) => {
        const val = e.target.value;
        console.log(e)
        this.setState({
            price: val,
            type: 0
        })
    }
    handleDollInput = (e) => {
        const val = e.target.value;
        this.setState({
            price: val,
            type: 1
        })
    }

    render() {
        // console.log(222)
        // console.trace();
        const { count, price, type } = this.state;
        const RmbInput = ({ price, handleChange }) => {
            return (<fieldset>
                <legend>人民币</legend>
                <input value={price}
                    onChange={handleChange} />
            </fieldset>)
        };
        const DollarInput = ({ price, handleChange }) => {
            return (<fieldset>
                <legend>美元</legend>
                <input value={price}
                    onChange={handleChange} />
            </fieldset>)
        };
        const rmbVal = type === 0 ? price : price * 7.34;
        const dollVal = type === 1 ? price : 0.14 * price;
        return (<div className="list-app" style={{ padding: '10px' }}>
            <hr />
            <button onClick={this.handleAdd}>+</button>
            <span>{count}</span>
            <button onClick={this.handleReduce}>-</button>
            <hr />
            <ColorContext.Provider value={this.state.initColor} >
                <Box count={count}></Box>
            </ColorContext.Provider>

            <hr></hr>
            {/* <RmbInput handleChange={this.handleRmbInput} price={rmbVal} /> */}
            <ExchangeInput handleChange={this.handleRmbInput} price={rmbVal} type="RmbInput"></ExchangeInput>
            <hr></hr>
            {/* <DollarInput handleChange={this.handleDollInput} price={dollVal} /> */}
            <ExchangeInput handleChange={this.handleDollInput} price={dollVal} type="DollarInput"></ExchangeInput>
        </div>)
    }
}
export default List