import React from "react";
import { storiesOf } from "@storybook/react";

storiesOf("Welcome page", module).add("welcome", () => {
    return (
        <div style={{width: "350px", margin: "0 auto"}}>
            <h2>个人组件首页</h2>
            <a href={"https://github.com/TimotteAA/timo-components"}>源码</a>
            <p>包含了所有组件的基本演示，该页面由storybook生成</p>
        </div>
    )
}, {info: {disable: true }});
