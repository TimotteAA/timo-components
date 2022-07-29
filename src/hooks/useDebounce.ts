import { useState, useEffect } from "react";

export function useDebounce(value: any, delay = 300, deps: any[] = []) {
    const [debounceValue, setDebounceValue] = useState(value);
    useEffect(() => {
        const handler = window.setTimeout(() => {
            setDebounceValue(value);
        }, delay);
        return () => {
            clearTimeout(handler)
        }
    }, [value, delay, ...deps])

    return [debounceValue];
}
