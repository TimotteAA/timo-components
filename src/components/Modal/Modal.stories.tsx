import React, {useEffect, useState} from "react";
import Modal from "./"
import {ComponentMeta, ComponentStory} from "@storybook/react";
import Button from "../Button"

// 整体配置
const modalMeta: ComponentMeta<typeof Modal> = {
    title: "Modal",
    component: Modal,
};
export default modalMeta;

const Template: ComponentStory<typeof Modal> = (args) => {
    const [isVisible, setIsVisible] = useState(false);
    const onClose = () => {
        console.log("关掉了Modal");
    };

    const handleOpenClick = () => {
        setIsVisible(true);
    }

    const submitBtn = {
        isShow: true,
        title: "提交",
        callback: () => {
            console.log("提交了");
            setIsVisible(false);
        }
    }

    const cancelBtn = {
        isShow: true,
        title: "关闭了",
        callback: () => {
            console.log("取消");
            setIsVisible(false);
        }
    }


    return <div>
        <Button onClick={handleOpenClick} size={"small"}>显示modal</Button>

            <Modal description={"我自己封装的modal组件"} onClose={onClose}
                config={{cancelBtn, submitBtn}}
                   isVisible={isVisible}
            />

    </div>

};
export const defaultModalStory = Template.bind({});
defaultModalStory.args = {
}
defaultModalStory.storyName = "基本的Modal展示";
