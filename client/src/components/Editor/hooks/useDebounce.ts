import { useEffect } from "react";
import useTimeout from "./useTimeout";

// might be useful for v2.0.0 full collaborative editing

function useDebounce(callback: () => unknown, delay: number, dependencies: unknown[]){
    const { reset, clear } = useTimeout(callback, delay);
    useEffect(reset, [...dependencies, reset]);
    useEffect(clear, [clear]);
}

export default useDebounce;