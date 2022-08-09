import React from "react";
import Date from "./index";

// story是一种UI展示

import { ComponentMeta, ComponentStory } from "@storybook/react";

// 整体配置
const dateMeta: ComponentMeta<typeof Date> = {
  title: "Date",
  component: Date,
};

export default dateMeta;

const Template: ComponentStory<typeof Date> = (args) => <Date {...args} />;

export const DefaultDate = Template.bind({});
DefaultDate.args = {
};
DefaultDate.storyName = "基本的Date，可以选择一周";
