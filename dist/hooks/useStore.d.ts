/// <reference types="react" />
import { RuleItem, ValidateError } from "async-validator";
export declare type CustomRuleFunc = ({ getFieldValue }: {
    getFieldValue: Function;
}) => RuleItem;
export declare type CustomRule = RuleItem | CustomRuleFunc;
export interface Field {
    name: string;
    value: any;
    rules: CustomRule[];
    isValid: boolean;
    errors: ValidateError[];
}
export declare type Fields = Record<string, Field>;
export interface FormState {
    isValid: boolean;
    /** 是否处于提交的校验中 */
    isSubmitting?: boolean;
    /** 各项的校验error */
    errors?: Record<string, ValidateError[]>;
}
declare type FieldActionType = "addField" | "updateField" | "updateValidateResult";
export interface FieldsAction {
    type: FieldActionType;
    name: string;
    value: any;
}
export interface CustomValidateErrorType extends Error {
    errors: ValidateError[];
    fields: Record<string, ValidateError[]>;
}
export declare function useStore(initialValue?: Record<string, any>): {
    fields: Fields;
    dispatch: import("react").Dispatch<FieldsAction>;
    form: FormState;
    setForm: import("react").Dispatch<import("react").SetStateAction<FormState>>;
    validateField: (name: string) => Promise<void>;
    validateFields: () => Promise<{
        isValid: boolean;
        errors: Record<string, ValidateError[]>;
        values: {
            [x: string]: any;
        };
    }>;
    setFieldValue: (key: string, value: any) => void;
    getFieldValue: (key: string) => any;
    getAllFields: () => {
        [x: string]: any;
    };
    resetField: () => void;
};
export {};
