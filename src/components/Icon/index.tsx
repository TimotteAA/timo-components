import React from "react";
import classNames from "classnames";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

export type ThemeProps =
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "light"
  | "dark";

export interface IconProps extends FontAwesomeIconProps {
  theme?: ThemeProps;
  className?: string;
  styles?: React.CSSProperties;
}

const Icon: React.FC<IconProps> = (props) => {
  // icon-xxx
  const { theme, className, styles, ...restProps } = props;
  const classes = classNames("icon", className, {
    [`icon-${theme}`]: theme,
  });
  return <FontAwesomeIcon className={classes} style={styles} {...restProps} />;
};

export default Icon;
