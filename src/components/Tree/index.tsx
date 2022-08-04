import React, {useMemo, useState, useContext, createContext, useEffect} from "react";
import classNames from "classnames";
import Icon from "../Icon";
import { CSSTransition } from "react-transition-group";

export interface TreeData {
    // 外部直接传入的内容
    key: string;
    title?: string;
    disabled?: boolean;
    children?: TreeData[];
    showCheck?: boolean;
    checked?: boolean;
    // 叶子节点被选中
    halfChecked?: boolean;
    // 是否是叶子节点
    isLeaf?: boolean;

    // 对传入的TreeData做变换后的属性
    // 平铺后的父节点索引
    parentIdx?: number;
    // 平铺后的自身在列表中索引
    currentIdx?: number;
    // 原先节点中的深度
    depth?: number;
    // 是否有子节点
    hasChildren?: boolean;
    // key的代替，用于props中获取
    itemKey?: string;
    // 是否显示子项
    showChildren?: boolean;
    // 是否显示，由showChildren决定
    show?: boolean;
}


export interface TreeProps {
    /** 渲染的树形组件数据 */
    data: TreeData[];
    /** 默认选中TreeItem的key */
    defaultSelectedKeys?: string[];
    /** 默认显示的父亲的key */
    defaultOpenKeys?: string[];
    /** 展开的回调 */
    onExpanded?: (expandedKey: number | string, e: React.MouseEvent<HTMLDivElement>) => void;
    /** 点击checkbox的回调 */
    onCheck?: (newKeys: string[], allKeys: string[], e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface TreeContext {
    handleExpandedClicked?: TreeProps['onExpanded'];
    handleItemSelect?:  (key: string, currentIdx: number, e: React.ChangeEvent<HTMLInputElement>) => void;
    handleItemExpand?: (key: string, currentIdx: number, e: React.MouseEvent<HTMLDivElement>) => void;
}

const treeContext = createContext<TreeContext>({});


// key为child，value为parent
const parentMap = new Map<TreeData, TreeData>();
const childMap = new Map<number, number[]>();
const indexMap = new Map<TreeData, number>();
function flattenTreeData(treeData: TreeData[], parentIdx: number, depth: number,
                         defaultSelectedKeys?: string[],
                         defaultOpenKeys?: string[]): TreeData[] {
    const resArr: TreeData[] = [];

    // 遍历当前数组每一项
    for (let n of treeData) {
        resArr.push(n);

        // 有parent参数，添加上去
        // if (parentIdx !== undefined) n.parentIdx = parentIdx;
        n.depth = depth;
        n.hasChildren = false;
        n.checked = false;
        n.halfChecked = false;
        n.show = true;

        // 接下来处理children
        // 没有children
        if (n.children && n.children.length > 0) {
            n.hasChildren = true;
            n.showChildren = false;
            for (let c of n.children) {
                parentMap.set(c, n);
            }
            const tmpRes = flattenTreeData(n.children, resArr.length, depth + 1);
            resArr.push(...tmpRes);
        } else {
            n.isLeaf = true;
        }
    }
    for (let i = 0; i < resArr.length; i++) {
        indexMap.set(resArr[i], i);
    }
    for (let i = 0; i < resArr.length; i++) {
        if (parentMap.has(resArr[i])) {
            const parent = parentMap.get(resArr[i]);
            if (parent) {
                resArr[i].parentIdx = indexMap.get(parent);
                resArr[i].show = parent.showChildren;

            }
        }
        resArr[i].currentIdx = i;
    }

    // // 处理默认选中
    // if (defaultSelectedKeys && defaultSelectedKeys.length) {
    //     const record = new Set(defaultSelectedKeys);
    //     for (let i = 0; i < resArr.length; i++) {
    //         const key = resArr[i].key;
    //         if (record.has(key)) {
    //             resArr[i].checked = true;
    //         }
    //     }
    // }
    //
    return resArr;
}
console.log(childMap);
// 计算选中项的key，以及其子项
// 以key为前缀的
// 找到受影响的所有keys
type DepthFilter = (depth: number) => boolean;
// const findExpandedItems = (key: string, flattenedData: TreeData[], depthFilter?: DepthFilter) => {
//     const res: string[] = [];
//     //  被选中的索引
//     const selected: number[] = [];
//     for (let i = 0; i < flattenedData.length; i++) {
//         const data = flattenedData[i];
//         if (depthFilter && depthFilter(data.depth)) continue;
//
//         // 以--界定层级
//
//
//         if (data.key) {
//             if (data.key.startsWith(key)) {
//                 res.push(data.key);
//                 selected.push(i);
//             }
//         }
//     }
//     return [res, selected];
// }

// 找到链上所有的，被key影响的子代
const findAffectedItems = (key: string, idx: number, flattenedData: TreeData[]) => {
    console.log(`key: ${key}, idx: ${idx}`);
    const keys: string[] = [];
    const idxs: number[] = [];

    const queue: number[] = [idx];

    while (queue.length) {
        const curSize = queue.length;
        for (let i = 0; i < curSize; i++) {
            const cur = queue.shift();
            if (cur) {
                keys.push(flattenedData[cur].key);
                idxs.push(flattenedData[cur].currentIdx!);

                const child = childMap.get(cur);
                if (child && child.length) {
                    for (let c of child) {
                        queue.push(c);
                    }
                }
            }
        }
    }
    console.log("emmm,", keys, idxs);
    return {
        keys,
        idxs
    }
}

function updateChildMap(data: TreeData[]) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].parentIdx) {
            const parentIdx = data[i].parentIdx!;
            const childIdx = i;
            if (childMap.has(parentIdx)) {
                const tmp = childMap.get(parentIdx)!;
                tmp.push(childIdx);
                childMap.set(parentIdx, tmp);
            } else {
                childMap.set(parentIdx, [childIdx]);
            }
        }
    }
}

