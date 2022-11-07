/**
 * @description 请添加Index组件的描述和注释!!!
 *
 * @date 创建时间 2022-10-08 19:40
 * @author 开发人员
 */

import React, { useRef } from "react"

import { observe, unobserve } from "./observerUtil"
import { OnResize, ResizeListener } from "./type"

interface Props {
    className?: string
    onResize: OnResize
    children?:React.ReactNode
}

// onResize={({ offsetWidth }) => {
//     internalRegisterSize(offsetWidth);
//   }}
const ResizeObserverComp: React.FC<Props> = props => {
    const { className = "", onResize } = props

    const currentElement = useRef<HTMLDivElement>(null)

    const sizeRef = React.useRef({
        width: -1,
        height: -1,
        offsetWidth: -1,
        offsetHeight: -1
    })

    // Handler
    const onInternalResize = React.useCallback(
        (target: HTMLElement) => {
            const { width, height, left } = target.getBoundingClientRect()
            const { offsetWidth, offsetHeight, offsetLeft } = target

            /**
             * 当内容大小改变时调整观察者触发器。
             * 在大多数情况下，我们只关心元素大小，
             * 让我们在这里使用 `boundary` 而不是 `contentRect` 以避免晃动。
             */
            const fixedWidth = Math.floor(width)
            const fixedHeight = Math.floor(height)

            if (
                sizeRef.current.width !== fixedWidth ||
                sizeRef.current.height !== fixedHeight ||
                sizeRef.current.offsetWidth !== offsetWidth ||
                sizeRef.current.offsetHeight !== offsetHeight
            ) {
                const size = { width: fixedWidth, height: fixedHeight, offsetWidth, offsetHeight }
                sizeRef.current = size

                // IE很奇怪吧？
                const mergedOffsetWidth = offsetWidth === Math.round(width) ? width : offsetWidth
                const mergedOffsetHeight = offsetHeight === Math.round(height) ? height : offsetHeight
                const mergedOffsetLeft = offsetLeft === Math.round(left) ? left : offsetLeft

                const sizeInfo = {
                    ...size,
                    offsetWidth: mergedOffsetWidth,
                    offsetHeight: mergedOffsetHeight,
                    offsetLeft: mergedOffsetLeft
                }

                // 让collection知道发生了什么
                //   onCollectionResize?.(sizeInfo, target, data);

                if (onResize) {
                    // 推迟回调但不推迟到下一帧
                    Promise.resolve().then(() => {
                        onResize(sizeInfo, target)
                    })
                }
            }
        },
        [onResize]
    )

    // Dynamic observe
    React.useEffect(() => {
        if (currentElement.current) {
            observe(currentElement.current, onInternalResize as ResizeListener)
        }

        return () => {
            currentElement.current && unobserve(currentElement.current, onInternalResize as ResizeListener)
        }
    }, [])

    return (
        <div ref={currentElement} className={className} style={{position: 'relative'}}>
            {props.children}
        </div>
    )
}

export default ResizeObserverComp
