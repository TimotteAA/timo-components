import React, { useState, useRef, useMemo, useCallback } from "react";

// 虚拟列表组件，利用可视区渲染
// 外部一个Container组件，高度写死
// 内部一个ItemList，高度为Item.length * itemHeight，来撑开外部的Container
// 监听Container上的滚动事件，用来计算startIdx，endIdx

export interface VirtualListProps {
    /** 容器高度 */
    containerHeight?: number;
    /** 要渲染的数据 */
    data: string[];
    /** 单独一项的高度 */
    itemHeight?: number;
    /** 渲染一个子项 */
    renderItem?: () => React.ReactNode;
}

const VirtualList: React.FC<VirtualListProps> = (props) => {
    const { containerHeight = 500, data, itemHeight = 50, renderItem } = props;
    const [startIdx, setStartIdx] = useState(0);
    // container的ref，用以判断滚动事件
    const containerRef = useRef<HTMLDivElement>();

    // 撑起container的列表长度
    const listHeight = useMemo(() => {
        return data.length * itemHeight;
    }, [data, itemHeight]);

    // 可视区域最多显示的条数
    const limit = useMemo(() => {
        return Math.ceil(containerHeight / itemHeight);
    }, [startIdx]);

    // 可视区的结束索引
    const endIdx = useMemo(() => {
        return Math.min(startIdx + limit, data.length)
    }, [startIdx, limit, data]);

    // 监听滚动事件，用来计算开始索引
    const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
        const target = e.target;
        if (target !== containerRef.current) return;
        // @ts-ignore
        const scrollDist = e.target.scrollTop;
        const currentIdx = Math.floor(scrollDist / itemHeight);
        if (currentIdx !== startIdx) {
            setStartIdx(currentIdx);
        }
        console.log("currentIdx:", currentIdx)
    }, [itemHeight, startIdx]);

    // 默认的渲染rows
    const defaultRenderItem = useCallback(function () {
        const rows = [];
        for (let i = startIdx; i <= endIdx; i++) {
            // 渲染每个列表项
            rows.push(<div
                key={i}
                style={{
                    width: "100%",
                    height: itemHeight - 1 + "px",
                    borderBottom: "1px solid #aaa",
                    position: "absolute",
                    top: i * itemHeight + "px",
                    left: 0,
                    right: 0,
                }}>{data[i]}</div>)
        }
        return rows;
    }, [startIdx, endIdx])

    return <div className={"virtual-list-container"} style={{height: `${containerHeight}px`}}
        onScroll={handleScroll} ref={containerRef}
    >
        <div className={"virtual-list-item-list"} style={{height: `${listHeight}px`}}>
            {
                renderItem ? renderItem() : defaultRenderItem()
            }
        </div>
    </div>
}

export default VirtualList;
