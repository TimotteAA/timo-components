import React from "react";
import Anchor from "./index";

// story是一种UI展示

import { ComponentMeta, ComponentStory } from "@storybook/react";

// 整体配置
const buttonMeta: ComponentMeta<typeof Anchor> = {
  title: "Anchor",
  component: Anchor,
};

export default buttonMeta;

const Template: ComponentStory<typeof Anchor> = (args) => {

  const styles: React.CSSProperties = {
    // padding: "30px",
    height: "600px",
    width: "600px",
    margin: "200px auto 0px auto"
  }

  const itemStyle: React.CSSProperties = {
    fontSize: "20px",
    height: "400px",
    width: "200px",
    border: "1px solid black",
    textAlign: "center",
    margin: "0 auto 30px 0",
  }
  const anchorData = [
    {
      label: 'CORS',
      level: 1,
      index: 0,
    },
    {
      label: 'JSONP',
      level: 1,
      index: 1,
    },
    {
      label: 'CSS',
      level: 2,
      index: 2,
    },
    {
      label: 'JAVA',
      level: 3,
      index: 3,
    },
    {
      label: 'JAVASCRIPT',
      level: 2,
      index: 4,
    },
    {
      label: 'GOLANG',
      level: 4,
      index: 5,
    },
  ]

  return (<div style={styles}>
    <Anchor anchorData={anchorData} title={"测试Anchor目录"}
            styles={{position: "fixed", right: "50px", top: "50px"}}
            offsetTop={200}
    />
    <div style={{overflowY: "auto"}}>
      <div id={"CORS"} style={itemStyle} className={"anchor-test-item"}>
        CORS
      </div>
      <div id={"JSONP"} style={itemStyle} className={"anchor-test-item"}>
        JSONP
      </div>
      <div id={"CSS"} style={itemStyle} className={"anchor-test-item"}>
        CSS
      </div>
      <div id={"JAVA"} style={itemStyle} className={"anchor-test-item"}>
        JAVA
      </div>
      <div id={"JAVASCRIPT"} style={itemStyle} className={"anchor-test-item"}>
        JAVASCRIPT
      </div>
      <div id={"GOLANG"} style={itemStyle} className={"anchor-test-item"}>
        GOLANG
      </div>
    </div>
  </div>)
};
export const Default = Template.bind({});
Default.args = {
};

Default.storyName = "基本的Anchor";

