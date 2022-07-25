import React, { useState, useContext } from "react";
import classNames from "classnames";
import { CSSTransition } from "react-transition-group";
import { MenuContext } from "../";
import { MenuItemProps } from "../MenuItem";
import Icon from "../../Icon";

export interface SubMenuProps {
  index?: string;
  title: string;
  className?: string;
  children?: React.ReactNode;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const { selectedIndex, mode, defaultOpenedSubMenus } =
    useContext(MenuContext);

  const { children, index, title, className } = props;
  const isOpened =
    defaultOpenedSubMenus && index && mode === "vertical"
      ? defaultOpenedSubMenus.includes(index)
      : false;
  const [open, setOpen] = useState(isOpened);
  const classes = classNames("menu-item submenu-item", className, {
    "menu-item-active": selectedIndex === index,
    "submenu-item-opened": open,
  });

  const renderChildren = () => {
    const childrenElement = React.Children.map(children, (child, i) => {
      const c = child as React.FunctionComponentElement<MenuItemProps>;
      const { name } = c.type;
      if (name === "MenuItem") {
        return React.cloneElement(c, { index: `${index}-${i}` });
      } else {
        console.error("必须传入MenuItem类型的组件！");
      }
    });
    return (
      <CSSTransition in={open} timeout={300} appear unmountOnExit>
        <ul className="submenu">{childrenElement}</ul>
      </CSSTransition>
    );
  };

  // 水平模式下点击再显示子项
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(!open);
  };

  // 垂直模式下鼠标移入、移出控制是否显示
  const handleMouseMove = (e: React.MouseEvent, toggle: boolean) => {
    e.preventDefault();
    setOpen(toggle);
  };
  const clickEvents = {
    onClick:
      mode !== "horizontal"
        ? (e: React.MouseEvent) => {
            console.log(e.nativeEvent.target);
            handleClick(e);
          }
        : () => {},
  };

  const moveEvents = {
    onMouseMove:
      mode !== "vertical"
        ? (e: React.MouseEvent) => {
            handleMouseMove(e, true);
          }
        : () => {},
    onMouseLeave:
      mode !== "vertical"
        ? (e: React.MouseEvent) => {
            handleMouseMove(e, false);
          }
        : () => {},
  };

  return (
    <li key={index} className={classes}>
      <div className="submenu-title" {...clickEvents} {...moveEvents}>
        {title}
        <Icon icon="angle-down" className="menu-icon" />
      </div>
      {renderChildren()}
    </li>
  );
};

export default SubMenu;
