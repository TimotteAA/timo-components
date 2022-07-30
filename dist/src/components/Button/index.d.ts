import React from "react";
declare type ButtonType = "primary" | "default" | "danger" | "link";
declare type ButtonSize = "large" | "small";
/**
 * @param {ButtonType} btnType 按钮类型
 * @param {ButtonSize} size 按钮大小
 * @param {boolean} disabled 是否禁用
 * @param {string} className 自定义样式
 * @param {string} href 链接按钮的href
 * @param {React.ReactNode} children 子元素
 */
interface MyButtonProps {
    className?: string;
    disabled?: boolean;
    btnType?: ButtonType;
    size?: ButtonSize;
    children?: React.ReactNode;
    href?: string;
}
declare type NativeButtonProps = React.ButtonHTMLAttributes<HTMLElement> & MyButtonProps;
declare type AnchorProps = React.AnchorHTMLAttributes<HTMLElement> & MyButtonProps;
export declare type ButtonProps = Partial<NativeButtonProps & AnchorProps>;
/**
 * @param {ButtonType} btnType 按钮类型
 * @param {ButtonSize} size 按钮大小
 * @param {boolean} disabled 是否禁用
 * @param {string} className 自定义样式
 * @param {string} href 链接按钮的href
 * @param {React.ReactNode} children 子元素
 */
export declare const Button: React.FC<ButtonProps>;
export default Button;
