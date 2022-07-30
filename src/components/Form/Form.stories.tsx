import React, { useRef } from "react";
import Form, { FormRef } from "./";
import Item from "./FormItem"
import Input from "../Input";
import Button from "../Button";

// story是一种UI展示

import { ComponentMeta, ComponentStory } from "@storybook/react";
import {CustomRule} from "../../hooks/useStore";

// 整体配置
const formMeta: ComponentMeta<typeof Form> = {
    title: "Form",
    component: Form,
    subcomponents: { Item: Item },
    decorators:[(Story) => (
        <div style={{width: "550px"}}><Story/></div>
    )]
};

export default formMeta;

const confirmRules: CustomRule[] = [
    {type: "string", min: 3, max: 8},
    {required: true},
    ( { getFieldValue } ) => ({
        asyncValidator(rule, value) {
            const password = getFieldValue("password");
            if (value !== password) {
                return Promise.reject("请输入相同的密码");
            }
            return Promise.resolve();
        }
    })
]

const Template: ComponentStory<typeof Form> = (args) => {
    const ref = useRef<FormRef>();
    const resetAll = () => {
        if (ref.current) {
            ref.current.resetField();
            console.log("password", ref.current?.getFieldValue("password"));
        }
    }

    return (<Form initialValue={args.initialValue}
                  onValidateSuccess={args.onValidateSuccess}
                  // @ts-ignore
                  onValidateError={args.onValidateError} ref={ref}>
        <Item label={"用户名"} name={"username"} rules={[{required: true}]}>
            <Input />
        </Item>
        <Item label={"邮箱"} name={"email"} rules={[{required: true}]}>
            <Input />
        </Item>
        <Item label={"密码"} name={"password"} rules={[{type: "string", min: 3, max: 8, required: true}]}>
            <Input type={"password"} />
        </Item>
        <Item label={"确认密码"} name={"confirmPassword"} rules={confirmRules}>
            <Input type={"password"} />
        </Item>
        <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            <Item name={"isChecked"} valueName={"checked"} getValueFromEvent={(e: any) => e.target.checked}>
                <Input type={"checkbox"}/>
            </Item>
            勾选以同意注册条款
        </div>
        <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            <Button size={"small"} type={"submit"}>提交</Button>
            <Button type={"button"} onClick={resetAll} size={"small"}>重置</Button>
        </div>
    </Form>
)};

export const FormStory = Template.bind({});
FormStory.args = {
    initialValue: { "username": "timotte", isChecked: true },
    onValidateSuccess: (values) => console.log("校验成功", values),
    onValidateError: (values, errors) => console.log("校验失败", values, errors)
};
FormStory.storyName = "Form组件";
