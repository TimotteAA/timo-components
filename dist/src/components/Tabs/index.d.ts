import React from "react";
import { TabItemProps } from "./TabItem";
export interface TabsProps {
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
declare type TabItemContext = Pick<TabsProps, "activeIndex" | "onSelect"> & {
    setContent?: (content: React.ReactNode) => void;
};
export declare const tabItemContext: React.Context<TabItemContext>;
export declare type TransTabs = React.FC<TabsProps> & {
    TabItem: React.FC<TabItemProps>;
};
declare const TabsComponent: TransTabs;
export default TabsComponent;
