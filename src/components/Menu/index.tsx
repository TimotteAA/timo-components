import React, { useState, createContext } from "react";
import classNames from "classnames";
import MenuItem, { MenuItemProps } from "./MenuItem";
import SubMenu, { SubMenuProps } from "./SubMenu";

type Mode = "horizontal" | "vertical";

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

type IMenuContext = Pick<
  MenuProps,
  "selectedIndex" | "onSelect" | "mode" | "defaultOpenedSubMenus"
>;

export const MenuContext = createContext<IMenuContext>({ selectedIndex: "0" });

/**
 * @param {number} selectedIndex 当前被选中项的索引
 * @param {string} className 自定义样式类
 * @param {Mode} mode 模式
 * @param {Function} onSelect 菜单项被选中后触发的回调
 * @param {string[]} defaultOpenedSubMenus 默认展开的二级菜单
 * @param {React.CSSProperties} styles 行内样式
 */
const Menu: React.FC<MenuProps> = (props) => {
  const {
    className,
    style,
    mode = "horizontal",
    onSelect,
    selectedIndex = "0",
    children,
    defaultOpenedSubMenus = [],
  } = props;

  const [activeIndex, setactiveIndex] = useState(selectedIndex);

  const classes = classNames("menu", className, {
    "menu-vertical": mode === "vertical",
    "menu-horizontal": mode === "horizontal",
  });

  const handleMenuItemClick = (index: string) => {
    setactiveIndex(index);
    onSelect && onSelect(index);
  };

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement =
        child as React.FunctionComponentElement<MenuItemProps>;
      const { name } = childElement.type;

      if (name === "MenuItem" || name === "SubMenu") {
        return React.cloneElement(childElement, { index: index.toString() });
      } else {
        console.error("类型不对哇");
      }
    });
  };

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider
        value={{
          selectedIndex: activeIndex,
          onSelect: handleMenuItemClick,
          mode,
          defaultOpenedSubMenus,
        }}
      >
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};

export type TransMenu = React.FC<MenuProps> & {
  MenuItem: React.FC<MenuItemProps>,
  SubMenu: React.FC<SubMenuProps>
}

const MenuComponent = Menu as TransMenu;
MenuComponent.SubMenu = SubMenu;
MenuComponent.MenuItem = MenuItem;
export default MenuComponent;
