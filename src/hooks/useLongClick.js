import { useCallback, useRef } from 'react';

const DEFAULT_TIMEOUT_LENGTH = 1300;

const useLongClick = (
    onLongClick,
    timeoutLength = DEFAULT_TIMEOUT_LENGTH
) => {
    const ref = useRef(null);

    const onMouseDown = useCallback((event) => {
        ref.current = setTimeout(() => onLongClick(event), timeoutLength);
    }, [onLongClick, timeoutLength]);

    const onMouseUp = useCallback(() => {
        clearTimeout(ref.current);
    }, []);

    return {
        onMouseDown,
        onMouseUp,
        onTouchStart: onMouseDown,
        onTouchEnd: onMouseUp,
    };
};

export default useLongClick;