const TreeItem: React.FC<TreeData> = (props) => {
    const { title, disabled, showCheck = true,
        parentIdx, halfChecked,
        currentIdx, depth = 0,
        hasChildren, checked = false,
        itemKey, show,
        showChildren} = props;
    const classes = classNames("tree-item", {
        'tree-item-disabled': disabled
    })
    // const [open, setOpen] = useState(false);

    const { handleExpandedClicked, handleItemSelect, handleItemExpand } = useContext(treeContext);

    const handleIconClick = (e: React.MouseEvent<HTMLDivElement>) => {
        itemKey && handleExpandedClicked && handleExpandedClicked(itemKey, e);
        itemKey && handleItemExpand && handleItemExpand(itemKey, currentIdx!, e);
    }

    const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        itemKey && handleItemSelect && handleItemSelect(itemKey, currentIdx!, e);
    }

    return <CSSTransition in={show} timeout={300} appear unmountOnExit mountOnEnter>
        <div className={classes} style={{marginLeft: `${depth * 20}px`}}>
            { hasChildren && showChildren && <div className={"tree-item-icon"} onClick={handleIconClick}>
                { <Icon icon={"arrow-alt-circle-down"} /> }</div>}
            { hasChildren && !showChildren && <div className={"tree-item-icon"} onClick={handleIconClick}>
                { <Icon icon={"arrow-alt-circle-right"} /> }</div>}
            { showCheck && <div className={"tree-item-checkbox-wrapper"}>
                <input type={"checkbox"} checked={checked} onChange={handleSelect}/>
            </div>}
            <div className={"tree-item-title-wrapper"}>{ title }</div>
        </div>
    </CSSTransition>
}

const Tree: React.FC<TreeProps> = (props) => {
    const { data, defaultSelectedKeys, defaultOpenKeys, onExpanded, onCheck } = props;
    const [flattenedData, setFlattenedData] = useState(flattenTreeData(data, 0, 0,
        defaultSelectedKeys,
        defaultOpenKeys))

    useEffect(() => {
        // 处理defaultIdx、openIdxs等场景
        updateChildMap(flattenedData)
    }, [])

    // 当前选中的所有keys
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    // 当前选中keys的index
    const [selectedIdxs, setSelectedIdxs] = useState<number[]>([]);

    const treeContextValue = {
        handleExpandedClicked: (expandedKey: number | string, e: React.MouseEvent<HTMLDivElement>) => {
            // console.log("展开的key:", expandedKey);
            onExpanded && onExpanded(expandedKey, e);
        },
        handleItemSelect: (key: string, currentIdx: number, e: React.ChangeEvent<HTMLInputElement>) => {
            const { keys, idxs } = findAffectedItems(key, currentIdx, flattenedData);
            const tmp = [...flattenedData];
            if (e.target.checked) {
                const newKeys = [...selectedKeys, ...keys];
                const newIdxs = [...selectedIdxs, ...idxs];
                onCheck && onCheck(keys as string[], newKeys as string[], e);
                setSelectedKeys([...newKeys as string[]]);
                setSelectedIdxs([...newIdxs as number[]]);
                for (let idx of (idxs as number[])) {
                    tmp[idx] = {...tmp[idx], checked: true}
                }
                setFlattenedData([...tmp]);
            } else {
                let newKeys = [...selectedKeys];
                let newIdxs = [...selectedIdxs];
                // 此处从已有keys中的删除暂时没想出好办法
                for (let i = 0; i < keys.length; i++) {
                    newKeys = newKeys.filter(key => key !== keys[i]);
                    newIdxs = newIdxs.filter(idx => idx !== idxs[i]);
                }
                onCheck && onCheck(keys as string[], newKeys as string[], e);
                setSelectedKeys([...newKeys as string[]]);
                setSelectedIdxs([...newIdxs as number[]]);
                for (let idx of (idxs as number[])) {
                    tmp[idx] = {...tmp[idx], checked: false}
                }
                setFlattenedData([...tmp]);
            }
        },
        handleItemExpand: (key: string, currentIdx: number, e: React.MouseEvent<HTMLDivElement>) => {
            const depth = flattenedData[currentIdx].depth as number;
            // 暂时只做展开下一层的
            const show = !flattenedData[currentIdx].showChildren;
            if (show) {
                // 展开
                const newFlattenedData = [...flattenedData];
                newFlattenedData[currentIdx] = { ...newFlattenedData[currentIdx], showChildren: show }

                for (let i = 0; i < flattenedData.length; i++) {
                    const childParentIdx = flattenedData[i].parentIdx;
                    if (childParentIdx === currentIdx) {
                        newFlattenedData[i] = {...newFlattenedData[i], show}
                    }
                }
                setFlattenedData([...newFlattenedData]);
            } else {
                // 关闭
            }
        }
    }
    console.log(flattenedData);
    return <treeContext.Provider value={treeContextValue}>
        <ul className={"tree-wrapper"}>
            {
                flattenedData.map(({key, title,
                                       disabled, hasChildren
                                       , parentIdx
                                       , depth,
                                        currentIdx,
                                       checked,
                                        show,
                                        showChildren
                                   }, idx) => {


                    return <TreeItem key={key} title={title} disabled={disabled}
                                     parentIdx={parentIdx} currentIdx={currentIdx}
                                     hasChildren={hasChildren}
                                     depth={depth}
                                     checked={checked}
                                     itemKey={key}
                                     show={show}
                                     showChildren={showChildren}
                    />
                })
            }
        </ul>
    </treeContext.Provider>
}


export default Tree;
