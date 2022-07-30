import React from "react";
export interface TabItemProps {
    /**
     * 索引
     */
    index?: number;
    /**
     * 标题
     */
    title: string;
    /**
     * 渲染内容
     */
    children?: React.ReactNode;
    className?: string;
    styles?: React.CSSProperties;
    /**
     * 是否禁用
     */
    disabled?: boolean;
}
declare const TabItem: React.FC<TabItemProps>;
export default TabItem;
