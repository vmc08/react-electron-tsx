declare module 'react-async-script' {
  // https://github.com/dozoisch/react-async-script/issues
  import { ReactNode } from 'react';

  interface IOptions {
    callbackName?: string,
    globalName?: string,
    removeOnUnmount?: boolean,
    scriptId?: string,
  }

  export interface IAsyncScriptComponentProps { asyncScriptOnLoad: () => void }
  
  export default function(getScriptUrl: string, options?: IOptions): ReactNode<IAsyncScriptComponentProps>
}

declare module 'react-drag-listview' {
  // https://github.com/raisezhang/react-drag-listview
  import React from 'react';

  interface IOptions {
    onDragEnd: (fromIndex: number, toIndex: number) => void,
    nodeSelector: string,
  }

  export default class ReactDragListView extends React.Component {
    static DragColumn: React.SFC<IOptions>
  }
}
