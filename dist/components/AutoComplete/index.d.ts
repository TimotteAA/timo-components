import React from "react";
import { FInputProps as InputProps } from "../Input";
interface DataSourceObject {
    value: string;
    index?: number;
}
export declare type DataSourceType<T = {}> = T & DataSourceObject;
interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
    /** 根据input的value，搜索得到内容的回调  */
    fetchSuggestions: (keyword: string) => DataSourceType[] | Promise<DataSourceType[]>;
    /** 选中某一项item时的回调 */
    onSelect?: (item: DataSourceType) => void;
    /** 渲染单一搜索项的渲染方法 */
    renderOption?: (item: DataSourceType) => React.ReactElement;
    /** 自定义渲染loading */
    renderLoading?: () => React.ReactElement;
}
declare const AutoComplete: React.FC<AutoCompleteProps>;
export default AutoComplete;
