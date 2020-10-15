import { useRef } from 'react';
export default function useSwapInputRefs({ inputCurrency, outputCurrency }) {
    const inputFieldRef = useRef();
    const nativeFieldRef = useRef();
    const outputFieldRef = useRef();
    return {
        inputFieldRef,
        nativeFieldRef,
        outputFieldRef,
    };
}
