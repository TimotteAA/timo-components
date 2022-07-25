import React from "react";
import Alert from "./index";

// story是一种UI展示

import { ComponentMeta, ComponentStory } from "@storybook/react";

// 整体配置
const alertMeta: ComponentMeta<typeof Alert> = {
  title: "Alert",
  component: Alert,
};

export default alertMeta;

const Template: ComponentStory<typeof Alert> = (args) => <Alert {...args} />;

export const DefaultAlert = Template.bind({});
DefaultAlert.args = {
  children: "Default",
  description: "描述信息....",
  header: "标题",
};
DefaultAlert.storyName = "默认的Alert";

export const InfoAlert = Template.bind({});
InfoAlert.args = {
  children: "Success",
  type: "success",
  description: "描述信息....",
  header: "成功",
};
InfoAlert.storyName = "成功的Alert";

export const DangerAlert = Template.bind({});
DangerAlert.args = {
  children: "Danger",
  type: "danger",
  description: "描述信息....",
  header: "危险",
};
DangerAlert.storyName = "danger的Alert";

export const WarningAlert = Template.bind({});
WarningAlert.args = {
  children: "Warning",
  type: "warning",
  description: "描述信息....",
  header: "警告",
};
WarningAlert.storyName = "warning的Alert";
