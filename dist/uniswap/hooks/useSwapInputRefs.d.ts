/// <reference types="react" />
export default function useSwapInputRefs({ inputCurrency, outputCurrency }: {
    inputCurrency: any;
    outputCurrency: any;
}): {
    inputFieldRef: import("react").MutableRefObject<undefined>;
    nativeFieldRef: import("react").MutableRefObject<undefined>;
    outputFieldRef: import("react").MutableRefObject<undefined>;
};
