import { RefObject, useEffect, MouseEvent } from "react";

export function useClickOutside(ref: RefObject<HTMLElement>, handler: Function) {
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
                return;
            }
            handler(event);
        }
        document.addEventListener("click", listener as any);
        return () => {
            document.removeEventListener("click", listener as any);
        }
    }, [handler, ref.current])
}
