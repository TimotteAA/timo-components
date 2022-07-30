import React, {useContext, useEffect} from "react";
// import { CustomRule } from "async-validator";
import classNames from "classnames"

import { formContext } from "../index";
import { CustomRule } from "../../../hooks/useStore"
import {ValidateError} from "async-validator";

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

const FormItem: React.FC<FormItemProps> = (props) => {
    const { label, name, children, valueName = "value",
        trigger = "onChange",
        getValueFromEvent = (e: React.ChangeEvent<HTMLInputElement>) => e.target.value,
        rules = [],
        validateTrigger = "onBlur"
    } = props;

    const { dispatch, fields, initialValue, validateField } = useContext(formContext);
    // 获取初始值
    const value = initialValue ? initialValue[name] : ""

    // 注册field
    useEffect(() => {
        dispatch({type: "addField", name, value: { label, name, value,
                rules, isValid: true, errors: [] }})
    }, [])

    // 获取当前store中的key, value
    const fieldState = fields[name];
    const fieldValue = (fieldState && fieldState.value) ?? value;
    // errors
    const hasError = fieldState && fieldState.errors && fieldState.errors.length > 0;
    const errors = fieldState && fieldState.errors;

    // rules中是否有必填
    const isRequired = rules && rules.length > 0 && rules.some(r => typeof r !== "function" && r.required);

    const labelClass = classNames({
        "label-required": isRequired
    })

    const errorClass = classNames({
        "input-validated-error": hasError,
        "input-error": true
    })

    const rowClass = classNames("timo-row", {
        "timo-row-with-label": label,
        "timo-row-without-label": !label,
        "timo-row-has-error": hasError
    })

    // 更新值的回调
    const onValueUpdateChange = (e: any) => {
        const value = getValueFromEvent && getValueFromEvent(e);
        dispatch({type: "updateField", name, value})
    }

    const onValueValidate = async () => {
        await validateField(name);
    }

    // 创建要给input的value，赋值给Input
    // cloneElement
    const controlProps: Record<string, any> = {
        [valueName]: fieldValue,
        [trigger]: onValueUpdateChange,
    }
    if (rules) {
        controlProps[validateTrigger] = onValueValidate
    }

    // children列表
    const childList = React.Children.toArray(children);
    if (childList.length === 0) {
        console.error("请传入子组件");
    }
    // 子组件大于1个
    if (childList.length > 1) {
        console.error("仅支持传入一个子组件");
    }

    if (!React.isValidElement(childList[0])) {
        console.error("请传入合理的React组件")
    }
    const inputNode = childList[0] as React.ReactElement;

    const renderNode = React.cloneElement(inputNode, {
        /* 原有属性*/
        ...inputNode.props,
        ...controlProps,
    })

    const renderErrors = (errors: ValidateError[]) => {
        return errors.map(e => e.message).join("; ")
    }

    return <div className={rowClass}>
        {label && <div className={"timo-row-label"}>
            <label className={labelClass}>{label}：</label>
        </div> }
        <div className={"timo-row-form-item"}>
            {renderNode}
            <div className={errorClass}>{errors && errors.length > 0 && renderErrors(errors)}</div>
        </div>

    </div>
}

export default FormItem;
