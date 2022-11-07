
/**
 * @description 请添加Index组件的描述和注释!!!
 *
 * @date 创建时间 2022-10-08 19:40
 * @author 开发人员
 */

import React from "react"
import { observe, unobserve } from "./observerUtil"
import type { ResizeObserverProps } from "./type"
import DomWrapper from "./DomWrapper"

interface Props {
    children?: React.ReactNode
}


const Overflow: React.FC<Props> = props => {
    const {} = props
   

    return <>{props.children}</>
}

export default Overflow
