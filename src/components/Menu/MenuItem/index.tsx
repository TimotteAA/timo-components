import React, { useContext } from "react";
import classNames from "classnames";

import { MenuContext } from "../index";

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

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { index, className, disabled, style, children } = props;

  const { selectedIndex, onSelect } = useContext(MenuContext);

  const classes = classNames("menu-item", className, {
    "menu-item-disabled": disabled,
    "menu-item-active": index === selectedIndex,
  });

  const handleClick = () => {
    onSelect && !disabled && typeof index === "string" && onSelect(index);
  };

  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  );
};

export default MenuItem;
