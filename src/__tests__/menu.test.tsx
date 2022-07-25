import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import Menu, { MenuProps } from "../components/Menu";
import MenuItem from "../components/Menu/MenuItem";
import SubMenu from "../components/Menu/SubMenu";

const defaultProps: MenuProps = {
  selectedIndex: "0",
  onSelect: jest.fn(),
  className: "test",
};

const verticalProps: MenuProps = {
  selectedIndex: "0",
  mode: "vertical",
};

const renderMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>default</MenuItem>
      <MenuItem>item 2 to be selected</MenuItem>
      <MenuItem disabled>Item disabled</MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>dropdown1</MenuItem>
      </SubMenu>
    </Menu>
  );
};

let wrapper, menuElement, activeElement, disabledElement;
describe("所有都是默认属性", () => {
  test("渲染menu，menuitem", () => {
    wrapper = render(renderMenu(defaultProps));
    menuElement = wrapper.getByTestId("test-menu");
    disabledElement = wrapper.getByText("Item disabled");
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass("menu menu-horizontal");
    expect(menuElement.querySelectorAll(":scope > li").length).toBe(4);
    expect(disabledElement).toHaveClass("menu-item menu-item-disabled");
  });

  test("点击后子项后切换，触发回调", () => {
    wrapper = render(renderMenu(defaultProps));
    const inactiveElement = wrapper.getByText("item 2 to be selected");
    const activeElement = wrapper.getByText("default");
    fireEvent.click(inactiveElement);
    expect(inactiveElement).toHaveClass("menu-item menu-item-active");
    expect(activeElement).not.toHaveClass("menu-item menu-item-active");
  });

  test("vertical mode", () => {
    wrapper = render(renderMenu(verticalProps));
    menuElement = wrapper.getByTestId("test-menu");
    expect(menuElement).toHaveClass("menu menu-vertical");
  });
});
