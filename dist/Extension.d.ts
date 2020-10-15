/// <reference types="react" />
import "@ethersproject/shims";
declare type Props = {};
declare function Init(api: any): void;
declare function WidgetView(props: Props): JSX.Element;
declare function ExtensionView(props: Props): JSX.Element;
declare const _default: {
    type: string;
    widget: typeof WidgetView;
    view: typeof ExtensionView;
    init: typeof Init;
}[];
export default _default;
