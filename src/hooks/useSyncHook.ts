import {useState, useRef} from "react";

export function useSyncState<T>(initialState: T) {
    // useRef保存状态
    const stateRef = useRef<T>(initialState);
    // useState触发更新
    const [_, update] = useState();
    const dispatch = (fn: any) => {
        if (typeof fn === "function") {
            const newValue = fn(stateRef.current);
            if (stateRef.current) {
                stateRef.current = newValue;
            }
        } else {
            const newValue = fn;
            if (stateRef.current) {
                stateRef.current = newValue;
            }
        }
    }
    // 注意是stateRef.current中获取数据
    return [stateRef, dispatch];
}
