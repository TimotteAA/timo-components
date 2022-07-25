import React, { useState, createContext } from "react";
import classNames from "classnames";

import { TabItemProps } from "./TabItem";

interface TabsProps {
  /**
   * 当前选中索引
   */
  activeIndex?: number;
  /**
   * 选中某项后的回调
   */
  onSelect?: (index: number) => void;
  children?: React.ReactNode;
  className?: string;
  styles?: React.CSSProperties;
}

type TabItemContext = Pick<TabsProps, "activeIndex" | "onSelect"> & {
  setContent?: (content: React.ReactNode) => void;
};

export const tabItemContext = createContext<TabItemContext>({ activeIndex: 0 });

const Tabs: React.FC<TabsProps> = (props) => {
  const {
    activeIndex: defaultIndex = 0,
    onSelect,
    children,
    className,
    styles,
  } = props;
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const [content, setContent] = useState<React.ReactNode>(null);

  const classes = classNames("tabs", className);

  const handleTabItemClick = (index: number) => {
    setActiveIndex(index);
    if (onSelect) {
      onSelect(index);
    }
  };

  const renderChildren = () => {
    return React.Children.map(children, (c, idx) => {
      const child = c as React.FunctionComponentElement<TabItemProps>;

      if (child.type.name === "TabItem") {
        return React.cloneElement(child, { index: idx });
      } else {
        console.error("请传入TabItem组件");
      }
    });
  };

  return (
    <div className={classes} style={styles}>
      <tabItemContext.Provider
        value={{ activeIndex, onSelect: handleTabItemClick, setContent }}
      >
        <ul className="tabs-items">{renderChildren()}</ul>
        <div className="tabs-content">{content}</div>
      </tabItemContext.Provider>
    </div>
  );
};

export default Tabs;
