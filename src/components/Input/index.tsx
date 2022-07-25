import React from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import classNames from "classnames";
import Icon from "../Icon";

type InputSize = "small" | "large";

interface InputProps {
  disabled?: boolean;
  size?: InputSize;
  icon?: IconProp;
  prefix?: string | React.ReactElement;
  suffix?: string | React.ReactElement;
  className?: string;
}

type NativeInputProps = React.InputHTMLAttributes<HTMLElement>;

export type FInputProps = InputProps & Partial<Omit<NativeInputProps, "size">>;

const Input: React.FC<FInputProps> = (props) => {
  const {
    disabled,
    size = "small",
    icon,
    prefix,
    suffix,
    className,
    ...restProps
  } = props;

  //   后面两个主要是决定input的前后margin
  const classes = classNames("input", {
    [`input-${size}`]: size,
    [`input-disabled`]: disabled,
    [`input-prefix`]: prefix,
    [`input-suffix`]: suffix,
    "input-large": size === "large",
    "input-small": size === "small",
  });

  return (
    <div className="input-container">
      {prefix && <div className="input-prefix-wrapper">{prefix}</div>}
      <div className="input-wrapper">
        {icon && (
          <div className="input-icon-wrapper">{<Icon icon={icon} />}</div>
        )}
        <input {...restProps} className={classes} disabled={disabled} />
      </div>

      {suffix && <div className="input-suffix-wrapper">{suffix}</div>}
    </div>
  );
};

export default Input;
