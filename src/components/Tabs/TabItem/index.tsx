import React, { useEffect, useContext } from "react";
import classNames from "classnames";

import { tabItemContext } from "../";

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

const TabItem: React.FC<TabItemProps> = (props) => {
  const { activeIndex, onSelect, setContent } = useContext(tabItemContext);
  const { title, index, children, className, styles, disabled } = props;

  const classes = classNames("tab-item", className, {
    "tab-item-active": index === activeIndex,
    "tab-item-disabled": disabled,
  });

  // 当activeIndex改变，且是自身，切换内容
  useEffect(() => {
    if (index === activeIndex) {
      setContent && setContent(children);
    }
  }, [activeIndex]);

  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    typeof index === "number" && onSelect && onSelect(index);
  };

  return (
    <li className={classes} style={styles} onClick={handleClick}>
      {title}
    </li>
  );
};

export default TabItem;
