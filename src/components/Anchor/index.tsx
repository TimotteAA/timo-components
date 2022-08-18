import React, { useState, useMemo, useEffect } from "react";
import classNames from "classnames";
import { useThrottleFn } from "ahooks";
import animateScrollTo from 'animated-scroll-to';

// 锚点的数据结构
export type AnchorData = {
    /** 列表索引 */
    index: number;
    /** dom节点id */
    label: string;
    /** 平铺的层级 */
    level: number;
}

export interface AnchorProps {
    /** 目录标题 */
    title?: string;
    /** 目录数据 */
    anchorData: AnchorData[];
    /** 原生样式 */
    styles?: React.CSSProperties;
    /** 滚动的容器道浏览器页面坐标系顶部的距离 */
    offsetTop: number;
}

const Anchor: React.FC<AnchorProps> = (props) => {
    const { anchorData, title, styles, offsetTop = 200 } = props;
    const [ current, setCurrent ] = useState<AnchorData>(anchorData[0]);

    // 当前项的滚动距离
    const transformDist = useMemo(() => {
        return `${current.index * 100}%`
    }, [current])


    // 滚动高亮
    const { run: handleScroll } = useThrottleFn(() => {
        const domArray: { label: string; top: number, level: number }[] = [];
        if (
            Math.ceil(document.documentElement.clientHeight + window.scrollY) >=
            document.body.scrollHeight
        ) {
            // 滚到了最后一个
            setCurrent({...anchorData[anchorData.length - 1]});
        } else {
            // 所有目录项的滚动情况
            anchorData.forEach((item) => {
                const dom = document.getElementById(item.label);
                if (dom && dom.getBoundingClientRect().top > 0) {
                    domArray.push({
                        label: item.label,
                        top: Math.abs(dom.getBoundingClientRect().top) - offsetTop,
                        level: item.level
                    })
                }
            });
            if (domArray.length) {
                // top属性排序
                // 里视口最近的！
                domArray.sort((a, b) => Math.abs(a.top) - Math.abs(b.top));
                const { label } = domArray[0];
                const index = anchorData.findIndex((item) => item.label === label);
                const newCurrent = anchorData[index];
                setCurrent({...newCurrent});
            }
        }
    },
        { wait: 150, leading: true })

    // 监听滚动事件
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll",  handleScroll);
        }
    })

    // 原生滚动带来的问题：window.scrollInto会让多个亮起
    // 解决是点击时取消监听滚动，滚动结束监听滚动，问题是原生的dom没有提供相应的滚动结束api
    const scrollToAnchor = (anchor: AnchorData) => {
        window.removeEventListener("scroll", handleScroll);
        setCurrent({...anchor});
        const label = anchor.label;
        animateScrollTo(
            document.getElementById(label)!.getBoundingClientRect().top -
            document.body.getBoundingClientRect().top -
            offsetTop,
            { speed: 100 }
        ).then(() => {
            // 滚动完成，添加滚动事件
            window.addEventListener("scroll", handleScroll)
        })
    }

    return <div className={"anchor-wrapper"} style={styles}>
        { title && <div className={"anchor-header"}>{ title }</div> }
        {
            anchorData.map(anchor => {
                const itemClasses = classNames("anchor-item", {
                    "anchor-item-active": current.label === anchor.label
                })

                return <div key={anchor.label} className={itemClasses} onClick={() => scrollToAnchor(anchor)}>
                  <span style={{paddingLeft: `${anchor.level * 10}px`}}>{ anchor.label }</span>
                </div>
            })
        }
    </div>
}

export default Anchor
