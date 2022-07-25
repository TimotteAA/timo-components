import React from "react";
import Tabs from "./index";
import TabItem from "./TabItem";

// story是一种UI展示

import { ComponentMeta, ComponentStory } from "@storybook/react";

// 整体配置
const tabsMeta: ComponentMeta<typeof Tabs> = {
  title: "Tabs",
  component: Tabs,
  subcomponents: { TabItem: TabItem },
};

export default tabsMeta;

const Template: ComponentStory<typeof Tabs> = (args) => (
  <Tabs {...args}>
    <TabItem title="card1">this is card one</TabItem>
    <TabItem title="card2">this is card two</TabItem>
    <TabItem title="card3" disabled>
      this is card three
    </TabItem>
    <TabItem title="card4">this is card four</TabItem>
  </Tabs>
);

export const TabsStory = Template.bind({});
TabsStory.args = {
  activeIndex: 0,
};
TabsStory.storyName = "默认的Alert";
