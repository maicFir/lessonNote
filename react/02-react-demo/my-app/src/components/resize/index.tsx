/**
 * @description 请添加Index组件的描述和注释!!!
 *
 * @date 创建时间 2022-10-08 19:40
 * @author 开发人员
 */

import React, { useCallback, useLayoutEffect, useState, useMemo } from "react"
import Button from '@material-ui/core/Button';
import Grow from '@material-ui/core/Grow';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import ResizeObserverComp from "./ResizeObserver"
import { SizeInfo } from "./type"

import "./index.css"

interface Props {}



const MenuItemPrefixCls = `aui-nav-menu-item`
/** 用于“响应”。 它将限制渲染节点以避免性能问题 */
const MaxItemCount = 10

const Index: React.FC<Props> = props => {
    const {} = props
   

    // 收集所有子节点的宽度
    const [itemWidths, setItemWidths] = useState(new Map<React.Key, number>())

    // 父节点的宽度
    const [containerWidth, setContainerWidth] = useState<number | null>(null)

    const [prevRestWidth, setPrevRestWidth] = useState(0)

    const [restWidth, setRestWidth] = useState(0)

    const [suffixFixedStart, setSuffixFixedStart] = useState<number | null>(null)

    const [restReady, setRestReady] = useState(false)

    const [lastVisibleIndex, setLastVisibleIndex] = React.useState(0)

    const mergedContainerWidth = containerWidth || 0

    // 始终使用最大宽度以避免眨眼
    const mergedRestWidth = Math.max(prevRestWidth, restWidth)

    // 显示的个数
    const [displayCount, setDisplayCount] = useState<number | null>(null)

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const handleClose = (event: any) => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(true)
    };
  
    // 合并显示的个数
    const mergedDisplayCount = React.useMemo(() => {
        if (displayCount === null) {
            return Number.MAX_SAFE_INTEGER
        }

        return displayCount || 0
    }, [displayCount, containerWidth])

    /**所有的子节点 */
    const childNodeData = useMemo(() => {
        return new Array(8)
            .fill(0)
            .map((item, index) => (
                <ResizeObserverComp
                    key={`${MenuItemPrefixCls}${index}`}
                    className={'item1'}
                    onResize={size => registerSize(`${MenuItemPrefixCls}${index}`, size.offsetWidth)}
                >{`当前子节点内容${index + 1}`}</ResizeObserverComp>
            ))
    }, [])

    // ================================= Size =================================
    const onOverflowResize = useCallback((size: SizeInfo, element: HTMLElement) => {
        setContainerWidth(size.offsetWidth)
    }, [])

    function registerSize(key: React.Key, width: number | null) {
        setItemWidths(origin => {
            const clone = new Map(origin)

            if (width === null) {
                clone.delete(key)
            } else {
                clone.set(key, width)
            }
            return clone
        })
    }

    function registerOverflowSize(key: React.Key, width: number | null) {
        setRestWidth(width!)
        setPrevRestWidth(restWidth)
    }

    function updateDisplayCount(count: number, suffixFixedStartVal?: number | null, notReady?: boolean) {
        // 即使在某些情况下值相同，React 18 也会同步渲染。
        // 我们将`mergedData`作为deps，如果它是动态生成的，可能会导致死循环。
        // 参考：https://github.com/ant-design/ant-design/issues/36559

        const isSuffixFixedStartVal = typeof suffixFixedStartVal === "undefined"

        if (displayCount === count && (isSuffixFixedStartVal || suffixFixedStartVal === suffixFixedStart)) {
            return
        }

        setDisplayCount(count)

        if (!notReady) {
            setRestReady(count < childNodeData.length - 1)

            setLastVisibleIndex(count)
        }

        if (!isSuffixFixedStartVal) {
            setSuffixFixedStart(suffixFixedStartVal)
        }
    }

    function getItemWidth(index: number) {
        return itemWidths.get(`${MenuItemPrefixCls}${index}`)
    }

    /**当是`responsive`时，我们总是会渲染rest节点以获得它的真实宽度进行计算*/
    const mergedData = useMemo(() => {
        console.log("+++++", containerWidth)
        if (containerWidth === null) {
            return childNodeData
        }
        console.log(childNodeData.length, mergedContainerWidth / MaxItemCount)
        return childNodeData.slice(0, Math.min(childNodeData.length, mergedContainerWidth / MaxItemCount))
    }, [childNodeData, MaxItemCount, containerWidth])

    // 获取最后截断没有显示的节点菜单
    const omittedItems = useMemo(() => {
        return childNodeData.slice(mergedDisplayCount + 1)
    }, [childNodeData, mergedDisplayCount])

    console.log("======mergedData", mergedData, displayCount)
    // console.log("======omittedItems", omittedItems)
    // console.log("+++++itemWidths+++++", itemWidths)

    //显示的节点菜单
    const displayItems = useMemo(() => {
        if (!childNodeData.length) {
            return null
        }

        if (displayCount) {
            return childNodeData.slice(0, displayCount + 1)
        }

        return childNodeData
    }, [displayCount, childNodeData])
  
    const renderRawRest = useCallback((omitItems:any) => {
        // 我们使用原始列表，因为包装列表使用上下文来防止打开
        const len = omitItems.length

        console.log("=====omitItems", omitItems)
        // const originOmitItems = len ? childNodeData.slice(-len) : null

        return (
            <><ResizeObserverComp
                key={`${MenuItemPrefixCls}-rest`}
                onResize={size => registerOverflowSize(`${MenuItemPrefixCls}-rest`, size.offsetWidth)}
            >
                 <Button
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                >
                更多...
                </Button>
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList autoFocusItem={open} id="menu-list-grow">
                                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                                        <MenuItem onClick={handleClose}>My account</MenuItem>
                                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </ResizeObserverComp> 
         </>
        )

        // return (
        //     <SubMenu
        //         eventKey={OVERFLOW_KEY}
        //         title={overflowedIndicator}
        //         disabled={allVisible}
        //         internalPopupClose={len === 0}
        //         popupClassName={overflowedIndicatorPopupClassName}
        //     >
        //         {originOmitItems}
        //     </SubMenu>
        // )
    }, [])

    useLayoutEffect(() => {
        console.log("++++++useLayoutEffect:", mergedContainerWidth, mergedRestWidth, mergedData, itemWidths)
        if (mergedContainerWidth && mergedRestWidth && mergedData) {
            let totalWidth = 0

            console.log("++++totalWidth", totalWidth)

            const len = mergedData.length

            const lastIndex = len - 1

            // 当数据计数变为 0 时，重置它，因为不会循环到达
            if (!len) {
                updateDisplayCount(0, null)
                return
            }

            for (let i = 0; i < len; i += 1) {
                // 默认完全将始终呈现
                const currentItemWidth = getItemWidth(i) || 0

                // 由于数据未准备好而中断
                if (currentItemWidth === undefined) {
                    updateDisplayCount(i - 1, undefined, true)
                    break
                }

                // 寻找最佳匹配
                totalWidth += currentItemWidth

                console.log("++++++lastIndex:", i, totalWidth, currentItemWidth)

                if (
                    // 只有一个表示 `totalWidth` 是最终宽度
                    (lastIndex === 0 && totalWidth <= mergedContainerWidth) ||
                    //最后两个宽度将是最终宽度
                    (i === lastIndex - 1 && totalWidth + getItemWidth(lastIndex)! <= mergedContainerWidth)
                ) {
                    // 附加检查是否匹配结尾
                    updateDisplayCount(lastIndex, null)
                    break
                } else if (totalWidth + mergedRestWidth > mergedContainerWidth) {
                    // 不能hold住所有的内容以示休息
                    updateDisplayCount(i - 1, totalWidth - currentItemWidth + restWidth)
                    break
                }
            }
        }
    }, [mergedContainerWidth, itemWidths, restWidth, mergedData])

    const displayRest = restReady && !!omittedItems.length

    return (
        <>
            <div style={{ minHeight: "100px", margin: '100px 0', display: 'flex' }}>
                <ResizeObserverComp className={'index1'} onResize={onOverflowResize}>
                    {displayItems}
                </ResizeObserverComp>
                {renderRawRest(omittedItems)}
            </div>
            <div style={{  display:'flex',margin: '20px 0' }}>
                {displayRest ? omittedItems : null}
            </div>
        </>
    )
}

export default Index
