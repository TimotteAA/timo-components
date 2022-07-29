import React from "react";
import Upload from "./";
import Progress from "./Progress";
import Dragger from "./Dragger";
import UploadList from "./UploadList";

// story是一种UI展示

import { ComponentMeta, ComponentStory } from "@storybook/react";

// 整体配置
const uploadMeta: ComponentMeta<typeof Upload> = {
    title: "Upload",
    component: Upload,
    subcomponents: { Progress: Progress, Dragger: Dragger, UploadList: UploadList },
};

export default uploadMeta;

const Template: ComponentStory<typeof Upload> = (args) => (
    <Upload action={args.action}/>
);

export const UploadStory = Template.bind({});
UploadStory.args = {
    action: "https://jsonplaceholder.typicode.com/posts"
};
UploadStory.storyName = "Upload组件";
