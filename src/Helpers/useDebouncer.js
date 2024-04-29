import { useState, useEffect } from 'react';
const useDebouncer = (state, time) => {
    const [debounceVal, setDebounceVal] = useState(state);
    useEffect(() => {
        let timer;
        timer = setTimeout(() => {
            return setDebounceVal(state);
        }, time || 1000);
        return () => {
            clearTimeout(timer);
        };
    }, [state]);

    return debounceVal;
};
export { useDebouncer };
