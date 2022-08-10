import React from "react";
import Week from "./index";

// story是一种UI展示

import { ComponentMeta, ComponentStory } from "@storybook/react";

// 整体配置
const weekMeta: ComponentMeta<typeof Week> = {
  title: "Week",
  component: Week,
};

export default weekMeta;

const Template: ComponentStory<typeof Week> = (args) => <Week {...args} />;

export const DefaultWeek = Template.bind({});
DefaultWeek.args = {
};
DefaultWeek.storyName = "基本的Week组件，选择本周的日期";

