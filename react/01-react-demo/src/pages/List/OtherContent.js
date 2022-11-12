
import React from "react";
import { ColorContext } from './index';
const OtherContent = () => {
    const state = React.useContext(ColorContext);
    console.log(state);
    const Pdom = () => <p style={{ color: state.color }}>context: {state.text}</p>
    return <Pdom></Pdom>
}

export default OtherContent;