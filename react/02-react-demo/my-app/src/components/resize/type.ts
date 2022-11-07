export interface SizeInfo {
    width: number
    height: number
    offsetWidth: number
    offsetHeight: number
}

export type OnResize = (size: SizeInfo, element: HTMLElement) => void

export type ResizeListener = (element: Element | HTMLElement) => void

export interface ResizeObserverProps {
    /** 使用附加数据传递给 ResizeObserver.Collection */
    data?: any
    children: React.ReactNode | ((ref: React.RefObject<any>) => React.ReactElement)
    disabled?: boolean
    /** 如果元素调整大小则触发。 第一次渲染时总是会触发。 */
    onResize?: OnResize
}
