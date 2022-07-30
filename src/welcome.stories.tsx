import React from "react";
import { storiesOf } from "@storybook/react";

storiesOf("Welcome page", module).add("welcome", () => {
    return (
        <div>
            <h2>个人组件首页</h2>
            源码：https://github.com/TimotteAA/timo-components
        </div>
    )
}, {info: {disable: true }});
