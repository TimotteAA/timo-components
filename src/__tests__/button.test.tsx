import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import Button, { ButtonProps } from "../components/Button";

const defaultProps: ButtonProps = {
  btnType: "primary",
  size: "large",
};

const linkProps: ButtonProps = {
  btnType: "link",
  size: "small",
  href: "https://www.baidu.com",
};

const disabledProps: ButtonProps = {
  btnType: "link",
  size: "small",
  href: "https://www.baidu.com",
  disabled: true,
};

afterEach(cleanup);

describe("测试按钮按钮组件", () => {
  test("渲染default button", () => {
    const view = render(<Button>Nice</Button>);
    const element = view.getByText("Nice");
    expect(element).toBeInTheDocument();
    expect(element!.tagName).toBe("BUTTON");
    expect(element).toHaveClass("btn btn-default");
  });

  test("根据props进行渲染", () => {
    const view = render(<Button {...defaultProps}>Nice</Button>);
    const element = view.getByText("Nice");
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("btn btn-primary btn-large");
  });

  test("link button", () => {
    const view = render(<Button {...linkProps}>Nice</Button>);
    const element = view.getByText("Nice");
    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute("href", linkProps.href);
    expect(element).toHaveClass("btn btn-link btn-small");
  });

  test("diabled button", () => {
    const view = render(<Button {...disabledProps}>Nice</Button>);
    const element = view.getByText("Nice") as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute("href", disabledProps.href);
    expect(element).toHaveClass("btn btn-link btn-small");
    expect(element.disabled).toBeTruthy();
  });
});
