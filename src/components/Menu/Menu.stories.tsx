import React from "react";
import Menu from "./index";
import MenuItem from "./MenuItem";
import SubMenu from "./SubMenu";

// story是一种UI展示

import { ComponentMeta, ComponentStory } from "@storybook/react";

const menuMeta: ComponentMeta<typeof Menu> = {
  title: "Menu",
  id: "Menu",
  component: Menu,
  args: {
    selectedIndex: "2",
  },
  argTypes: {
    selectedIndex: {
      descriptione: "默认选中的菜单项",
    },
  },
};
export default menuMeta;

const BasicMenuTemplate: ComponentStory<typeof Menu> = (args) => {
  return (
    <Menu {...args}>
      <MenuItem>Item 0</MenuItem>
      <MenuItem>Item 1</MenuItem>
      <MenuItem disabled>Item 2</MenuItem>
      <MenuItem>Item 3</MenuItem>
    </Menu>
  );
};

export const HorizationMenu = BasicMenuTemplate.bind({});
HorizationMenu.args = {
  selectedIndex: "0",
  mode: "horizontal",
};
HorizationMenu.storyName = "水平Menu";

export const VerticalMenu = BasicMenuTemplate.bind({});
VerticalMenu.args = {
  selectedIndex: "0",
  mode: "vertical",
};
VerticalMenu.storyName = "纵向Menu";

const SubMenuTemplate: ComponentStory<typeof Menu> = (args) => (
  <Menu {...args}>
    <MenuItem>Item 0</MenuItem>
    <MenuItem>Item 1</MenuItem>
    <SubMenu title="dropdown">
      <MenuItem>dropdown1</MenuItem>
      <MenuItem>dropdown2</MenuItem>
      <MenuItem>dropdown3</MenuItem>
    </SubMenu>
    <MenuItem>Item 3</MenuItem>
  </Menu>
);

export const SubMenuVerticalMenu = SubMenuTemplate.bind({});
SubMenuVerticalMenu.args = {
  selectedIndex: "0",
  mode: "vertical",
};
SubMenuVerticalMenu.storyName = "vertical的展开menu";

export const SubMenuHorizontalMenu = SubMenuTemplate.bind({});
SubMenuHorizontalMenu.args = {
  selectedIndex: "0",
  mode: "horizontal",
};
SubMenuHorizontalMenu.storyName = "horizontal的展开menu";
