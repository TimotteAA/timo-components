import React, { useState } from "react";
import classNames from "classnames";

export type AlertType = "success" | "default" | "danger" | "warning";

/**
 * @param {AlertType} alertType Alert类型
 * @param {string} header 标题
 * @param {string} description 详情
 * @param {string} className 自定义样式
 * @param {boolean} showCloseIcon 是否显示关闭按钮
 * @param {(...args: any) => void} onClose 点击关闭时的回调
 */
interface MyAlertProps {
  className?: string;
  type?: AlertType;
  header: string;
  description?: string;
  showCloseIcon?: boolean;
  onClose?: (...args: any[]) => void;
}

type NativeDivProps = React.BaseHTMLAttributes<HTMLDivElement>;

type AlertProps = NativeDivProps & MyAlertProps;

const Alert: React.FC<AlertProps> = (props) => {
  const [isShow, setIsShow] = useState<boolean>(true);

  const {
    className,
    type = "default",
    header,
    description,
    showCloseIcon = true,
    onClose,
    ...resProps
  } = props;

  const alertClass = classNames("alert", className, {
    [`alert-${type}`]: type,
  });

  const handleClose = () => {
    setIsShow(false);
    onClose && onClose();
  };

  return (
    <>
      {isShow && (
        <div className={alertClass} {...resProps}>
          <div className="alert-header">
            <div className="alert-header-left">{header}</div>
            {showCloseIcon && (
              <div className="alert-header-right" onClick={handleClose}>
                关闭
              </div>
            )}
          </div>
          {description && (
            <div className="alert-description">{description}</div>
          )}
        </div>
      )}
    </>
  );
};

export default Alert;
