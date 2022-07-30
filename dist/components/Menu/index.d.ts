import React from "react";
import { MenuItemProps } from "./MenuItem";
import { SubMenuProps } from "./SubMenu";
declare type Mode = "horizontal" | "vertical";
/**
 * @param {number} selectedIndex 当前被选中项的索引
 * @param {string} className 自定义样式类
 * @param {Mode} mode 模式
 * @param {Function} onSelect 菜单项被选中后触发的回调
 * @param {string[]} defaultOpenedSubMenus 默认展开的二级菜单
 * @param {React.CSSProperties} styles 行内样式
 */
export interface MenuProps {
    selectedIndex: string;
    mode?: Mode;
    onSelect?: (idx: string) => void;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    defaultOpenedSubMenus?: string[];
}
declare type IMenuContext = Pick<MenuProps, "selectedIndex" | "onSelect" | "mode" | "defaultOpenedSubMenus">;
export declare const MenuContext: React.Context<IMenuContext>;
export declare type TransMenu = React.FC<MenuProps> & {
    MenuItem: React.FC<MenuItemProps>;
    SubMenu: React.FC<SubMenuProps>;
};
declare const MenuComponent: TransMenu;
export default MenuComponent;
