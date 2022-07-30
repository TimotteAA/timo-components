import React from "react";
export declare type AlertType = "success" | "default" | "danger" | "warning";
/**
 * @param {AlertType} alertType Alert类型
 * @param {string} header 标题
 * @param {string} description 详情
 * @param {string} className 自定义样式
 * @param {boolean} showCloseIcon 是否显示关闭按钮
 * @param {(...args: any) => void} onClose 点击关闭时的回调
 */
interface MyAlertProps {
    className?: string;
    type?: AlertType;
    header: string;
    description?: string;
    showCloseIcon?: boolean;
    onClose?: (...args: any[]) => void;
}
declare type NativeDivProps = React.BaseHTMLAttributes<HTMLDivElement>;
declare type AlertProps = NativeDivProps & MyAlertProps;
declare const Alert: React.FC<AlertProps>;
export default Alert;
