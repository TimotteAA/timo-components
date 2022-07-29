import React from "react";
import ClassInput from "./";

// story是一种UI展示

import { ComponentMeta, ComponentStory } from "@storybook/react";

const classInputMeta: ComponentMeta<typeof ClassInput> = {
    title: "ClassInput",
    component: ClassInput,
};
export default classInputMeta;

const BasicInputTemplate: ComponentStory<typeof ClassInput> = (args) => {

    return (
        <ClassInput />
    );
};

export const BasicInput = BasicInputTemplate.bind({});
BasicInput.args = {
    allowClear: true,
    allowCount: true
};
BasicInput.storyName = "用类组件写的Input";
