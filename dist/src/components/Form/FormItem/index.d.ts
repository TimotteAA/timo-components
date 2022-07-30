import React from "react";
import { CustomRule } from "../../../hooks/useStore";
export interface FormItemProps {
    /** input的标识 */
    name: string;
    /** input的label内容 */
    label?: string;
    /** 具体的组件名 */
    children: React.ReactNode;
    /** input的属性名，checkbox是checked */
    valueName?: string;
    /** 触发的时机 */
    trigger?: string;
    /** 指定更新的回调 */
    getValueFromEvent?: (event: any) => any;
    /** 校验规则 */
    rules?: CustomRule[];
    /** 校验时机，默认是onBlur */
    validateTrigger?: string;
}
declare const FormItem: React.FC<FormItemProps>;
export default FormItem;
