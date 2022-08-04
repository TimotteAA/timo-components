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
    handleItemSelect?:  (key: string, e: React.ChangeEvent<HTMLInputElement>) => void;
    handleItemExpand?: (key: string, e: React.MouseEvent<HTMLDivElement>) => void;
}

const treeContext = createContext<TreeContext>({});


// key为child，value为parent
const parentMap = new Map<TreeData, TreeData>();
const childMap = new Map<TreeData, TreeData[]>();
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
            if (!childMap.has(n)) {
                childMap.set(n, []);
            }
            for (let c of n.children) {
                parentMap.set(c, n);
                const tmp = childMap.get(n);
                tmp && tmp.push(c);
                tmp && childMap.set(n, tmp);
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

    // 处理默认选中
    if (defaultSelectedKeys && defaultSelectedKeys.length) {
        const record = new Set(defaultSelectedKeys);
        for (let i = 0; i < resArr.length; i++) {
            const key = resArr[i].key;
            if (record.has(key)) {
                resArr[i].checked = true;
            }
        }
    }

    return resArr;
}

// 计算选中项的key，以及其子项
// 以key为前缀的
// 找到受影响的所有keys
const findSelectedItems = (key: string, flattenedData: TreeData[], depth?: number) => {
    const res: string[] = [];
    //  被选中的索引
    const selected: number[] = [];
    for (let i = 0; i < flattenedData.length; i++) {
        const data = flattenedData[i];
        if (depth && data.depth !== depth) continue;
        if (data.key) {
            if (data.key.startsWith(key)) {
                res.push(data.key);
                selected.push(i);
            }
        }
    }
    return [res, selected];
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
        // setOpen(!open);
        itemKey && handleItemExpand && handleItemExpand(itemKey, e);
    }

    const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        // setIsChecked(e.target.checked);
        itemKey && handleItemSelect && handleItemSelect(itemKey, e);
        // itemKey && currentIdx && setTreeData && setTreeData(currentIdx, { checked: e.target.checked, key: itemKey });
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
    // 当前选中的所有keys
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    // 当前选中keys的index
    const [selectedIdxs, setSelectedIdxs] = useState<number[]>([]);

    const treeContextValue = {
        handleExpandedClicked: (expandedKey: number | string, e: React.MouseEvent<HTMLDivElement>) => {
            // console.log("展开的key:", expandedKey);
            onExpanded && onExpanded(expandedKey, e);
        },
        handleItemSelect: (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
            const [keys, idxs] = findSelectedItems(key, flattenedData);
            // console.log("所有关联的keys", keys);
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
        handleItemExpand: (key: string, e: React.MouseEvent<HTMLDivElement>) => {
            // 点击的key
            const idxOfKey = flattenedData.findIndex(data => data.key === key);
            // @ts-ignore
            const depth = flattenedData[idxOfKey].depth + 1;

            const [_, idxs] = findSelectedItems(key, flattenedData, depth);
            // 去掉自己的key，仅保留child


            const affectedIdxs = (idxs as number[]).filter(i => i !== idxOfKey);
            // 点击后取反
            const show = !flattenedData[idxOfKey].showChildren;
            const tmp = [...flattenedData];
            tmp[idxOfKey] = { ...tmp[idxOfKey], showChildren: show }
            for (let idx of affectedIdxs) {
                tmp[idx] = {...tmp[idx], show};
            }
            setFlattenedData([...tmp]);
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
