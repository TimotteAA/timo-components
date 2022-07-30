import React from "react";
import VirtualList from "./index";

import { ComponentMeta, ComponentStory } from "@storybook/react";
// 整体配置
const virtualListMeta: ComponentMeta<typeof VirtualList> = {
    title: "定高VirtualList虚拟列表",
    component: VirtualList,
};

export default virtualListMeta;

const Template: ComponentStory<typeof VirtualList> = (args) => {
    const data = new Array(1000).fill(0).map((_, idx) => (idx + 1) + "");
    return(<VirtualList data={data}/>
)};


export const VirtualListStory = Template.bind({});
VirtualListStory.args = {
};
VirtualListStory.storyName = "定高的虚拟列表组件";

