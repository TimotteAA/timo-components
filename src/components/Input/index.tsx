import React from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import classNames from "classnames";
import Icon from "../Icon";

type InputSize = "small" | "large";

interface InputProps {
  /* disabled，input是否被禁用 */
  disabled?: boolean;
  /* size，input的大小 */
  size?: InputSize;
  /* icon，input的icon */
  icon?: IconProp;
  /* prefix，input的搜索前缀，比如https//、http// */
  prefix?: React.ReactNode;
  /* prefix，input的搜索后缀，比如.com、.cn */
  suffix?: React.ReactNode;
  /* className，自定义类名 */
  className?: string;
}

type NativeInputProps = React.InputHTMLAttributes<HTMLElement>;

export type FInputProps = InputProps & Partial<Omit<NativeInputProps, "size">>;

const Input: React.FC<FInputProps> = (props) => {
  const {
    disabled = false,
    size = "small",
    icon,
    prefix,
    suffix,
    className,
    ...restProps
  } = props;

  //   后面两个主要是决定input的前后margin
  const classes = classNames("input-wrapper", {
    [`input-${size}`]: size,
    [`input-disabled`]: disabled,
    [`input-prefix`]: prefix,
    [`input-suffix`]: suffix,
    "input-large": size === "large",
    "input-small": size === "small",
  });

  const prefixClasses = classNames("input-prefix-wrapper", {
    [`input-prefix-wrapper-${size}`]: size,
  })

  const suffixClasses = classNames("input-suffix-wrapper", {
    [`input-suffix-wrapper-${size}`]: size,
  })

  const fixControlledValue = (value: any) => {
    if (typeof value === 'undefined' || value === null) {
      return ''
    }
    return value
  }
  if('value' in props) {
    delete restProps.defaultValue
    restProps.value = fixControlledValue(props.value)
  }

  return (
    <div className="input-container">
      {prefix && <div className={prefixClasses}>{prefix}</div>}
      <div className={classes} >
        {icon && (
          <span className="input-icon"><Icon icon={icon} /></span>
        )}
        <input {...restProps} disabled={disabled} className={"input"}/>
      </div>
      {suffix && <div className={suffixClasses}>{suffix}</div>}
    </div>
  );
};

export default Input;
