import React from "react";
import classNames from "classnames";

interface SkeletonProps {
    /* 是否显示骨架屏，true显示 */
    isVisible?: boolean;
    /* 骨架屏递归层数 */
    depth?: number;
    /* 渲染的内容 */
    children?: React.ReactElement;
}

const createSkeleton = (child: React.ReactElement, depth: number, current: number) => {
    // 递归层数到了，或者带有 data-skeleton-ignore属性，不进行绘制
    console.log(child.type, current);
    if (!child) {
        return null;
    }
    // else if (child.type === "img") {
    //     const originClass = child.props?.className;
    //     // 保留部分样式，与react-skeleton的样式
    //     const classes = classNames('react-skeleton2', {
    //         [originClass]: originClass
    //     })
    //     console.log(classes);
    //     return <div className={classes}>
    //         *
    //     </div>
    // }

    else if (current < depth) {
        // 没有递归到最深一层
        // 每一层都用一个div代替
        const children = child.props?.children;
        const originClass = child.props?.className;
        // 保留部分样式，与react-skeleton的样式
        const classes = classNames('react-skeleton', {
            [originClass]: originClass
        })
        //
        return <div className={classes} key={Math.random() * 100000}>
            {
                children && children.length > 0 && React.Children.map(children, (c, idx) => {
                    return createSkeleton(c, depth, current + 1);
                })
            }
        </div>
    } else {
        // 递归到了最深层
        const originClass = child.props?.className;
        // 保留部分样式，与react-skeleton的样式
        const classes = classNames('react-skeleton2', {
            [originClass]: originClass
        })
        return <div className={classes}>
            *
        </div>
    }
};


const Skeleton: React.FC<SkeletonProps> = (props) => {
    const {isVisible, depth = 2, children} = props;
    if (!children) return <div></div>

    if (isVisible) {
        return createSkeleton(children, depth, 1);
    } else {
        return children ? children : <div></div>
    }
}

export default Skeleton;