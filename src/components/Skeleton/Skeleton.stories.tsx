import React, {useEffect, useState} from "react";
import Skeleton from "./index";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import imgSrc from "../../assets/imgs/bg.jpg";

// 整体配置
const skeletonMeta: ComponentMeta<typeof Skeleton> = {
    title: "Skeleton",
    component: Skeleton,
};
export default skeletonMeta;

const Template: ComponentStory<typeof Skeleton> = (args) => {
    const {isVisible: isVisibleProps = true, depth} = args;
    const [isVisible, setIsVisible] = useState(isVisibleProps);
    useEffect(() => {
        setTimeout(() => {
            setIsVisible(false);
        }, 3000)
    }, [isVisibleProps])

    return (
        <Skeleton isVisible={isVisible} depth={depth}>
            <div className="simple-wrapper">
                <div className="simple-top">
                    <div className="item">第一条</div>
                    <div className="item">第二条</div>
                </div>
                <div className="simple-middle">
                    <div className="item">第一条</div>
                    <div className="item">第二条</div>
                    <div className="item">第三条</div>
                </div>
                <div className="simple-bottom">
                    <img src={imgSrc}/>
                    <div className={"item"}>xxx</div>
                </div>
            </div>
        </Skeleton>)
}

export const defaultSkeletonStory = Template.bind({});
defaultSkeletonStory.args = {
    depth: 2,
    isVisible: false
};
defaultSkeletonStory.storyName = "递归层数2层的骨架屏";

export const defaultSkeletonStory2 = Template.bind({});
defaultSkeletonStory2.args = {
    depth: 4
};
defaultSkeletonStory2.storyName = "递归层数4层的骨架屏，第四层是本文节点";
