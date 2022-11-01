
import React from "react";

const Title = (props) => {
    return (<div className="title" style={{ display: 'flex' }}>
        {props.children}
    </div>)
}
const Content = (props) => {
    return (<div className="content" style={{ ...props.style }}>
        {props.left}
        {props.children}
        {props.right}
    </div>)
}

const About = () => {
    const Left = () => (<div>left</div>);
    const Right = () => (<div>right</div>);
    return (<div>
        <Title>
            <h1>Web技术学苑</h1>
            <div>Maic</div>
        </Title>
        <Content style={{ padding: '10px' }} left={<Left />} right={<Right />}>
            <div>center</div>
        </Content>
    </div>)
}

export default About;