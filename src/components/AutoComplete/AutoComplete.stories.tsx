import React from "react";
import AutoComplete from "./index";
import { DataSourceType } from "./index";
// story是一种UI展示

import { ComponentMeta, ComponentStory } from "@storybook/react";


// 整体配置
const autoCompleteMeta: ComponentMeta<typeof AutoComplete> = {
    title: "AutoComplete",
    component: AutoComplete,
};

export default autoCompleteMeta;

const data: DataSourceType[] = ["kobe", "tim", "garnett", "paul",
    "marc", "lebron", "davis", "rondo", "manu"].map((name, idx) => {
        return {value: name, index: idx}
})

const Template: ComponentStory<typeof AutoComplete> = (args) => {


    // const renderOption = (item: DataSourceType<{url: string}>) => {
    //     return <h2>{item.value}: {item.url}</h2>
    // }

    return <AutoComplete fetchSuggestions={args.fetchSuggestions} />
};

const handleFetch = (keyword: string) => {
    return fetch(`https://api.github.com/search/users?q=${keyword}`)
        .then(res => res.json()).then(({items}) => {
            console.log(items);
            const formatItems = items?.slice(0, 10).map((item: any) => ({
                value: item.login,
                url: item['html_url']
            }))
            return formatItems;
        })
}

export const autoCompleteDefault = Template.bind({});
autoCompleteDefault.args = {
    fetchSuggestions: handleFetch
};

autoCompleteDefault.storyName = "基本的AutoComplete组件";
