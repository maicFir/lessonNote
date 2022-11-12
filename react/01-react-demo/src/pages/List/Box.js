
import React from "react";
import OtherContent from './OtherContent'
import { ColorContext } from './index';

class Box extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            divStyle: {
                width: props.count ? `${props.count * 100}px` : '200px',
                height: props.count ? `${props.count * 100}px` : '200px',
            },
            color: 'red'
        }
    }
    // 优化，默认是返回true,如果返回false,则不会渲染组件
    // shouldComponentUpdate(nextProps, nextState) {
    //     if (this.props.count !== nextProps.count) {
    //         return true
    //     }
    //     if (this.state.color !== nextState.color) {
    //         return true;
    //     }
    //     return false
    // }
    updateStyle = () => {
        const { divStyle } = this.state;
        if (this.props.count === 0) {
            return divStyle
        }
        return {
            width: `${this.props.count * 100}px`,
            height: `${this.props.count * 100}px`,
        }
    }
    handleChangeBg = () => {
        this.setState({
            color: this.state.color === 'red' ? 'green' : 'red'
        })
    }
    render() {
        return (<div style={{ ...this.updateStyle(), backgroundColor: this.state.color }} onClick={this.handleChangeBg}>
            <p>color: {this.state.color}</p>
            <p>count: {this.props.count}</p>
            <ColorContext.Consumer>
                {
                    ({ changeColor }) => {
                        return (<>
                            <a href="javascript:void(0)" onClick={(e) => {
                                changeColor();
                                e.stopPropagation();
                            }}>改变OtherContent</a>
                            <OtherContent></OtherContent>
                        </>)
                    }
                }
            </ColorContext.Consumer>

        </div>)
    }
}
export default Box