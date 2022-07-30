import React from "react";
import { useStore, FormState } from "../../hooks/useStore";
import { ValidateError } from "async-validator";
import { FormItemProps } from "./FormItem";
export declare type renderChildren = (form: FormState) => React.ReactNode;
export interface FormProps {
    /** 表单唯一的name */
    name?: string;
    /** 表单各字段初始值 */
    initialValue?: Record<string, any>;
    /** 表单各个Item项 */
    children?: React.ReactNode | renderChildren;
    /** 表单整体检验成功 */
    onValidateSuccess?: (values: Record<string, any>) => void;
    /** 表单整体检验失败 */
    onValidateError?: (values: Record<string, any>, errors: Record<string, ValidateError[]>) => void;
}
export declare type FormContext = Pick<ReturnType<typeof useStore>, "dispatch" | "fields" | "validateField"> & Pick<FormProps, "initialValue">;
export declare const formContext: React.Context<FormContext>;
export declare type FormRef = Omit<ReturnType<typeof useStore>, "dispatch" | "fields" | "validateField" | "form" | "setForm" | "validateFields">;
export declare type FormComponent = React.FC<FormProps> & {
    FormItem: React.FC<FormItemProps>;
};
declare const TransForm: FormComponent;
export default TransForm;
