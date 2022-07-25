import React from "react";
import Button from "./index";

// story是一种UI展示

import { ComponentMeta, ComponentStory } from "@storybook/react";

// 整体配置
const buttonMeta: ComponentMeta<typeof Button> = {
  title: "Button",
  component: Button,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
};

export default buttonMeta;

const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args}></Button>
);
export const Default = Template.bind({});
Default.args = {
  children: "Default",
};

Default.storyName = "默认按钮样式";

export const TypeLarge = Template.bind({});
TypeLarge.args = {
  size: "large",
  children: "Large",
};
TypeLarge.storyName = "Large Button";

export const TypeSmall = Template.bind({});
TypeSmall.args = {
  size: "small",
  children: "Small",
};
TypeSmall.storyName = "Small Button";

export const DangerBtn = Template.bind({});
DangerBtn.args = {
  children: "Danger",
  btnType: "danger",
};
DangerBtn.storyName = "Danger Button";

export const PrimaryBtn = Template.bind({});
PrimaryBtn.args = {
  children: "Primary",
  btnType: "primary",
};
PrimaryBtn.storyName = "Primary Button";

export const LinkBtn = Template.bind({});
LinkBtn.args = {
  children: "Link",
  btnType: "link",
  href: "https://www.baidu.com",
};
LinkBtn.storyName = "Link Button";
