import React, {createContext, useContext} from "react";
import { useStore, FormState } from "../../hooks/useStore";
import { ValidateError } from "async-validator";

export type renderChildren = (form: FormState) => React.ReactNode;

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
    onValidateError?: (values: Record<string, any>,
                       errors: Record<string, ValidateError[]>) => void;
}

export type FormContext = Pick<ReturnType<typeof useStore>, "dispatch" | "fields" | "validateField"> &
    Pick<FormProps, "initialValue">;

export const formContext = createContext<FormContext>({} as FormContext);

/*
* 为了统一管理每个表单Item的数据，定义store
* store: fields，各个input的name以及数据
* addField：input刚挂载时注册field
* updateField：change事件触发时更新store里的数值
* 当item失去焦点时，对value进行校验
* 当submit时，判断整体的isValid，并提供验证成功、验证失败的回调
* */
const Form: React.FC<FormProps> = (props) => {
    const { name = "timo-form", children,
        initialValue, onValidateSuccess, onValidateError } = props;
    const { form, fields, dispatch, validateField, validateFields } = useStore();

    const passedContext: FormContext = {
        dispatch,
        fields,
        initialValue,
        validateField
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const { isValid, errors, values } = await validateFields();
        if (isValid && onValidateSuccess) {
            onValidateSuccess(values);
        } else if (!isValid && onValidateError) {
            onValidateError(values, errors);
        }
    }

    let childNode;
    if (typeof children === "function") {
        childNode = children(form);
    } else {
        childNode = children;
    }

    return <>
        <ul>
            <li>{JSON.stringify(form)}</li>
            <li>{JSON.stringify(fields)}</li>
        </ul>
        <form name={name} className="timo-form" onSubmit={handleSubmit}>
            <formContext.Provider value={passedContext}>
            {childNode}
            </formContext.Provider>
        </form>
    </>
}

export default Form;
