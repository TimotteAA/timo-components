import React from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
declare type InputSize = "small" | "large";
interface InputProps {
    disabled?: boolean;
    size?: InputSize;
    icon?: IconProp;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    className?: string;
}
declare type NativeInputProps = React.InputHTMLAttributes<HTMLElement>;
export declare type FInputProps = InputProps & Partial<Omit<NativeInputProps, "size">>;
declare const Input: React.FC<FInputProps>;
export default Input;
