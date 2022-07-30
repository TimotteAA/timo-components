import React from "react";
/**
 * @param {number} index 索引
 * @param {string} className 自定义样式类
 * @param {boolean} disabled 能否被选择
 */
export interface MenuItemProps {
    index?: string;
    className?: string;
    disabled?: boolean;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}
declare const MenuItem: React.FC<MenuItemProps>;
export default MenuItem;
