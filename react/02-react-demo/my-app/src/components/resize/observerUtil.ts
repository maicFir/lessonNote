import ResizeObserver from "resize-observer-polyfill"
import { ResizeListener } from "./type"

const elementListeners = new Map<Element, Set<ResizeListener>>()

function onResize(entities: ResizeObserverEntry[]) {
    entities.forEach(entity => {
        const { target } = entity
        elementListeners.get(target)?.forEach(listener => listener(target))
    })
}

// 注意：ResizeObserver polyfill 不支持测量边框调整大小的选项
const resizeObserver = new ResizeObserver(onResize)

// ============================== Observe ==============================
export function observe(element: Element, callback: ResizeListener) {
    if (!elementListeners.has(element)) {
        elementListeners.set(element, new Set())
        resizeObserver.observe(element)
    }

    elementListeners.get(element)!.add(callback)
}

export function unobserve(element: Element, callback: ResizeListener) {
    if (elementListeners.has(element)) {
        elementListeners.get(element)!.delete(callback)
        if (!elementListeners.get(element)!.size) {
            resizeObserver.unobserve(element)
            elementListeners.delete(element)
        }
    }
}
