import React from "react";
import classNames from "classnames";

// export enum ButtonType {
//   Primary = "primary",
//   Default = "default",
//   Danger = "danger",
//   Link = "link",
// }

type ButtonType = "primary" | "default" | "danger" | "link";

// 不同的默认大小
// export enum ButtonSize {
//   Large = "large",
//   Small = "small",
// }
type ButtonSize = "large" | "small";

/**
 * @param {ButtonType} btnType 按钮类型
 * @param {ButtonSize} size 按钮大小
 * @param {boolean} disabled 是否禁用
 * @param {string} className 自定义样式
 * @param {string} href 链接按钮的href
 * @param {React.ReactNode} children 子元素
 */
interface MyButtonProps {
  className?: string;
  disabled?: boolean;
  btnType?: ButtonType;
  size?: ButtonSize;
  children?: React.ReactNode;
  href?: string;
}

type NativeButtonProps = React.ButtonHTMLAttributes<HTMLElement> &
  MyButtonProps;
type AnchorProps = React.AnchorHTMLAttributes<HTMLElement> & MyButtonProps;
export type ButtonProps = Partial<NativeButtonProps & AnchorProps>;
// size影响padding、fontSize、borderRadius
// type影响bgc、border-radius

/**
 * @param {ButtonType} btnType 按钮类型
 * @param {ButtonSize} size 按钮大小
 * @param {boolean} disabled 是否禁用
 * @param {string} className 自定义样式
 * @param {string} href 链接按钮的href
 * @param {React.ReactNode} children 子元素
 */
export const Button: React.FC<ButtonProps> = (props) => {
  const {
    className,
    disabled = false,
    btnType = "default",
    size = "large",
    children,
    href,
    ...restProps
  } = props;
  //   btn-type、btn-size、btn-disabled
  const btnClasses = classNames("btn", className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === "link" && disabled,
  });
  if (btnType === "link" && href) {
    return (
      <a className={btnClasses} href={href} {...restProps}>
        {children}
      </a>
    );
  }

  return (
    <button
      className={btnClasses}
      disabled={disabled}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default Button;
