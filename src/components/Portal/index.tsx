import React, {useEffect, useRef, forwardRef, useImperativeHandle, useState} from 'react';
import ReactDOM from 'react-dom';

export interface PortalProps {
    /** 蒙层的dom容器id */
    domId: string;
    /** 是否显示 */
    isShow: boolean;
    /** 渲染的子代 */
    children: React.ReactNode;
}

export type PortalRef = {
    /** 改变是否显示 */
    getContainer: () => React.ReactNode;
}

const Portal = forwardRef<PortalRef, PortalProps>((props, ref) => {
    const { isShow, domId, children } = props;
    const containerRef = useRef<HTMLElement>();
    // const [show, setShow] = useState(true);

    const getContainer = () => {
        return containerRef.current as React.ReactNode;
    }

    useImperativeHandle(ref, () => {
        return {
            getContainer
        }
    })

    useEffect(() => {
        if (containerRef.current) return;

        containerRef.current = document.createElement("div");
        containerRef.current?.setAttribute("id", domId);
        document.body.appendChild(containerRef.current);
        return () => {
            // 移出该元素
            if (containerRef.current) document.body.removeChild(containerRef.current as Node);
        }
    }, [])

    if (!containerRef.current) return null;

    return ReactDOM.createPortal(
        <div style={{display: isShow ? "block" : "none"}}>{
            children
        }</div>, containerRef.current)
})

export default Portal;
