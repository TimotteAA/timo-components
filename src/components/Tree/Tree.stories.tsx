import React from "react";
import Tree from "./index";
import { TreeData } from "./index"

import { ComponentMeta, ComponentStory } from "@storybook/react";

const treeMeta: ComponentMeta<typeof Tree> = {
    title: "Tree",
    id: "Tree",
    component: Tree,
};
export default treeMeta;

const TreeTemplate: ComponentStory<typeof Tree> = (args) => {
    return (
        <Tree data={args.data} />
    );
};

const data: TreeData[] = [
    {
        title: '0-0',
        key: '0-0',
        children: [
            {
                title: '0-0-0',
                key: '0-0-0',
                children: [
                    { title: '0-0-0-0', key: '0-0-0-0' },
                    { title: '0-0-0-1', key: '0-0-0-1' },
                    { title: '0-0-0-2', key: '0-0-0-2' },
                ],
            },
            {
                title: '0-0-1',
                key: '0-0-1',
                children: [
                    { title: '0-0-1-0', key: '0-0-1-0' },
                    { title: '0-0-1-1', key: '0-0-1-1' },
                    { title: '0-0-1-2', key: '0-0-1-2' },
                    { title: '0-0-1-3', key: '0-0-1-3' },
                    { title: '0-0-1-4', key: '0-0-1-4' },
                    { title: '0-0-1-5', key: '0-0-1-5' },
                    { title: '0-0-1-6', key: '0-0-1-6' },
                    { title: '0-0-1-7', key: '0-0-1-7' },
                    { title: '0-0-1-8', key: '0-0-1-8' },
                    { title: '0-0-1-9', key: '0-0-1-9' },
                    { title: '0-0-1-10', key: '0-0-1-10' },
                    { title: '0-0-1-11', key: '0-0-1-11' },
                    { title: '0-0-1-12', key: '0-0-1-12' },
                    { title: '0-0-1-13', key: '0-0-1-13' },
                    { title: '0-0-1-14', key: '0-0-1-14' },
                ],
            },
            {
                title: '0-0-2',
                key: '0-0-2',
            },
        ],
    },
    {
        title: '0-1',
        key: '0-1',
        children: [
            { title: '0-1-0-0', key: '0-1-0-0' },
            { title: '0-1-0-1', key: '0-1-0-1' },
            { title: '0-1-0-2', key: '0-1-0-2' },
        ],
    },
    {
        title: '0-2',
        key: '0-2',
    },
];

export const BasicTree = TreeTemplate.bind({});
BasicTree.args = {
    data,
    onCheck: (newKeys, allKeys, e) => {
        console.log("被选中的部分keys", newKeys);
        console.log("当前所有选中的keys", allKeys);
    },
    defaultSelectedKeys: [
        '0-0-1-9',
        "0-1"
    ]
};
BasicTree.storyName = "基本的树形控件";
