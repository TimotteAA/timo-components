import {useState, useRef} from "react";

export function useSyncState<T>(initialState: T) {
    // useRef保存状态
    const stateRef = useRef<T>(initialState);
    // useState触发更新
    const [u, update] = useState(false);
    const dispatch = (fn: T | Function) => {
        if (typeof fn === "function") {
            const f = fn as Function;
            const newValue = f(stateRef.current);
            if (stateRef.current) {
                stateRef.current = newValue;
            }
        } else {
            const newValue = fn;
            if (stateRef.current) {
                stateRef.current = newValue;
            }
        }
        update(!u);
    }
    // 注意是stateRef.current中获取数据
    return [stateRef.current, dispatch];
}
