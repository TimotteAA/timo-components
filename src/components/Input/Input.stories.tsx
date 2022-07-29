import React from "react";
import Input from "./";

// story是一种UI展示

import { ComponentMeta, ComponentStory } from "@storybook/react";

const inputMeta: ComponentMeta<typeof Input> = {
    title: "Input",
    id: "Menu",
    component: Input,
};
export default inputMeta;

const BasicInputTemplate: ComponentStory<typeof Input> = (args) => {
    const {prefix, suffix, size, placeholder, icon, ...restProps} = args;
    return (
        <Input prefix={prefix} suffix={suffix} size={size} placeholder={placeholder} icon={icon} {...restProps}/>
    );
};

export const BasicInput = BasicInputTemplate.bind({});
BasicInput.args = {
    prefix: "12314",
    suffix: ".com",
    placeholder: "enter something...",
    size: "large",
    icon: "angle-down"
};
BasicInput.storyName = "基本的、带prefix、suffix的input";
