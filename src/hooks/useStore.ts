import  { useState, useReducer } from "react";
import Schema, { RuleItem, ValidateError } from "async-validator";
import { mapValues, each } from "lodash-es";

// 自定义error
export type CustomRuleFunc = ({ getFieldValue }: {getFieldValue: Function}) => RuleItem;
export type CustomRule = RuleItem | CustomRuleFunc

// 单一field的字段
export interface Field {
    name: string;
    value: any;
    rules: CustomRule[];
    isValid: boolean;
    errors: ValidateError[];
}

export type Fields = Record<string, Field>;

export interface FormState {
    isValid: boolean;
    /** 是否处于提交的校验中 */
    isSubmitting?: boolean;
    /** 各项的校验error */
    errors?: Record<string, ValidateError[]>;
}

type FieldActionType = "addField" | "updateField" | "updateValidateResult";

export interface FieldsAction {
    type: FieldActionType;
    // 变更的字段
    name: string;
    // 变更的内容
    value: any;
}

export interface CustomValidateErrorType extends Error {
    errors: ValidateError[];
    fields: Record<string, ValidateError[]>;
}

function fieldsReducer(state: Fields, action: FieldsAction): Fields {
    switch (action.type) {
        case "addField": {
            return {
                ...state,
                [action.name]: { ...action.value }
            }
        }
        case "updateField": {
            return {
                ...state,
                [action.name]: { ...state[action.name], value: action.value }
            }
        }
        case "updateValidateResult": {
            const { isValid, errors } = action.value;
            return {
                ...state,
                [action.name]: { ...state[action.name], ...{ isValid, errors}}
            }
        }
        default:
            return state;
    }
}

export function useStore(initialValue?: Record<string, any>) {
    // form的整个state
    const [form, setForm] = useState<FormState>({isValid: true, isSubmitting: false, errors: {}});
    const [fields, dispatch] = useReducer(fieldsReducer, {});
    const getFieldValue = (key: string) => {
        return fields[key] && fields[key].value;
    }
    // 设置form的值
    const setFieldValue = (key: string, value: any) => {
        if (fields && fields[key]) {
            const oldValue = fields[key].value
            dispatch({ type: "updateField", name: key, value: { ...oldValue, value }})
        }
    }
    // 获取所有的字段对应的值
    const getAllFields = () => {
        return mapValues(fields, item => item.value);
    }
    // 设置初始值
    const resetField = () => {
        if (initialValue) {
            console.log(initialValue);
            // 循环dispatch
            each(initialValue, (value, name) => {
                if (fields[name]) {
                    dispatch({type: "updateField", name,
                        value })
                }
            })
        }
    }

    const transformRules = (rules: CustomRule[]) => {
        return rules.map(r => {
            if (typeof r === "function") {
                const rule = r({ getFieldValue });
                return rule;
            } else {
                return r;
            }
        })
    }
    const validateField = async (name: string) => {
        // 传入字段进行校验，去除值和校验规则
        const { value, rules } = fields[name];
        // 规则
        const transformedRules = transformRules(rules);
        const descriptor = {
            [name]: transformedRules
        }
        // 值
        const valueMap = {
            [name]: value
        }
        const validator = new Schema(descriptor);
        let isValid = true;
        let errors: ValidateError[] = [];
        try {
            await validator.validate(valueMap);
        } catch (e) {
            isValid = false;
            const err = e as any;
            errors = err.errors;
        } finally {
            dispatch({type: "updateValidateResult", name, value: { isValid, errors }})
        }
    }

    const validateFields = async () => {
        let isValid = true;
        let errors: Record<string, ValidateError[]> = {};

        // 各个字段的key与value
        const valueMap = mapValues(fields, (item) => item.value);
        // 各个字段的key与rules
        const descriptor = mapValues(fields, item => transformRules(item.rules));
        const validator = new Schema(descriptor);
        setForm({ ...form, isSubmitting: true })
        try {
            await validator.validate(valueMap);
        } catch (e: any) {
            const err = e as CustomValidateErrorType;
            isValid = false;
            errors = err.fields;
            // 更新各个field的error
            each(fields, (value, name) => {
                // name是否有error
                if (errors[name]) {
                    const itemErrors = errors[name];
                    dispatch({type: "updateValidateResult", name,
                        value: { isValid: false, errors: itemErrors }})
                } else if (value.rules.length > 0 && !errors[name]) {
                    dispatch({type: "updateValidateResult", name,
                        value: { isValid: true, errors: [] }})
                }
            })
        } finally {
            setForm({...form, isSubmitting: false, isValid, errors})
            return {
                isValid,
                errors,
                values: valueMap
            }
        }
    }

    return {
        fields,
        dispatch,
        form,
        setForm,
        validateField,
        validateFields,
        setFieldValue,
        getFieldValue,
        getAllFields,
        resetField
    }
}
