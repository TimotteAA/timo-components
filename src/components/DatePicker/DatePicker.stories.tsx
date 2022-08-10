import React from "react";
import DatePicker from "./index";
import dayjs from "dayjs";

// story是一种UI展示

import { ComponentMeta, ComponentStory } from "@storybook/react";

// 整体配置
const datePickerMeta: ComponentMeta<typeof DatePicker> = {
  title: "DatePicker",
  component: DatePicker,
};

export default datePickerMeta;

const Template: ComponentStory<typeof DatePicker> = (args) => <DatePicker {...args} />;

export const DefaultDatePicker = Template.bind({});
DefaultDatePicker.args = {
  activeDate: dayjs()
};
DefaultDatePicker.storyName = "基本的DatePicker";
