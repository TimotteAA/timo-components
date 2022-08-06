import React, { useState } from "react";
import Button from "../Button"
import Icon from "../Icon";
import ReactDOM from "react-dom";

type Position = 'top' | 'bottom' | 'center';

export interface BtnConfig {
    /**
     * @description 按钮显示文本
     */
    text?: string;
    /**
     * @description 是否显示按钮
     */
    isShow?: boolean;
    /**
     * @description 按钮点击事件
     */
    callback?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface ModalProps {
    /**
     * @description 弹窗标题
     */
    title?: string;
    /**
     * @description 弹窗宽度
     */
    width?: number;
    /**
     * @description 自定义类名
     */
    className?: string;
    /**
     * @description 描述
     */
    description?: React.ReactNode;
    /**
     * @description 弹窗位置
     */
    position?: Position;
    /**
     * @description 是否需要显示底部
     */
    showFooter?: boolean;
    /**
     * @description 底部的footer，默认是按钮
     */
    Footer?: React.ReactNode;
    /**
     * @description 提交、取消、关闭按钮的配置
     */
    config?: {
        /**
         * @description 取消按钮
         */
        cancelBtn?: BtnConfig;
        /**
         * @description 确定按钮
         */
        submitBtn?: BtnConfig;
    };
    eleRef?: React.LegacyRef<HTMLDivElement> | null;
    /**
     * @description 渲染的子组件
     */
    children?: React.ReactNode;
    /**
     * @description 关闭Modal的回调
     */
    onClose?: (e: React.MouseEvent<HTMLDivElement>) => void;
    /**
     * @description 是否显示
     */
    isVisible?: boolean;
    /**
     * @description 渲染节点
     */
    domEl: React.ReactNode;
}

// @ts-ignore
const Modal: React.FC<ModalProps> = (props) => {

    // const [isShowModal, setIsShowModal] = useState(true);
    const { title, width, className, description, showFooter = true, Footer,
        config = { cancelBtn: { isShow: false }, submitBtn: { isShow: true } },
        eleRef,
        isVisible,
        onClose,
        domEl
    } = props;

    // 默认的按钮设置
    const { cancelBtn , submitBtn } = config;
    const handleModalClose = (e: React.MouseEvent<HTMLDivElement>) => {
        onClose && onClose(e);
    }

    const renderChildren = () => {
        return (
            <div className="basic-modal-mask">
                <div className="modal-wrapper">
                    <div className={className} ref={eleRef} style={{width: width || '440px'}}>
                        <div className="content">
                            <div className="title">{title || '一些信息'}</div>
                            <div className="description">{description}</div>
                            <div className={"close-icon"} onClick={handleModalClose}>
                                <Icon icon={"close"}/>
                            </div>
                        </div>
                        {props.children}
                        {/* 支持自定义Footer */}
                        {showFooter &&
                            (Footer || (
                                <div className="footer">
                                    {cancelBtn?.isShow && (
                                        <Button
                                            size="small"
                                            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                                cancelBtn?.callback && cancelBtn.callback(e);
                                            }}
                                            className="footer-btn-cancel footer-btn"
                                        >
                                            {cancelBtn?.text || '取消'}
                                        </Button>
                                    )}
                                    {submitBtn?.isShow && (
                                        <Button
                                            size="small"
                                            onClick={(e: any) => {
                                                submitBtn?.callback && submitBtn.callback(e);
                                            }}
                                            className="footer-btn-submit footer-btn"
                                        >
                                            {submitBtn?.text || '确认'}
                                        </Button>
                                    )}
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        )
    }
    return isVisible && ReactDOM.createPortal(renderChildren(), domEl);
}
export default Modal;
