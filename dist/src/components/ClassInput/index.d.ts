import React from 'react';
import './index.scss';
export declare type SizeType = 'normal' | 'large';
export declare type Type = 'text' | 'textarea' | '';
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    /**
     * @description 自动获取焦点
     */
    autoFocus?: boolean;
    /**
     * @description 控件类型
     */
    type?: Type;
    /**
     * @description 控件大小
     */
    size?: SizeType;
    /**
     * @description 是否禁用
     */
    disabled?: boolean;
    /**
     * @description 设置前置标签
     */
    addonBefore?: React.ReactNode;
    /**
     * @description 设置后置标签
     */
    addonAfter?: React.ReactNode;
    /**
     * @description 可以计数
     */
    allowCount?: boolean;
    /**
     * @description 可以点击清除图标删除内容
     */
    allowClear?: boolean;
    /**
     * @description textarea行数，默认3
     */
    rows?: number;
    /**
     * @description 动态样式
     */
    style?: React.CSSProperties;
    /**
     * @description 输入框内容
     */
    value?: string | number | undefined;
    /**
     * @description 输入框占位符
     */
    placeholder?: string;
    /**
     * @description 输入框id
     */
    id?: string;
    /**
     * @description 最大长度
     */
    maxLength?: number;
    /**
     * @description 是否背景透明
     */
    isBgTransparent?: boolean;
    /**
     * @description input改变的回调函数
     */
    onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}
interface InputState {
    focus: boolean;
    text: string | number;
}
export default class Index extends React.PureComponent<InputProps, InputState> {
    input: HTMLInputElement | HTMLTextAreaElement | undefined;
    constructor(props: InputProps);
    componentDidMount(): void;
    static getDerivedStateFromProps(nextProps: InputProps): {
        text: string | number;
    } | {
        text?: undefined;
    };
    saveInput: (input: HTMLInputElement | HTMLTextAreaElement) => void;
    onInputChange(e: any): void;
    focus: () => void;
    blur: () => void;
    onFocus: () => void;
    onBlur: () => void;
    onInput: (e: any) => void;
    onClear: (e: any) => void;
    renderBefore(): false | JSX.Element;
    renderAfter(): false | JSX.Element;
    renderClear(): false | "" | 0 | JSX.Element;
    renderInput(): JSX.Element;
    renderTextarea(): JSX.Element;
    render(): JSX.Element;
}
export {};
