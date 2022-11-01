

import React from "react";
class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            price: 0,
            type: 0, // 0 人民币 1 代表美元
        }
    }
    handleAdd = () => {
        // this.setState({
        //     count: ++this.state.count
        // })
        this.setState(state => {
            return {
                ...state,
                count: state.count + 1
            }
        })
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
        const ExchangeInput = ({ price, handleChange, type }) => {
            return (<fieldset>
                <legend>{type === "RmbInput" ? '人民币' : '美元'}</legend>
                <input value={price}
                    onChange={handleChange} />
            </fieldset>)
        }
        const rmbVal = type === 0 ? price : price * 7.34;
        const dollVal = type === 1 ? price : 0.14 * price;
        return (<div className="list-app" style={{ padding: '10px' }}>
            <hr />
            <button onClick={this.handleAdd}>+</button>
            <span>{count}</span>
            <button onClick={this.handleReduce}>-</button>
            <hr />
            {/* <RmbInput handleChange={this.handleRmbInput} price={rmbVal} /> */}
            <ExchangeInput handleChange={this.handleRmbInput} price={rmbVal} type="RmbInput"></ExchangeInput>
            <hr></hr>
            {/* <DollarInput handleChange={this.handleDollInput} price={dollVal} /> */}
            <ExchangeInput handleChange={this.handleDollInput} price={dollVal} type="DollarInput"></ExchangeInput>
        </div>)
    }
}
export default List